import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, InstancedMesh, PointLight } from "three";

export interface MouseNDC {
  x: number;
  y: number;
}

const SEGMENT_COUNT = 25; // follow-chain point count
const SEGMENT_LENGTH = 0.27;
// Body indices where the front and back leg pairs attach.
const FRONT_LEG_INDEX = 6;
const BACK_LEG_INDEX = 16;
// How sharply the leg bends at the knee (radians) — a straight single
// segment reads as a stiff peg rather than a leg; real (and painted)
// dragon legs have a clear elbow/knee bend partway down.
const KNEE_BEND = 0.95;

interface DragonProps {
  mouse: React.MutableRefObject<MouseNDC>;
}

// Three-stop warm gradient (gold → orange → deep crimson) instead of a flat
// two-stop lerp, so the body reads with the richer amber/red warmth of the
// reference painting instead of one monotone fade.
const HEAD_COLOR = new THREE.Color("#ffe27a");
const MID_COLOR = new THREE.Color("#e8642f");
const TAIL_COLOR = new THREE.Color("#7a1420");
const RIDGE_HEAD_COLOR = new THREE.Color("#fff3d6");
const RIDGE_TAIL_COLOR = new THREE.Color("#b23a1a");
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const WORLD_RIGHT = new THREE.Vector3(1, 0, 0);
const WORLD_FORWARD = new THREE.Vector3(0, 0, 1);

/**
 * Sculpted Lý-dynasty style dragon (reverted from the folk-art tube/billboard
 * redesign after user feedback that version looked worse, then given a
 * material/color pass to move closer to a reference golden-dragon painting).
 * Body is a chain of tapered, wave-modulated icosahedra (InstancedMesh)
 * oriented along the mouse-chasing follow-chain, with a gradient-colored
 * dorsal ridge and a hand-built head group (curved horns, lá đề crest,
 * bulging eyes, open jaw with curling fangs, multi-colored mane, curling
 * whiskers) — all primitive Three.js geometry with `meshPhysicalMaterial`
 * clearcoat/iridescence for a shinier "lacquered scale" look, no external
 * textures. This still can't approach a hand-painted illustration's detail —
 * it's a stylized upgrade within the existing procedural-geometry approach,
 * not a re-architecture.
 */
function Dragon({ mouse }: DragonProps) {
  const { viewport } = useThree();
  const bodyRef = useRef<InstancedMesh>(null);
  const ridgeRef = useRef<InstancedMesh>(null);
  const legRef = useRef<InstancedMesh>(null);
  const shinRef = useRef<InstancedMesh>(null);
  const kneeRef = useRef<InstancedMesh>(null);
  const pawRef = useRef<InstancedMesh>(null);
  const clawRef = useRef<InstancedMesh>(null);
  const headRef = useRef<Group>(null);
  const jawRef = useRef<Group>(null);
  const headLightRef = useRef<PointLight>(null);
  const time = useRef(0);

  const points = useMemo(
    () => Array.from({ length: SEGMENT_COUNT }, (_, i) => new THREE.Vector3(0, 2 - i * 0.05, 0)),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const prevHead = useRef(new THREE.Vector3(0, 2, 0));
  const activity = useRef(0);
  const prevScrollY = useRef(window.scrollY);
  const scrollVelocity = useRef(0);
  const scrollStraightenRef = useRef(0);
  const scratch = useRef({
    dir: new THREE.Vector3(),
    tangent: new THREE.Vector3(),
    right: new THREE.Vector3(),
    up: new THREE.Vector3(),
    mat: new THREE.Matrix4(),
    color: new THREE.Color(),
    ridgeColor: new THREE.Color(),
    legDir: new THREE.Vector3(),
    legRight: new THREE.Vector3(),
    legForward: new THREE.Vector3(),
    legMat: new THREE.Matrix4(),
    hip: new THREE.Vector3(),
    knee: new THREE.Vector3(),
    shinDir: new THREE.Vector3(),
    shinRight: new THREE.Vector3(),
    shinForward: new THREE.Vector3(),
    shinMat: new THREE.Matrix4(),
    footTip: new THREE.Vector3(),
    clawDir: new THREE.Vector3(),
    clawRight: new THREE.Vector3(),
    clawUp: new THREE.Vector3(),
    clawMat: new THREE.Matrix4(),
    scrollDir: new THREE.Vector3(),
    straightTarget: new THREE.Vector3(),
    neckRight: new THREE.Vector3(),
    neckUp: new THREE.Vector3(),
    neckTangent: new THREE.Vector3(),
  }).current;

  // Same girth formula used for the body instances below — pulled out so the
  // leg attachment points (computed separately, after the main per-segment
  // loop) size themselves to match the body at that index instead of
  // guessing independent numbers.
  const radiusAt = (i: number, t: number) => {
    const neckTaper = THREE.MathUtils.clamp(0.4 + i * 0.3, 0.4, 1);
    const wave = 1 + Math.sin(i * 0.4 - t * 1.5) * 0.05;
    const taper = 1 - (i / points.length) * 0.58;
    return 0.25 * neckTaper * taper * wave;
  };

  useFrame((_, delta) => {
    time.current += delta;
    const t = time.current;

    const targetX = mouse.current.x * viewport.width * 0.46;

    // Scrolling the page pushes the dragon in the same direction — scroll
    // down and it dives down, scroll up and it climbs — layered on top of
    // the usual mouse-follow target. `scrollY` increasing means the page
    // scrolled down, which should read on screen as "down" too, i.e. a
    // *decrease* in the head's world Y (screen Y-up), hence the minus sign.
    // Smoothing scrollDelta into `scrollVelocity` (instead of using the raw
    // per-frame delta) avoids single-frame jitter, and naturally decays
    // back to 0 a moment after the page stops scrolling — so this only
    // deflects the dragon *while* scrolling, it doesn't leave it stranded.
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - prevScrollY.current;
    prevScrollY.current = scrollY;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, scrollDelta, 0.35);
    const scrollBoost = THREE.MathUtils.clamp(-scrollVelocity.current * 0.03, -1.6, 1.6);

    // How much to straighten the *whole* body into a line trailing the
    // head, not just nudge the head's target. Without this, only the head
    // and the first few segments react quickly to a scroll — the distance
    // -constraint chain below only reorients like a whip cracking, and the
    // tail keeps its old curled shape until many frames of *sustained*
    // pull have gone by, which a short scroll burst never provides. This
    // factor instead directly blends every segment toward lying on a
    // straight vertical ray from the head, scaled by how fast the page is
    // scrolling right now, so a scroll burst reads as the whole dragon
    // snapping straight instead of just its head lunging.
    //
    // The raw value below tracks `scrollVelocity` almost immediately, which
    // made the curled <-> straightened switch feel like a hard cut rather
    // than an eased transition ("cứng khi chuyển trạng thái"). Easing it
    // through its own lerp (independent of `scrollVelocity`'s own easing)
    // spreads that transition over more frames in both directions.
    const scrollStraightenTarget = THREE.MathUtils.clamp(Math.abs(scrollVelocity.current) * 0.05, 0, 1);
    scrollStraightenRef.current = THREE.MathUtils.lerp(
      scrollStraightenRef.current,
      scrollStraightenTarget,
      0.1
    );
    const scrollStraighten = scrollStraightenRef.current;
    const scrollDir = scratch.scrollDir.set(0, scrollVelocity.current > 0 ? -1 : 1, 0);

    const targetY = mouse.current.y * viewport.height * 0.42 + viewport.height * 0.08 + scrollBoost;

    // Small idle wander layered on top so the head keeps breathing even when
    // the cursor is still. Kept deliberately tiny — a larger amplitude here
    // (an earlier version used 0.35/0.3/0.9) reads as the whole dragon
    // slowly orbiting/spinning forever instead of a subtle idle sway.
    const idleX = Math.sin(t * 0.5) * 0.06;
    const idleY = Math.sin(t * 0.65 + 1.3) * 0.05;
    const idleZ = Math.sin(t * 0.3) * 0.12;

    const head = points[0];
    // A gentle lag (rather than snapping straight to the cursor) is what
    // reads as a companion "chasing" the mouse instead of being glued to it.
    head.set(
      THREE.MathUtils.lerp(head.x, targetX + idleX, 0.055),
      THREE.MathUtils.lerp(head.y, targetY + idleY, 0.055),
      THREE.MathUtils.lerp(head.z, idleZ, 0.055)
    );

    // How much the head is actually moving right now — used to fade the
    // slither wave out to nothing when the cursor is still. Without this
    // gate the wave (below) runs on a free-running timer forever, which
    // reads as the whole body endlessly writhing/rotating even at rest.
    const speed = head.distanceTo(prevHead.current);
    prevHead.current.copy(head);
    activity.current = THREE.MathUtils.lerp(activity.current, Math.min(speed * 12, 1), 0.08);

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const dir = scratch.dir.subVectors(curr, prev);
      const dist = dir.length() || 0.0001;
      dir.multiplyScalar(SEGMENT_LENGTH / dist);
      curr.copy(prev).add(dir);

      // Subtle lateral slither: without this, a rope-physics chain moving in
      // a straight line renders as one smooth tapering tube (reads badly —
      // more like a capsule than a dragon). A gentle, low-frequency
      // perpendicular wave keeps the spine looking like one graceful curve
      // (about one full wave across the whole body) rather than many tight
      // wiggles; scaled by `activity` so it settles to a still, straight
      // pose instead of undulating forever once the cursor stops.
      const perp = scratch.right.set(-dir.z, 0, dir.x).normalize();
      curr.addScaledVector(perp, Math.sin(i * 0.32 - t * 1.6) * 0.045 * activity.current);

      // Pull every segment toward lying on a ray trailing BEHIND the head
      // — opposite the scroll direction — so a fast scroll straightens the
      // *entire* body in one motion (instead of only the head reacting and
      // the tail slowly whip-cracking into alignment over many frames)
      // while keeping the head at the leading end. Using `+scrollDir` here
      // (the direction the head itself is moving) was backwards: it pushed
      // the tail further in the travel direction than the head, so the
      // tail visually overtook the head and the whole dragon read as
      // flying the wrong way. The trail also keeps its own sideways wave
      // (same sine as the slither above) instead of snapping to a rigid
      // ruler-straight line, per feedback that it should still look like
      // it's undulating while it stretches out.
      if (scrollStraighten > 0.001) {
        const trailWave = Math.sin(i * 0.32 - t * 1.6) * 0.12;
        const straightTarget = scratch.straightTarget
          .copy(head)
          .addScaledVector(scrollDir, -i * SEGMENT_LENGTH)
          .addScaledVector(WORLD_RIGHT, trailWave);
        curr.lerp(straightTarget, scrollStraighten * 0.35);
      }
    }

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const tangent = scratch.tangent.subVectors(next, prev).normalize();
      const rightRef = Math.abs(tangent.y) > 0.95 ? WORLD_RIGHT : WORLD_UP;
      const right = scratch.right.crossVectors(rightRef, tangent).normalize();
      const up = scratch.up.crossVectors(tangent, right).normalize();
      const basis = scratch.mat.makeBasis(right, up, tangent);

      // Stash the neck segment's own frame (index 0) so the head group
      // below can be built from the exact same right/up/tangent instead of
      // computing its own independent orientation — see the head block
      // for why that independent computation was the actual cause of the
      // head looking detached from the body.
      if (i === 0) {
        scratch.neckRight.copy(right);
        scratch.neckUp.copy(up);
        scratch.neckTangent.copy(tangent);
      }

      // Gentle wave-modulated girth (subtle — a strong per-segment wave reads
      // as lumpy bumps rather than a smooth taper) tapering toward the tail.
      // The neck ramps up from a small (not zero) base instead of starting
      // full-size, so the body doesn't put a big sphere directly behind/on
      // top of the sculpted head group at the same position (which used to
      // swallow the head's facial details) while still leaving a visible
      // thin neck connecting into the head instead of a floating gap.
      const radius = radiusAt(i, t);

      dummy.position.copy(p);
      dummy.quaternion.setFromRotationMatrix(basis);
      dummy.scale.set(radius, radius, radius * 1.3);
      dummy.updateMatrix();
      bodyRef.current?.setMatrixAt(i, dummy.matrix);
      const tRatio = i / points.length;
      const bodyColor =
        tRatio < 0.5
          ? scratch.color.copy(HEAD_COLOR).lerp(MID_COLOR, tRatio / 0.5)
          : scratch.color.copy(MID_COLOR).lerp(TAIL_COLOR, (tRatio - 0.5) / 0.5);
      bodyRef.current?.setColorAt(i, bodyColor);

      // Jagged dorsal ridge — alternating tall/short spikes offset up along
      // the segment's own "up" (tracks the spine without the roll-flipping
      // issues a hard tangent quaternion caused for legs in an earlier
      // attempt), in a bright contrasting color. A smooth same-tone ridge
      // just blends into the body and reads as a plain tapered tube; a
      // jagged bright one is what breaks that silhouette into "dragon".
      const spike = i % 2 === 0 ? 1.6 : 1;
      dummy.position.copy(p).addScaledVector(up, radius * 1.1 * spike);
      dummy.scale.set(radius * 0.35, radius * 1.1 * spike, radius * 1.5);
      dummy.updateMatrix();
      ridgeRef.current?.setMatrixAt(i, dummy.matrix);
      ridgeRef.current?.setColorAt(i, scratch.ridgeColor.copy(RIDGE_HEAD_COLOR).lerp(RIDGE_TAIL_COLOR, tRatio));
    }
    if (bodyRef.current) {
      bodyRef.current.instanceMatrix.needsUpdate = true;
      if (bodyRef.current.instanceColor) bodyRef.current.instanceColor.needsUpdate = true;
    }
    if (ridgeRef.current) {
      ridgeRef.current.instanceMatrix.needsUpdate = true;
      if (ridgeRef.current.instanceColor) ridgeRef.current.instanceColor.needsUpdate = true;
    }

    // Legs — attached at two fixed body indices, oriented from the same
    // stable (tangent, right, up) frame already used for the body/ridge
    // above. Two earlier attempts at legs failed because they derived
    // orientation via `quaternion.setFromUnitVectors` directly against a
    // world axis, which leaves rotation around the tangent (roll) undefined
    // and flips unpredictably as the body curves ("như que gãy"). Building
    // the leg's own direction from this continuously-consistent up/right
    // frame — instead of a raw axis-to-axis rotation — avoids that.
    let legInstance = 0;
    let clawInstance = 0;
    for (const legIndex of [FRONT_LEG_INDEX, BACK_LEG_INDEX]) {
      const p = points[legIndex];
      const prev = points[Math.max(0, legIndex - 1)];
      const next = points[Math.min(points.length - 1, legIndex + 1)];
      const tangent = scratch.tangent.subVectors(next, prev).normalize();
      const rightRef = Math.abs(tangent.y) > 0.95 ? WORLD_RIGHT : WORLD_UP;
      const right = scratch.right.crossVectors(rightRef, tangent).normalize();
      const up = scratch.up.crossVectors(tangent, right).normalize();
      const hipRadius = radiusAt(legIndex, t);
      const thighLength = hipRadius * 1.35;
      const shinLength = hipRadius * 1.55;

      for (const side of [1, -1]) {
        const hip = scratch.hip
          .copy(p)
          .addScaledVector(right, side * hipRadius * 0.85)
          .addScaledVector(up, -hipRadius * 0.35);

        // Thigh points down-and-outward — a blend of "down" (-up) and
        // "outward" (side * right) — derived from the same stable
        // right/up/tangent frame, so it turns smoothly with the body
        // instead of flipping.
        const thighDir = scratch.legDir
          .copy(up)
          .multiplyScalar(-1)
          .addScaledVector(right, side * 0.6)
          .normalize();
        const legRight = scratch.legRight.crossVectors(tangent, thighDir).normalize();
        const legForward = scratch.legForward.crossVectors(legRight, thighDir).normalize();
        const legBasis = scratch.legMat.makeBasis(legRight, thighDir, legForward);
        const legColor = scratch.color.copy(HEAD_COLOR).lerp(TAIL_COLOR, legIndex / points.length);

        dummy.position.copy(hip).addScaledVector(thighDir, thighLength * 0.5);
        dummy.quaternion.setFromRotationMatrix(legBasis);
        dummy.scale.set(hipRadius * 0.58, thighLength, hipRadius * 0.58);
        dummy.updateMatrix();
        legRef.current?.setMatrixAt(legInstance, dummy.matrix);
        legRef.current?.setColorAt(legInstance, legColor);

        // Knee — a straight single segment reads as a stiff peg rather
        // than a leg, so the shin bends away from the thigh direction by
        // a fixed angle around `legRight`. Rotating an already-stable
        // vector around another already-stable vector by a constant angle
        // stays stable frame-to-frame (no new ambiguity is introduced),
        // unlike the raw axis-to-axis rotation that broke earlier leg
        // attempts.
        const knee = scratch.knee.copy(hip).addScaledVector(thighDir, thighLength);
        const shinDir = scratch.shinDir.copy(thighDir).applyAxisAngle(legRight, KNEE_BEND).normalize();
        const shinRight = scratch.shinRight.crossVectors(tangent, shinDir).normalize();
        const shinForward = scratch.shinForward.crossVectors(shinRight, shinDir).normalize();
        const shinBasis = scratch.shinMat.makeBasis(shinRight, shinDir, shinForward);

        // Small knee-cap bump so the joint reads clearly instead of just
        // being an angle where two cylinders happen to meet.
        dummy.position.copy(knee);
        dummy.quaternion.setFromRotationMatrix(legBasis);
        dummy.scale.setScalar(hipRadius * 0.5);
        dummy.updateMatrix();
        kneeRef.current?.setMatrixAt(legInstance, dummy.matrix);
        kneeRef.current?.setColorAt(legInstance, legColor);

        dummy.position.copy(knee).addScaledVector(shinDir, shinLength * 0.5);
        dummy.quaternion.setFromRotationMatrix(shinBasis);
        dummy.scale.set(hipRadius * 0.4, shinLength, hipRadius * 0.4);
        dummy.updateMatrix();
        shinRef.current?.setMatrixAt(legInstance, dummy.matrix);
        shinRef.current?.setColorAt(legInstance, legColor);

        // Small paw pad at the foot end.
        dummy.position.copy(knee).addScaledVector(shinDir, shinLength * 0.98);
        dummy.quaternion.setFromRotationMatrix(shinBasis);
        dummy.scale.set(hipRadius * 0.5, hipRadius * 0.36, hipRadius * 0.7);
        dummy.updateMatrix();
        pawRef.current?.setMatrixAt(legInstance, dummy.matrix);
        pawRef.current?.setColorAt(legInstance, legColor);

        // 3-toe claw fan splaying out from the foot tip, in the
        // shinRight/shinForward plane (perpendicular to the shin itself)
        // — each toe gets its own small stable frame built the same
        // roll-safe way as the leg, so the fan holds its shape as the
        // body curves instead of the claws twisting independently.
        const footTip = scratch.footTip.copy(knee).addScaledVector(shinDir, shinLength * 1.05);
        const clawLength = hipRadius * 1.05;
        for (let toe = 0; toe < 3; toe++) {
          const spread = (toe - 1) * 0.85;
          const clawDir = scratch.clawDir
            .copy(shinForward)
            .addScaledVector(shinRight, spread)
            .normalize();
          const clawRight = scratch.clawRight.crossVectors(shinDir, clawDir).normalize();
          const clawUp = scratch.clawUp.crossVectors(clawRight, clawDir).normalize();
          const clawBasis = scratch.clawMat.makeBasis(clawRight, clawDir, clawUp);

          dummy.position
            .copy(footTip)
            .addScaledVector(shinRight, spread * hipRadius * 0.45)
            .addScaledVector(clawDir, clawLength * 0.5);
          dummy.quaternion.setFromRotationMatrix(clawBasis);
          dummy.scale.set(hipRadius * 0.26, clawLength, hipRadius * 0.26);
          dummy.updateMatrix();
          clawRef.current?.setMatrixAt(clawInstance, dummy.matrix);
          clawInstance++;
        }

        legInstance++;
      }
    }
    if (legRef.current) {
      legRef.current.instanceMatrix.needsUpdate = true;
      if (legRef.current.instanceColor) legRef.current.instanceColor.needsUpdate = true;
    }
    if (shinRef.current) {
      shinRef.current.instanceMatrix.needsUpdate = true;
      if (shinRef.current.instanceColor) shinRef.current.instanceColor.needsUpdate = true;
    }
    if (kneeRef.current) {
      kneeRef.current.instanceMatrix.needsUpdate = true;
      if (kneeRef.current.instanceColor) kneeRef.current.instanceColor.needsUpdate = true;
    }
    if (pawRef.current) {
      pawRef.current.instanceMatrix.needsUpdate = true;
      if (pawRef.current.instanceColor) pawRef.current.instanceColor.needsUpdate = true;
    }
    if (clawRef.current) clawRef.current.instanceMatrix.needsUpdate = true;

    if (headLightRef.current) {
      headLightRef.current.position.copy(points[0]);
    }

    if (headRef.current) {
      // Every earlier version of this block computed the head's own
      // independent orientation (yaw-only, then yaw blended with a
      // scroll-steer, plus a slerp biasing it toward facing the camera) —
      // which never matches the neck segment's (body instance 0) actual
      // orientation, so the head visibly twists away from the body it's
      // supposedly attached to (the "looks detached/funny" complaint).
      // Building the head's basis from the EXACT same right/up/tangent the
      // neck segment used (captured into scratch.neck* during the body
      // loop above) instead removes all of that independent turning — the
      // head is now rigidly welded to the neck's own bearing, so it can
      // never show a seam. The neck's tangent points from the head *into*
      // the body, so the head (whose local +Z faces outward, away from the
      // body) uses it negated; negating tangent and right together (up
      // stays as-is) keeps the frame properly right-handed.
      //
      // Left as pure -neckTangent, `forward` is near-vertical almost all
      // the time (the follow-chain's resting bearing), which showed the
      // top/back of the skull instead of the face — confirmed by
      // screenshotting many mouse positions, the face was essentially
      // never visible. A first attempt fixed this by blending forward
      // toward the camera axis and then re-orthogonalizing against a
      // `right` *locked* to the neck's own value — but `right` is derived
      // from the same 3D tangent and frequently carries a large world-Z
      // component itself (the whole cross-section rolls toward the camera
      // axis whenever the chain curves sideways), so projecting the blend
      // against a FIXED right cancelled most of it out.
      //
      // The fix that actually works: blend forward toward the camera axis
      // FIRST, then run it through the exact same stable-basis recipe the
      // neck itself uses (rightRef fallback + cross products) instead of
      // reusing the neck's own right/up as fixed values. At zero blend
      // this reduces to precisely the neck's own basis (provably: same
      // rightRef branch, right'=-neckRight, up'=neckUp), so there's still
      // no seam at rest; as the blend increases, right/up are recomputed
      // fresh from the new forward, so the head reads as bending toward
      // the camera rather than snapping into an unrelated, independently
      // -computed rotation (the actual old "hài/detached" bug).
      const p0 = points[0];
      headRef.current.position.copy(p0).addScaledVector(scratch.neckTangent, 0.08);
      const forward = scratch.tangent.copy(scratch.neckTangent).negate().lerp(WORLD_FORWARD, 0.55).normalize();
      const rightRef = Math.abs(forward.y) > 0.95 ? WORLD_RIGHT : WORLD_UP;
      const right = scratch.right.crossVectors(rightRef, forward).normalize();
      const up = scratch.up.crossVectors(forward, right).normalize();
      headRef.current.quaternion.setFromRotationMatrix(scratch.mat.makeBasis(right, up, forward));
    }
    if (jawRef.current) {
      // Opened up substantially from an earlier barely-visible -0.15 (then
      // -0.62, then -0.95, still not read as clearly "roaring open" as the
      // reference painting's wide gape at the dragon's actual on-screen
      // size — the head is a small fraction of the whole silhouette, so a
      // "subtle but technically correct" angle just disappears). This
      // needs to be exaggerated well past what would look "realistic" up
      // close to actually read at a glance.
      jawRef.current.rotation.x = -1.35 + Math.sin(t * 2.2) * 0.1;
    }
  });

  return (
    <>
      <instancedMesh ref={bodyRef} args={[undefined, undefined, SEGMENT_COUNT]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          roughness={0.35}
          metalness={0.3}
          emissive="#7a2500"
          emissiveIntensity={0.35}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          flatShading
        />
      </instancedMesh>

      {/* Dorsal ridge — recolored from the earlier flat green (which only
          existed to break up a too-smooth silhouette) to a cream→auburn
          gradient via per-instance color, matching the reference painting's
          warm gold/orange/red palette. Base material color is left white so
          `setColorAt` isn't tinted. */}
      <instancedMesh ref={ridgeRef} args={[undefined, undefined, SEGMENT_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.15} emissive="#7a2000" emissiveIntensity={0.3} />
      </instancedMesh>

      {/* 4 legs (front pair + back pair), each a two-segment thigh+shin
          bent at a knee joint (see KNEE_BEND / the leg loop comment) plus a
          small paw pad — oriented per-instance in useFrame via the stable
          tangent/right/up frame. Base material color left white so
          instance color (matching the body's gradient at that point along
          the spine) isn't tinted. */}
      <instancedMesh ref={legRef} args={[undefined, undefined, 4]}>
        <cylinderGeometry args={[0.7, 1, 1, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.25} emissive="#7a2500" emissiveIntensity={0.3} />
      </instancedMesh>
      <instancedMesh ref={shinRef} args={[undefined, undefined, 4]}>
        <cylinderGeometry args={[0.6, 0.9, 1, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.25} emissive="#7a2500" emissiveIntensity={0.3} />
      </instancedMesh>
      <instancedMesh ref={kneeRef} args={[undefined, undefined, 4]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.25} emissive="#7a2500" emissiveIntensity={0.3} flatShading />
      </instancedMesh>
      <instancedMesh ref={pawRef} args={[undefined, undefined, 4]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} metalness={0.2} emissive="#7a2500" emissiveIntensity={0.3} />
      </instancedMesh>

      {/* Claws — a 3-toe fan on each of the 4 paws (2 legs × 2 sides × 3
          toes = 12 instances), in a pale ivory/horn tone that reads clearly
          against the gold/orange legs for a fiercer, more "hùng hồn" look. */}
      <instancedMesh ref={clawRef} args={[undefined, undefined, 12]}>
        <coneGeometry args={[1, 1, 6]} />
        <meshStandardMaterial color="#f3e6c8" roughness={0.3} metalness={0.1} emissive="#8a7550" emissiveIntensity={0.15} />
      </instancedMesh>

      {/* Warm point light riding with the head — a small rim of golden
          light on the scales as the dragon moves, echoing the glowing gold
          highlights in the reference painting without needing an HDRI. */}
      <pointLight ref={headLightRef} color="#ffb347" intensity={1.4} distance={4.5} decay={2} />

      <group ref={headRef} scale={0.6}>
        {/* cranium — faceted (not a smooth sphere) and elongated toward the
            snout, so it reads as a sculpted wedge-shaped head rather than a
            round ball sitting on the body */}
        <mesh position={[0, 0.01, 0.24]} scale={[0.46, 0.36, 0.78]}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#ffdd7a"
            emissive="#c8842a"
            emissiveIntensity={0.3}
            roughness={0.35}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            iridescence={0.5}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            flatShading
          />
        </mesh>

        {/* tapered snout tip, narrower than the cranium, so the face reads
            as a distinct muzzle instead of one uniform round blob */}
        <mesh position={[0, -0.02, 0.86]} rotation={[Math.PI / 2, 0, 0]} scale={[0.24, 0.4, 0.24]}>
          <coneGeometry args={[1, 1.4, 8]} />
          <meshPhysicalMaterial
            color="#f0c05a"
            emissive="#c8842a"
            emissiveIntensity={0.25}
            roughness={0.35}
            clearcoat={1}
            clearcoatRoughness={0.2}
            iridescence={0.4}
            iridescenceIOR={1.3}
          />
        </mesh>

        {/* brow ridge over each eye — vivid red-orange "flame eyebrow" like
            the reference painting, instead of the earlier brownish-gold */}
        <mesh position={[0.22, 0.24, 0.56]} rotation={[0.25, 0.15, -0.12]} scale={[0.22, 0.05, 0.16]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#e14a1f" emissive="#8a1f0a" emissiveIntensity={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[-0.22, 0.24, 0.56]} rotation={[0.25, -0.15, 0.12]} scale={[0.22, 0.05, 0.16]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#e14a1f" emissive="#8a1f0a" emissiveIntensity={0.5} roughness={0.5} />
        </mesh>

        {/* lá đề crest on the nose */}
        <mesh position={[0, 0.36, 0.7]} rotation={[0.3, 0, 0]} scale={[0.2, 0.32, 0.07]}>
          <coneGeometry args={[1, 1.6, 4]} />
          <meshStandardMaterial color="#e0a53a" roughness={0.4} />
        </mesh>

        {/* Curved backward-sweeping horns — extended from a 2-segment to a
            3-segment antelope-like curve, and lengthened substantially,
            to read as the long, majestic branching horns sweeping back
            over the mane in the reference painting instead of the earlier
            stubby crest-sized nubs. Each successive segment is thinner,
            longer, and angled further back, so the curve reads as one
            continuous sweep rather than jointed sticks. */}
        {[1, -1].map((side) => (
          <group key={side}>
            <mesh position={[side * 0.16, 0.32, 0.12]} rotation={[-0.5, 0, side * 0.16]} scale={[0.036, 0.42, 0.036]}>
              <cylinderGeometry args={[1, 0.65, 1, 8]} />
              <meshStandardMaterial color="#ffdf9e" emissive="#c8842a" emissiveIntensity={0.3} roughness={0.35} metalness={0.4} />
            </mesh>
            <mesh position={[side * 0.24, 0.66, -0.16]} rotation={[-1.05, 0, side * 0.22]} scale={[0.028, 0.4, 0.028]}>
              <cylinderGeometry args={[1, 0.55, 1, 8]} />
              <meshStandardMaterial color="#ffdf9e" emissive="#c8842a" emissiveIntensity={0.3} roughness={0.35} metalness={0.4} />
            </mesh>
            <mesh position={[side * 0.34, 0.96, -0.5]} rotation={[-1.55, 0, side * 0.3]} scale={[0.02, 0.34, 0.02]}>
              <cylinderGeometry args={[1, 0.4, 1, 8]} />
              <meshStandardMaterial color="#fff0c6" emissive="#c8842a" emissiveIntensity={0.3} roughness={0.35} metalness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Bulging eyes — a diagnostic pass (bright saturated green,
            radius 0.3) confirmed the head orientation fix above really
            does keep the face toward the camera; the *original* eyes (a
            single 0.11-radius sphere, dark iris + orange emissive) simply
            never had enough contrast to read, because that same warm
            orange-gold tone is what the whole face already emits — an eye
            colored like the face it's on all but disappears. Rebuilt as a
            white sclera + smaller black pupil (a color pairing nothing
            else on the head uses), which reads clearly against gold at
            actual on-screen scale the way another shade of orange couldn't. */}
        {/* At the dragon's actual on-screen size in its resting coiled
            pose, the whole head can be only a few dozen pixels across —
            small enough that subtle diffuse-color contrast (even white
            against gold) gets lost to anti-aliasing. Making the sclera
            itself glow (emissive, not just a light diffuse color) is what
            reliably survives at that scale, the same reasoning already
            used for the mouth cavity below. */}
        <mesh position={[0.23, 0.12, 0.6]}>
          <sphereGeometry args={[0.24, 14, 14]} />
          <meshStandardMaterial color="#fdf6e3" emissive="#fdf6e3" emissiveIntensity={1.4} roughness={0.25} />
        </mesh>
        <mesh position={[0.23, 0.12, 0.76]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#120d09" emissive="#ff5a1a" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[-0.23, 0.12, 0.6]}>
          <sphereGeometry args={[0.24, 14, 14]} />
          <meshStandardMaterial color="#fdf6e3" emissive="#fdf6e3" emissiveIntensity={1.4} roughness={0.25} />
        </mesh>
        <mesh position={[-0.23, 0.12, 0.76]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#120d09" emissive="#ff5a1a" emissiveIntensity={1.6} />
        </mesh>

        {/* mane, 5 tufts fanning out sideways + back so the head reads as
            wide/crowned rather than a rounded tapering tip. Recolored from a
            single flat orange to a cream-dominant palette with one red and
            one pale-teal accent strand, echoing the multi-colored flowing
            mane in the reference painting. */}
        {[-2, -1, 0, 1, 2].map((i) => {
          const maneColor =
            i === -2 ? "#7fd8cf" : i === 2 ? "#c8492a" : "#fff3d6";
          const maneEmissive = i === -2 ? "#2f8a80" : i === 2 ? "#8a1f0a" : "#c8a25a";
          return (
            <mesh
              key={i}
              position={[i * 0.15, 0.06 - Math.abs(i) * 0.03, -0.24 - Math.abs(i) * 0.1]}
              rotation={[0.5, 0, i * -0.35]}
              scale={[0.11, 0.11, 0.38 - Math.abs(i) * 0.06]}
            >
              <coneGeometry args={[1, 1, 6]} />
              <meshStandardMaterial color={maneColor} emissive={maneEmissive} emissiveIntensity={0.35} roughness={0.5} />
            </mesh>
          );
        })}

        {/* Flowing whiskers — each side rebuilt as a 2-segment curved strand
            (same "increasingly-angled segments" technique as the horns
            above) instead of one short straight cylinder, so they sweep
            back and out past the head's own silhouette like the long
            streaming whiskers in the reference painting rather than
            reading as two stiff little pins. A second, shorter strand per
            side adds fullness (the reference shows several whisker
            tendrils, not just one per side). */}
        {[1, -1].map((side) => (
          <group key={side}>
            <mesh position={[side * 0.18, -0.14, 0.54]} rotation={[0.1, 0, side * 0.55]} scale={[0.026, 0.4, 0.026]}>
              <cylinderGeometry args={[1, 1, 1, 6]} />
              <meshStandardMaterial color="#fdf6e3" />
            </mesh>
            <mesh position={[side * 0.42, -0.28, 0.24]} rotation={[0.25, side * 0.3, side * 1.1]} scale={[0.018, 0.46, 0.018]}>
              <cylinderGeometry args={[1, 1, 1, 6]} />
              <meshStandardMaterial color="#fdf6e3" />
            </mesh>
            <mesh position={[side * 0.13, -0.22, 0.48]} rotation={[0.15, 0, side * 0.75]} scale={[0.016, 0.26, 0.016]}>
              <cylinderGeometry args={[1, 1, 1, 6]} />
              <meshStandardMaterial color="#fff3d6" />
            </mesh>
          </group>
        ))}

        {/* Dark mouth cavity — fixed to the skull (not the jaw), sitting
            behind/between the jaws so it reads as a visible open throat
            once the lower jaw drops away from it, instead of the mouth
            just looking like two touching shapes. Made bigger and lit with
            a hot glow (rather than a "realistic" dark red) specifically so
            it still reads as a mouth at the dragon's actual small on-screen
            size — a subtle dark box at this scale just disappears. Grown
            further (0.22->0.3 tall) to match the wider jaw gape above. */}
        <mesh position={[0, -0.1, 0.5]} rotation={[0.35, 0, 0]} scale={[0.3, 0.3, 0.44]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#6a1208" emissive="#e8300a" emissiveIntensity={1} roughness={0.6} />
        </mesh>

        {/* Upper fangs — fixed to the skull (they don't swing with the
            jaw), curling down over the lower jaw for a fiercer, "baring
            teeth from both rows" look instead of only the lower jaw having
            teeth. Sized well past what a "realistic" fang proportion would
            be, for the same legibility-at-small-scale reason as above. */}
        <mesh position={[0.11, 0.22, 0.6]} rotation={[-0.6, 0, 0]} scale={[0.08, -0.36, 0.08]}>
          <coneGeometry args={[1, 1, 6]} />
          <meshStandardMaterial color="#f8f2df" />
        </mesh>
        <mesh position={[-0.11, 0.22, 0.6]} rotation={[-0.6, 0, 0]} scale={[0.08, -0.36, 0.08]}>
          <coneGeometry args={[1, 1, 6]} />
          <meshStandardMaterial color="#f8f2df" />
        </mesh>

        {/* Open jaw, hinged at the back (group origin = hinge point, jaw
            box offset forward from it) instead of pivoting around its own
            center — so opening it swings the front/teeth down and forward
            while the back stays anchored at the skull, which is what
            actually reads as "open mouth" instead of the whole jaw
            block sliding. Base angle opened up substantially (from a
            barely-visible -0.15 to -0.6) plus a wider row of teeth
            (2 curling fangs + 2 smaller teeth) for "nhe răng" menace. */}
        <group ref={jawRef} position={[0, -0.17, 0.42]}>
          <mesh position={[0, -0.02, 0.26]} scale={[0.3, 0.16, 0.52]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#c8492a" roughness={0.5} />
          </mesh>
          {/* Tongue resting on the lower jaw — a flattened, curved-tip
              red pad that reads clearly against the hot-glowing mouth
              cavity above once the jaw is wide open, the extra detail
              that sells "há mồm" (open mouth) rather than just a dark
              gap between two shapes. */}
          <mesh position={[0, 0.05, 0.18]} scale={[0.16, 0.06, 0.4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#c23a2e" emissive="#7a140a" emissiveIntensity={0.4} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.06, 0.38]} rotation={[0.3, 0, 0]} scale={[0.13, 0.05, 0.14]}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial color="#c23a2e" emissive="#7a140a" emissiveIntensity={0.4} roughness={0.55} />
          </mesh>
          <mesh position={[0.11, 0.14, 0.42]} rotation={[-0.6, 0, 0]} scale={[0.07, 0.32, 0.07]}>
            <coneGeometry args={[1, 1, 6]} />
            <meshStandardMaterial color="#f8f2df" />
          </mesh>
          <mesh position={[-0.11, 0.14, 0.42]} rotation={[-0.6, 0, 0]} scale={[0.07, 0.32, 0.07]}>
            <coneGeometry args={[1, 1, 6]} />
            <meshStandardMaterial color="#f8f2df" />
          </mesh>
          <mesh position={[0.045, 0.11, 0.44]} rotation={[-0.55, 0, 0]} scale={[0.045, 0.2, 0.045]}>
            <coneGeometry args={[1, 1, 6]} />
            <meshStandardMaterial color="#f8f2df" />
          </mesh>
          <mesh position={[-0.045, 0.11, 0.44]} rotation={[-0.55, 0, 0]} scale={[0.045, 0.2, 0.045]}>
            <coneGeometry args={[1, 1, 6]} />
            <meshStandardMaterial color="#f8f2df" />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function DragonScene({ mouse }: DragonProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 4]} intensity={1} color="#f4e9d8" />
      <directionalLight position={[-3, -1, 2]} intensity={0.5} color="#ffe08a" />
      <Dragon mouse={mouse} />
    </Canvas>
  );
}
