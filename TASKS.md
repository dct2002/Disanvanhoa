# Tiến độ xây dựng — Di Sản Văn Hóa Việt Nam

## 1. Khởi tạo dự án
- [x] Scaffold Vite + React + TypeScript
- [x] Cài đặt Tailwind CSS v4, Three.js, React Three Fiber, Drei, Framer Motion, Lenis
- [x] Cấu trúc thư mục (components / data / types / hooks)

## 2. Dữ liệu (data layer)
- [x] `types/index.ts` — interface Heritage, TimelineEvent, RegionInfo, UnescoStat
- [x] `data/heritage.ts` — 25 di sản (9 vật thể / 10 phi vật thể / 6 tư liệu) + Trống đồng Đông Sơn
- [x] `data/regions.ts` — 10 điểm bản đồ theo vùng miền
- [x] `data/timeline.ts` — 9 mốc lịch sử (Đông Sơn → 1993)
- [x] `data/unesco.ts` — số liệu UNESCO (data-driven, dễ cập nhật)
- [x] `data/placeholder.ts` — sinh ảnh SVG placeholder cho di sản chưa có ảnh thật

## 3. Hạ tầng UI / hiệu ứng
- [x] `index.css` — theme màu (charcoal/burgundy/gold/ivory), font Playfair/Cormorant/Inter, glassmorphism, ornament pattern
- [x] `hooks/useLenis.ts` — smooth scroll (tự tắt khi prefers-reduced-motion)
- [x] `hooks/useMediaQuery.ts` — responsive & reduced-motion helpers
- [x] `components/CustomCursor.tsx` — con trỏ tùy chỉnh + glow (desktop only)
- [x] `components/ScrollProgress.tsx`
- [x] `components/LoadingScreen.tsx` — "Đang mở kho lưu trữ…" 0→100%
- [x] `components/HeritageImage.tsx` — lazy load + fallback ảnh lỗi

## 4. Các section chính
- [x] `Navbar.tsx` — glassmorphism khi scroll, menu mobile
- [x] `Hero.tsx` + `HeroScene.tsx` — 3D particles (R3F Sparkles + drum-ring), text reveal, CTA glow
- [x] `HeritageMap.tsx` — bản đồ SVG Việt Nam 3D-tilt, điểm sáng theo vùng, panel chi tiết
- [x] `TangibleHeritage.tsx` + `HeritageCard.tsx` — 3D horizontal gallery, tilt theo chuột
- [x] `IntangibleHeritage.tsx` — floating object tròn, particle, animation
- [x] `DocumentaryHeritage.tsx` — thẻ tài liệu kiểu polaroid xoay, dust particles
- [x] `Timeline.tsx` — dòng thời gian cuộn ngang
- [x] `UNESCOSection.tsx` — carousel 3D coverflow + counter animation
- [x] `ArtifactViewer.tsx` + `ArtifactScene.tsx` — Trống đồng Đông Sơn dựng bằng Three.js (LatheGeometry), auto-rotate/drag/zoom, spotlight bảo tàng
- [x] `Explore.tsx` + `SearchBar.tsx` + `FilterPanel.tsx` — tìm kiếm & lọc theo loại/khu vực/thời kỳ
- [x] `HeritageDetailModal.tsx` — modal 3D, gallery ảnh, lịch sử, vị trí trên bản đồ
- [x] `Footer.tsx`

## 5. Hoàn thiện
- [x] Ghép toàn bộ vào `App.tsx`, quản lý state modal chi tiết dùng chung
- [x] Responsive desktop-first, tắt particle Hero + custom cursor trên mobile
- [x] `prefers-reduced-motion` tắt Lenis, animation hero-zoom, hero scene
- [x] `npm run build` — tsc + vite build thành công, không lỗi
- [x] Kiểm thử bằng headless Chrome (puppeteer-core): hero, map, 3 loại di sản,
      timeline, UNESCO carousel, artifact viewer, search/filter, modal chi tiết,
      responsive mobile + menu — không có console error
- [x] Sửa lỗi: unused import (tsc), lighting/tối màu ở ArtifactScene, cảnh báo
      PCFSoftShadowMap đã bị three.js loại bỏ

## Nguồn ảnh
26 ảnh thật lấy từ Wikimedia Commons (tra cứu qua Wikipedia REST API +
Commons imageinfo API, đã xác minh HTTP 200). 4 di sản hiếm ảnh tự do
(Ví Giặm, Xòe Thái, Mộc bản Phúc Giang, Hoàng hoa sứ trình đồ) dùng ảnh
placeholder SVG sinh động — có thể thay URL thật bất cứ lúc nào trong
`heritage.ts`.

## Trạng thái: Hoàn thành bản dựng đầu tiên — chạy được, đã kiểm thử trực quan.

### Có thể mở rộng sau
- Thay `model3D` thật (.glb/.gltf) cho Trống đồng và các di sản khác
- Code-splitting sâu hơn cho chunk `extends` (three.js) ~893kB
- Thêm audio/video thật cho các di sản phi vật thể

## 6. Rồng 3D bay theo cuộn trang (bổ sung)
- [x] `data/heritage.ts` không đổi — tính năng thuần hiệu ứng thị giác, không
      cần data mới
- [x] `components/DragonScene.tsx` — rồng thời Lý dựng thủ công bằng Three.js
      (chuỗi 18 khối cầu "follow-the-leader", gradient vàng→đỏ, đầu có
      sừng/mắt phát sáng), đường bay Lissajous + lệch theo % cuộn trang
- [x] `components/DragonCompanion.tsx` — lớp `fixed` toàn trang, tự tắt khi
      mobile/`prefers-reduced-motion`, dùng `mix-blend-mode: screen` để không
      che cứng nội dung
- [x] Gắn vào `App.tsx` cạnh CustomCursor/ScrollProgress
- [x] Sửa lỗi quan trọng: canvas của react-three-fiber tự đặt inline
      `pointer-events: auto` đè lên `pointer-events-none` của lớp cha, khiến
      click xuyên qua bị chặn ở toàn bộ trang — đã fix bằng
      `style={{ pointerEvents: "none" }}` trực tiếp trên `<Canvas>`. Phát hiện
      qua kiểm thử headless Chrome (elementFromPoint trả về canvas thay vì
      nút thẻ di sản).
- [x] `npm run build` sạch, kiểm thử lại toàn bộ modal/search/mobile/nav —
      không lỗi console, không chặn click

### 6.1 Cải tiến theo phản hồi người dùng (dáng "giun" → dáng rồng, bay theo chuột)
- [x] Đổi cơ chế điều khiển: rồng bám theo **vị trí con trỏ chuột** (có độ trễ
      mượt ~0.055/frame để trông như đang "đuổi theo" chứ không dính cứng vào
      chuột), thay vì bám theo % cuộn trang — nghe theo `pointermove` toàn
      trang, tự tắt trên mobile/`reduced-motion` như cũ
- [x] Sửa dáng "con giun": mỗi đốt thân giờ được xoay theo tiếp tuyến hướng
      di chuyển (quaternion align theo chuỗi điểm) thay vì là các hình cầu
      trơn xếp chồng
- [x] Thêm **vây lưng** (gai đỏ dọc sống lưng) — đặc điểm thị giác quan trọng
      nhất giúp đọc ra "rồng" thay vì "giun"/"sâu"
- [x] Đầu rồng chi tiết hơn: hàm/mõm, sừng cong ra sau, bờm 3 chỏm phía sau
      gáy, mắt phát sáng rõ hơn
- [x] Màu sắc rực rỡ hơn (vàng sáng ở đầu → đỏ crimson ở đuôi), tăng emissive
      để hiệu ứng `mix-blend-mode: screen` phát sáng đẹp hơn trên nền tối
- [x] Kiểm thử lại: build sạch, click/modal/search/menu mobile vẫn hoạt động
      bình thường, dragon vẫn tắt trên mobile

### 6.2 Nặn lại đầu & thân cho đúng dáng rồng thời Lý (nghiên cứu thực tế)
- [x] Search web đặc điểm rồng thời Lý (thân uốn hình sin 12 khúc, mào lá
      đề, không sừng, bờm dài, mắt lồi, hàm mở răng nanh ngoắc lên, 4 chân
      3 móng) — nguồn: thanhnien.vn, sggp.org.vn, vi.wikipedia.org
- [x] Đầu: bỏ sừng, thêm mào lá đề (hình lá Bồ Đề) trên mũi, hàm dưới mở
      rộng + răng nanh cong lên, mắt lồi to hơn, bờm 4 chỏm + râu cằm +
      râu mép hai bên
- [x] Thân: thêm sóng biến điệu độ dày cố định theo chỉ số đốt (mô phỏng
      "khúc uốn lượn phình to rồi co lại"), làm vây lưng nhạt màu hơn (pha
      trắng-vàng) để hòa với thân thay vì gai đỏ chói
- [x] Thử thêm 4 chân có móng vuốt — sau 2 lần chỉnh (tangent-align rồi
      yaw-only) vẫn trông như que gãy/gai vụn ở góc nhìn nhỏ, không rõ là
      "chân" → quyết định bỏ hẳn thay vì giữ chi tiết làm rối hình
- [x] Kiểm thử lại: build sạch, click/modal/search/menu mobile vẫn hoạt
      động bình thường

### 6.3 Vẽ lại rồng theo phong cách tranh dân gian (vảy vàng, bờm xanh ngọc, sặc sỡ)
- [x] Đổi hoàn toàn kỹ thuật dựng thân/đầu (giữ 3D thật theo lựa chọn của
      người dùng, không chuyển sang SVG phẳng):
      - Thân: `THREE.CatmullRomCurve3` qua chuỗi điểm follow-chain →
        `TubeGeometry` dựng lại mỗi frame → mặt ống liền mạch, hết dáng
        "chuỗi hạt/sâu"
      - Vây lưng xanh lá: `THREE.ExtrudeGeometry` với `extrudePath` theo
        cùng đường cong — Three.js tự tính khung Frenet nên vây luôn bám
        đúng theo thân, không còn lỗi xoay lung tung như lần thử chân trước
      - Đầu: sprite minh họa (billboard luôn hướng camera + xoay theo
        hướng bay) — mặt vàng, mắt to viền đen, bờm xanh ngọc bay, hàm mở
        lộ răng trắng, râu vàng cong, mào lửa đỏ trên trán
- [x] Texture vảy + đầu rồng tự vẽ bằng SVG (data URI, không cần asset
      ngoài) trong file mới `src/components/dragonTextures.ts`, nạp qua
      `THREE.TextureLoader` — cùng kỹ thuật với `placeholderImage()`
- [x] Bỏ `mix-blend-mode: screen` ở `.dragon-layer` (index.css), chuyển
      sang blend thường + `opacity` + `drop-shadow` để giữ đúng màu sắc rực
      rỡ thay vì bị tẩy nhạt như thiết kế vàng-mờ trước đó
- [x] Tinh chỉnh texture vảy (tăng kích thước, tăng tương phản viền) sau khi
      thấy lần đầu bị rối thành vân dệt thay vì vảy tròn rõ
- [x] Kiểm thử lại: build sạch, click xuyên qua canvas vẫn mở modal đúng
      (không hồi quy lỗi pointer-events), menu mobile hoạt động, rồng vẫn
      ẩn trên mobile/reduced-motion

### 6.4 Quay lại rồng "chuỗi khối cầu" theo phản hồi người dùng ("xấu quá")
- [x] Người dùng phản hồi bản vảy vàng/tube-billboard (6.3) "xấu quá", yêu
      cầu quay lại bản cũ. Vì dự án không dùng git nên không có snapshot để
      phục hồi y hệt — đã hỏi lại người dùng xác nhận muốn dựng lại đúng
      tinh thần bản "chuỗi khối cầu" (giai đoạn 6.1/6.2, trước bản vảy vàng)
      theo mô tả trong TASKS.md, không phải bỏ hẳn tính năng.
- [x] Xoá `src/components/dragonTextures.ts` (không còn dùng), viết lại
      hoàn toàn `DragonScene.tsx`: thân là `InstancedMesh` các khối
      icosahedron thon dần (taper + wave nhẹ), vây lưng là `InstancedMesh`
      hộp xanh lá so le cao/thấp, đầu là group dựng tay (sọ, mào lá đề, mắt
      lồi, bờm 5 chỏm toè ngang, râu cong, hàm mở + răng nanh) — giữ nguyên
      logic follow-chain đuổi theo chuột. Khôi phục `mix-blend-mode: screen`
      cho `.dragon-layer` (bỏ opacity/drop-shadow của bản vảy vàng).
- [x] Lần dựng đầu tiên lại xấu theo kiểu khác: thân thon đều theo một
      hướng thẳng khi đuổi chuột theo đường thẳng bị đọc nhầm thành hình
      viên nang/capsule rất phản cảm — phát hiện qua ảnh chụp headless
      Chrome khi mô phỏng chuột di chuyển liên tục. Đã sửa bằng cách:
      - Thêm dao động ngang nhẹ (perpendicular sine wave) vào từng điểm
        follow-chain mỗi frame → thân luôn uốn hình chữ S dù đầu di chuyển
        theo đường thẳng, phá vỡ dáng ống trơn.
      - Vây lưng đổi màu xanh lá rực + so le cao thấp (thay vì cùng tông
        với thân) để bẻ gãy đường viền mượt của thân.
      - Đoạn cổ (3 đốt đầu tiên) thon nhỏ dần từ 0 thay vì full size ngay,
        tránh khối cầu thân đè lên đúng vị trí đầu (trước đó làm mất hết
        chi tiết mặt vì bị khối thân to che khuất).
      - Đầu phóng to hơn (0.55 → 0.72) và bờm 5 chỏm toè sang hai bên thay
        vì chỉ chúc ra sau, để phần đầu đọc rõ là "đầu" thay vì một khối
        tròn nối tiếp thân.
- [x] Kiểm thử lại bằng headless Chrome (di chuột nhiều điểm + click nút
      CTA thật): build sạch, không lỗi console, `elementFromPoint` tại vị
      trí nút bấm trả về đúng phần tử nội dung (không phải canvas) — không
      hồi quy lỗi chặn click; rồng vẫn ẩn trên mobile/reduced-motion.
- [x] Ghi nhận: đã dựng lại theo đúng mô tả kỹ thuật của bản 6.1/6.2 nhưng
      không có mã nguồn gốc để đối chiếu pixel-for-pixel — nếu người dùng
      thấy vẫn chưa giống bản họ nhớ, cần mô tả cụ thể hơn (ảnh chụp màn
      hình cũ nếu còn giữ) để tinh chỉnh tiếp thay vì đoán lại từ đầu.
- [x] Sửa lỗi "cứ xoay xoay liên tục" (rồng không bao giờ đứng yên): nguyên
      nhân là (1) sóng lượn ngang (slither wave) mới thêm chạy theo đồng hồ
      thời gian vô hạn, không liên quan gì đến việc chuột có di chuyển hay
      không, và (2) biên độ "idle wander" (độ trôi khi chuột đứng yên) quá
      lớn (đặc biệt trục Z ±0.9) khiến cả con rồng lắc lư/xoay vòng chậm
      vĩnh viễn. Đã sửa: thêm biến `activity` đo tốc độ di chuyển đầu rồng
      mỗi frame, nhân vào biên độ sóng lượn → đứng yên khi chuột đứng yên;
      giảm biên độ idle wander xuống ~1/6-1/8. Kiểm thử lại bằng 2 ảnh chụp
      cách nhau ~1.8s khi chuột đứng yên — hình gần như giống hệt nhau,
      xác nhận rồng đã đứng yên đúng như mong đợi.
- [x] Theo phản hồi "thân nhỏ đầu to, đầu tròn quá": tăng thân to & dài hơn
      (bán kính gốc 0.165→0.25, `SEGMENT_LENGTH` 0.24→0.27, số đốt 20→25),
      giảm tỉ lệ đầu so với thân (group scale đầu 0.72→0.6) để cân đối lại.
      Đầu: đổi sọ từ `sphereGeometry` (tròn trơn) sang `icosahedronGeometry`
      dẹt mặt (faceted) và kéo dài về phía mõm, thêm mõm thon riêng
      (`coneGeometry`) và gờ lông mày (brow ridge) trên hai mắt để phá vỡ
      dáng "quả cầu tròn", đọc rõ là đầu có góc cạnh hơn. Kiểm thử lại: build
      sạch, không lỗi console, click CTA vẫn xuyên đúng qua canvas (không hồi
      quy pointer-events).

### 6.5 Nâng cấp vật liệu/màu sắc gần với tranh rồng vàng mẫu
- [x] Người dùng gửi 1 ảnh rồng vàng phong cách tranh vẽ/render chi tiết
      (vảy ánh ngũ sắc, bờm nhiều lớp trắng/đỏ/xanh ngọc, sừng cong, gradient
      vàng→cam→đỏ) và hỏi có làm được như vậy không. Đã trả lời thẳng: kiến
      trúc hình khối lập trình hiện tại KHÔNG thể đạt độ chi tiết tranh vẽ
      tay/render — cho người dùng chọn giữa nâng cấp bản 3D thủ công / dùng
      sprite ảnh 2D thật / tìm model 3D có sẵn / giữ nguyên. Người dùng chọn
      **nâng cấp bản 3D thủ công hiện tại**, chấp nhận giới hạn.
- [x] Đổi vật liệu thân + sọ + mõm từ `meshStandardMaterial` sang
      `meshPhysicalMaterial` với `clearcoat`/`clearcoatRoughness` +
      `iridescence`/`iridescenceIOR`/`iridescenceThicknessRange` — tạo ánh
      lấp lánh kiểu "sơn mài" trên vảy thay vì bề mặt nhựa phẳng.
- [x] Gradient màu thân đổi từ 2 tông (vàng→đỏ) sang 3 tông (vàng→cam→đỏ
      thẫm, `HEAD_COLOR`/`MID_COLOR`/`TAIL_COLOR`) cho ấm và giàu sắc độ hơn.
- [x] Vây lưng đổi từ xanh lá đơn sắc sang gradient kem→hổ phách/đỏ theo
      instance color riêng (`RIDGE_HEAD_COLOR`/`RIDGE_TAIL_COLOR`), hòa vào
      bảng màu vàng/cam/đỏ chung thay vì tương phản xanh lá như trước.
- [x] Đầu: thêm 2 sừng cong ra sau (2 đoạn cylinder mỗi bên, góc tăng dần),
      đổi màu gờ lông mày sang đỏ cam rực ("lông mày lửa"), bờm 5 chỏm đổi
      từ đơn sắc cam sang phối kem chủ đạo + 1 chỏm đỏ + 1 chỏm xanh ngọc
      nhạt, râu dài/mảnh hơn và đổi màu kem/trắng ngà.
- [x] Thêm 1 `pointLight` màu vàng cam bám theo vị trí đầu mỗi frame, tạo
      điểm sáng ấm trên vảy khi rồng di chuyển — không cần tải HDRI/asset
      ngoài.
- [x] Kiểm thử: build sạch, headless Chrome xác nhận màu gradient ấm rõ
      hơn, ánh clearcoat/iridescence thấy được qua các đốm sáng specular
      trên thân, không lỗi console, click CTA vẫn xuyên đúng qua canvas
      (không hồi quy pointer-events).
- [x] Giới hạn đã nói rõ với người dùng: đây vẫn là phong cách cách điệu/
      low-poly, có lấp lánh và màu sắc phong phú hơn hẳn, nhưng KHÔNG đạt
      độ chi tiết vẽ tay/render của ảnh mẫu.

### 6.6 Gắn liền đầu-thân, uốn lượn tự nhiên hơn, thêm 4 chân
- [x] **Đầu liền thân**: đổi công thức `neckTaper` từ tăng tuyến tính từ 0
      (`i/4`, khiến 3-4 đốt đầu gần như vô hình → hở khoảng trống giữa đầu
      và thân) sang `clamp(0.4 + i*0.3, 0.4, 1)` — đốt đầu tiên giờ có kích
      thước tối thiểu 40% thay vì 0%, nối liền vào gáy đầu ngay lập tức,
      đạt full size chỉ sau 2 đốt thay vì 4. Kiểm tra ảnh chụp xác nhận
      không còn khoảng hở giữa đầu và thân.
- [x] **Uốn lượn tự nhiên hơn**: sóng lượn ngang (slither wave, thêm ở mục
      6.4 để tránh dáng "viên nang") trước đó có tần số không gian quá cao
      (`i*0.9` ⇒ ~3.6 chu kỳ dọc thân 25 đốt) khiến thân uốn lượn dồn dập,
      không tự nhiên. Giảm xuống `i*0.32` (~1.3 chu kỳ, một đường cong mềm
      duy nhất) và giảm biên độ 0.07→0.045, tần số thời gian 3.2→1.6 để
      chuyển động chậm/mượt hơn khi đang di chuyển.
- [x] **Thêm 4 chân**: gắn theo cặp trước/sau tại 2 đốt cố định
      (`FRONT_LEG_INDEX=6`, `BACK_LEG_INDEX=16`), dựng bằng 2 `InstancedMesh`
      mới (`legRef` đùi hình trụ thon, `pawRef` bàn chân hình cầu dẹt), định
      hướng bằng CHÍNH khung tọa độ ổn định (tangent/right/up dựng từ
      `WORLD_UP`/`WORLD_RIGHT`) đã dùng cho thân/vây lưng — không dùng
      `quaternion.setFromUnitVectors` trực tiếp trên trục thế giới (nguyên
      nhân gây lỗi "chân xoay như que gãy" ở 2 lần thử trước, ghi tại mục
      6.2). Hướng chân = tổ hợp ổn định của `-up` (xuống) và `right*side`
      (ra ngoài), nên xoay mượt theo thân khi uốn cong thay vì lật ngẫu
      nhiên. Màu chân lấy theo gradient thân tại đúng vị trí gắn (đồng bộ
      màu, không rời rạc).
- [x] Kiểm thử: build sạch, headless Chrome xác nhận chân hiển thị như đùi+
      bàn chân rõ ràng (không phải que gãy), đầu nối liền thân không hở,
      thân uốn cong mềm mại một đường duy nhất; chụp 2 ảnh cách nhau ~1.5s
      khi đứng yên — giống hệt nhau (không hồi quy lỗi "xoay xoay liên
      tục"); click CTA vẫn xuyên đúng qua canvas (không hồi quy
      pointer-events).

### 6.7 Thêm ngón chân (móng vuốt) cho 4 chân
- [x] Mỗi bàn chân giờ có 3 ngón toè ra hình quạt, dựng bằng 1 `InstancedMesh`
      mới (`clawRef`, 2 chân × 2 bên × 3 ngón = 12 instance), màu ngà/xương
      (`#f3e6c8`) tương phản rõ với chân màu vàng/cam.
- [x] Hướng mỗi ngón dựng từ CHÍNH khung tọa độ ổn định của chân
      (`legForward`/`legRight`, vốn đã suy ra từ `tangent`/`right`/`up` ổn
      định) — không dùng phép xoay trục-đơn nào mới, nên không tái phát lỗi
      "chân/ngón xoay lung tung" đã gặp ở các lần thử chân trước đó.
      `legForward` xấp xỉ song song với `tangent` của thân tại điểm gắn chân,
      nên ngón chân trỏ dọc theo hướng thân — hợp lý về mặt giải phẫu.
- [x] Sau lần dựng đầu tiên (góc toè hẹp, khó thấy rõ 3 ngón riêng biệt ở
      một số góc nhìn), đã tăng góc toè (0.55→0.85), độ dài (×0.85→×1.05)
      và độ dày (×0.2→×0.26) ngón để rõ ràng/dữ dằn hơn ("hùng hồn").
- [x] Kiểm thử: build sạch; headless Chrome (viewport 1440×900,
      `deviceScaleFactor: 2`, chụp toàn khung hình rồi xem trực tiếp thay vì
      đoán tọa độ crop) xác nhận cả 2 bàn chân đều thấy rõ 3 ngón toè hình
      quạt, màu ngà tương phản tốt với chân; không lỗi console.

### 6.8 Thêm khớp gối cho chân (đùi + ống chân bẻ góc)
- [x] Người dùng phản hồi chân đang là 1 đoạn thẳng, phải có khớp như tranh
      rồng mẫu. Tách chân thành 2 đoạn: đùi (`legRef`, giữ nguyên hướng
      xuống-ra-ngoài cũ) và ống chân (`shinRef`, mới) gặp nhau tại một khớp
      gối rõ ràng (`kneeRef`, khối đa diện nhỏ đánh dấu khớp).
- [x] Hướng ống chân = xoay hướng đùi quanh trục `legRight` một góc cố định
      `KNEE_BEND` (≈0.95 rad). Xoay một vector ổn định quanh một trục ổn
      định khác theo góc cố định vẫn giữ ổn định qua từng frame — không
      phát sinh lại lỗi "khớp/chân xoay lung tung" đã gặp ở các lần thử
      chân trước (nguyên nhân gốc luôn là dùng phép xoay trục-đơn trực tiếp
      trên trục thế giới, không phải là "có nhiều khớp thì dễ hỏng hơn").
- [x] Bàn chân + móng vuốt (mục 6.7) giờ gắn vào đầu ống chân thay vì đầu
      đùi, dùng khung tọa độ riêng của ống chân (`shinRight`/`shinForward`)
      để hướng ngón chân vẫn đúng theo góc đã bẻ.
- [x] Kiểm thử: build sạch; headless Chrome (viewport 1440×900,
      `deviceScaleFactor: 2`) xác nhận chân hiện rõ chỗ gấp khúc tại gối
      thay vì một đoạn thẳng đơ; không lỗi console; click CTA vẫn xuyên
      đúng qua canvas (không hồi quy pointer-events).

### 6.9 Rồng bay theo hướng cuộn trang (lướt xuống → bay xuống, lướt lên → bay lên)
- [x] Thêm theo dõi `window.scrollY` mỗi frame trong `DragonScene.tsx`: tính
      `scrollDelta` (chênh lệch so với frame trước), làm mượt thành
      `scrollVelocity` (lerp 0.35/frame để tránh giật khi chỉ 1 frame có
      delta lớn), rồi suy ra `scrollBoost` (clamp ±1.6) cộng thẳng vào
      `targetY` của đầu rồng — cùng chỗ với thành phần theo chuột, không cần
      sửa `DragonCompanion.tsx` hay đụng đến Lenis.
- [x] Dấu trừ: `scrollY` tăng = trang cuộn xuống = phải đọc là "xuống" trên
      màn hình = Y thế giới (Y-up) phải *giảm* → `scrollBoost = -velocity *
      hệ_số`. Đã kiểm tra hướng đúng bằng test trực quan (xem bên dưới).
- [x] Vì `scrollVelocity` tự suy giảm về 0 khi trang ngừng cuộn (do lerp về
      `scrollDelta` mà bản thân nó về 0 khi không cuộn nữa), hiệu ứng chỉ
      đẩy rồng lệch hướng TRONG LÚC đang cuộn — không để rồng bị "mắc kẹt"
      lệch vị trí sau khi cuộn xong; rồng lại quay về bám theo chuột như cũ.
- [x] Không cần đọc sự kiện `scroll` của Lenis (vốn có thể có vấn đề thứ tự
      mount effect giữa `useLenis` và `DragonCompanion`) — đọc trực tiếp
      `window.scrollY` mỗi frame trong `useFrame` đơn giản và không phụ
      thuộc thời điểm Lenis khởi tạo, vì Lenis (không dùng `wrapper`) vẫn
      cập nhật `window.scrollY` thật mỗi frame khi easing.
- [x] Kiểm thử bằng headless Chrome: giữ chuột cố định ở TRÊN màn hình (kéo
      đầu rồng lên) rồi cuộn trang xuống thật mạnh — xác nhận rồng vẫn bị
      kéo xuống rõ rệt bất chấp chuột đang kéo lên (ảnh chụp trước/trong lúc
      cuộn cho thấy thân rồng vươn dài xuống dưới hẳn). Test ngược lại (giữ
      chuột ở DƯỚI, cuộn lên thật mạnh) cũng cho kết quả đúng — đầu rồng bị
      kéo lên gần đầu trang dù chuột đang kéo xuống. Build sạch, không lỗi
      console, click CTA vẫn xuyên đúng qua canvas (không hồi quy
      pointer-events).

### 6.10 Miệng há to hơn, nhe răng rõ ràng hơn ("hùng hồn")
- [x] Trước đó hàm gần như không mở (góc xoay cơ sở chỉ -0.15 rad, gần như
      không thấy), chỉ có 2 răng nanh nhỏ ở hàm dưới, không có "khoang
      miệng" tối nên trông không rõ là miệng đang mở.
- [x] Sửa lại pivot của `jawRef`: trước đây group đặt ĐÚNG TÂM khối hàm nên
      xoay làm cả khối trượt lung tung; giờ group đặt tại điểm khớp hàm
      (phía sau), khối hàm dịch về phía trước từ điểm đó — xoay group giờ
      đúng kiểu bản lề thật (phần sau cố định, đầu hàm/răng chúc xuống khi
      mở), không phải cả khối tịnh tiến.
- [x] Tăng góc mở cơ sở từ -0.15 → -0.62 rad (mở rõ rệt) kèm dao động nhẹ
      ±0.07 (thở/gầm), thay vì gần như đứng yên như trước.
- [x] Thêm: 2 răng nanh HÀM TRÊN cố định (không xoay theo hàm dưới, cong
      chúc xuống — dùng scale Y âm để lật hướng thay vì tính lại góc xoay),
      2 răng nhỏ thêm ở hàm dưới (tổng 4 răng hàm dưới + 2 răng hàm trên =
      6 răng, thay vì chỉ 2), và một khối "khoang miệng" màu đỏ sẫm
      (`#4a0f0a`) cố định phía sau để lộ ra rõ khi hàm mở.
- [x] Kiểm thử: build sạch; headless Chrome (viewport 1440×900,
      `deviceScaleFactor: 2`) xác nhận miệng hiện rõ nhiều răng trắng nhô ra
      quanh khoang miệng đỏ sẫm — rõ rệt hơn hẳn bản 2-răng-nhỏ trước; không
      lỗi console; click CTA vẫn xuyên đúng qua canvas (không hồi quy
      pointer-events).

### 6.11 Kiểm tra & sửa lỗi toàn diện
- [x] `npm run build` (tsc + vite) — sạch, không lỗi.
- [x] `npm run lint` (oxlint) — phát hiện 2 cảnh báo React tồn tại từ trước
      (không liên quan đến rồng), đã sửa cả hai:
      - `src/hooks/useMediaQuery.ts`: bỏ lệnh `setMatches(mql.matches)` dư
        thừa trong effect — state khởi tạo đã lấy đúng giá trị hiện tại qua
        lazy initializer, gọi lại trong effect chỉ đồng bộ giá trị đã đúng
        sẵn (thực chất chỉ dư khi `query` là chuỗi cố định, đúng như 2 nơi
        gọi hook này trong dự án — `useIsMobile`/`usePrefersReducedMotion`).
      - `src/components/HeritageDetailModal.tsx`: bỏ pattern "effect reset
        state theo prop" (`useEffect(() => setActiveImage(0), [heritage])`)
        — tách phần gallery ảnh (ảnh lớn + dải thumbnail) ra component
        `GalleryHero` riêng, gắn `key={heritage.id}` khi render — React tự
        remount và reset state gallery mỗi khi chuyển sang di sản khác,
        không cần effect đồng bộ ngược lại nữa (đúng khuyến nghị chính thức
        của React: "Resetting state with a key").
- [x] Quét toàn site bằng headless Chrome: cuộn qua tất cả section (hero,
      map, 3 loại di sản, timeline, UNESCO, artifact viewer, explore),
      không lỗi/warning console nào.
- [x] Kiểm thử riêng modal chi tiết di sản sau khi refactor: mở modal bằng
      click thẻ, chuyển ảnh thumbnail, đóng bằng phím Escape (xác nhận
      `document.body.style.overflow` được dọn sạch), mở lại, đóng bằng click
      nền — tất cả đúng như mong đợi, không lỗi.
- [x] Quét lại riêng tính năng rồng: di chuột nhiều vị trí + cuộn trang
      mạnh (kích hoạt đồng thời sóng lượn, chân, khớp gối, móng vuốt, hàm,
      hiệu ứng cuộn) — không lỗi console; chụp 2 ảnh cách nhau ~1.5s lúc
      đứng yên sau đó — giống hệt nhau, xác nhận không hồi quy lỗi "xoay
      xoay liên tục".
- [x] Không phát hiện lỗi chức năng nào khác ngoài 2 cảnh báo lint đã sửa.

### 6.12 Miệng "há to nhe răng" (6.10) không thấy rõ ở kích thước thật
- [x] Người dùng phản hồi không thấy khác biệt rõ sau khi sửa miệng ở mục
      6.10. Kiểm tra lại: code vẫn đúng như đã làm (không bị mất/ghi đè),
      nhưng khi chụp ảnh ở ĐÚNG kích thước hiển thị bình thường (không zoom/
      crop như lúc kiểm thử trước) thì thấy rõ nguyên nhân — đầu rồng (và
      đặc biệt phần miệng bên trong đầu) chỉ chiếm một phần rất nhỏ trên
      màn hình ở tư thế cuộn nghỉ thường thấy, nên chi tiết răng/hàm dù
      đúng về mặt hình học vẫn gần như không thấy được bằng mắt thường —
      lần kiểm thử trước chỉ xác nhận qua ảnh chụp phóng to (deviceScaleFactor
      2 + crop sát), không đại diện cho trải nghiệm xem thực tế.
- [x] Sửa bằng cách phóng đại mạnh riêng phần miệng (không đổi tỉ lệ đầu/
      thân tổng thể để tránh tái phát lỗi "đầu to thân nhỏ" đã sửa ở 6.4):
      góc há hàm -0.62 → -0.95 rad; răng nanh trên+dưới to gấp ~1.5-1.8 lần;
      khoang miệng to hơn (~1.3 lần) và đổi từ đỏ sẫm mờ sang màu cam-đỏ
      rực có `emissiveIntensity` 0.3→0.9 (phát sáng rõ) — ưu tiên độ tương
      phản/độ sáng hơn là tỉ lệ "thật" vì ở kích thước hiển thị nhỏ, độ
      sáng/tương phản đọc được tốt hơn nhiều so với chi tiết hình học tinh
      xảo.
- [x] Kiểm thử lại bằng ảnh chụp ở kích thước xem BÌNH THƯỜNG (không zoom) —
      xác nhận miệng giờ hiện rõ thành một vùng đỏ cam phát sáng dễ nhận ra
      ngay cả khi rồng ở xa/nhỏ trên màn hình, đúng như phản hồi yêu cầu.
      Build sạch, không lỗi console, click CTA vẫn xuyên đúng qua canvas.

### 6.13 Cả thân rồng duỗi thẳng khi cuộn, không chỉ đầu
- [x] Phản hồi: chỉ đầu và một chút thân duỗi theo khi cuộn, đuôi vẫn cong
      như cũ. Nguyên nhân: cơ chế cuộn (mục 6.9) chỉ đẩy MỤC TIÊU của đầu;
      phần thân theo sau bằng ràng buộc khoảng cách cố định (follow-the-
      leader) — mỗi đốt chỉ phản ứng đúng theo đốt liền trước ĐÃ cập nhật
      trong cùng frame, nên về lý thuyết lan truyền hết chuỗi trong 1 frame,
      nhưng chỉ giữ ĐÚNG KHOẢNG CÁCH chứ không tự "duỗi thẳng góc" — giống
      hiệu ứng roi vọt (phần đầu roi đổi hướng nhanh, phần đuôi cần nhiều
      frame di chuyển liên tục theo 1 hướng mới "văng thẳng" ra); một đợt
      cuộn ngắn không đủ thời gian để cả chuỗi 25 đốt duỗi thẳng theo kiểu
      này.
- [x] Sửa: thêm hệ số `scrollStraighten` (suy từ độ lớn tốc độ cuộn) và mỗi
      frame, khi đang cuộn, kéo TẤT CẢ các đốt thân (không chỉ đầu) về đúng
      một đường thẳng đứng nối từ đầu theo hướng cuộn (`scrollDir`), thay vì
      chỉ dựa vào ràng buộc khoảng cách lan truyền dần. Giảm sóng lượn
      (slither wave) theo `(1 - scrollStraighten)` để thân không vừa duỗi
      thẳng vừa lượn sóng cùng lúc (mâu thuẫn thị giác).
- [x] Khi ngừng cuộn, `scrollStraighten` tự giảm về 0 (cùng cơ chế suy giảm
      với `scrollVelocity` đã có) — thân quay lại cong tự nhiên theo chuột
      như cũ, không bị "đơ thẳng" mãi.
- [x] Kiểm thử: build sạch; headless Chrome xác nhận khi cuộn mạnh, TOÀN BỘ
      thân (không chỉ đầu) kéo thẳng thành một đường dọc rõ rệt xuyên qua
      nhiều section (cả chiều xuống và chiều lên); ~1.5s sau khi ngừng cuộn,
      thân quay lại dáng cong tự nhiên; không lỗi console; click CTA vẫn
      xuyên đúng qua canvas (không hồi quy pointer-events).

### 6.14 Sửa ngược hướng khi duỗi thẳng lúc cuộn + thêm uốn lượn
- [x] Phản hồi: lướt lên thì đầu rồng phải lên trên (và lướt xuống đầu phải
      xuống dưới) — bản 6.13 bị ngược. Nguyên nhân: công thức duỗi thẳng
      đặt mục tiêu từng đốt thân là `head + scrollDir * i * SEGMENT_LENGTH`
      — tức đẩy phần ĐUÔI theo CÙNG hướng đầu đang di chuyển, khiến đuôi đi
      xa hơn đầu theo hướng đó và trông như đuôi "vượt lên trước" đầu — đầu
      lại bị bỏ lại phía sau. Sửa bằng cách đổi dấu:
      `head + scrollDir * (-i) * SEGMENT_LENGTH` — đuôi giờ kéo dài về phía
      NGƯỢC hướng cuộn (tức là ở phía sau đầu theo đúng hướng đầu đang dẫn
      đầu), đã kiểm tra lại bằng ảnh chụp: lướt xuống → đầu (màu vàng sáng)
      ở dưới cùng dẫn đầu, đuôi (màu đỏ sẫm) kéo dài lên trên; lướt lên →
      ngược lại, đầu ở trên cùng, đuôi ở dưới — đúng như mong đợi.
- [x] Thêm "uốn lượn" khi đang cuộn theo yêu cầu: trước đó (6.13) nhân sóng
      lượn với `(1 - scrollStraighten)` để tránh xung đột với đường thẳng —
      vô tình làm thân duỗi CỨNG NGẮC hoàn toàn lúc cuộn nhanh. Sửa bằng
      cách gắn thẳng một sóng ngang (biên độ 0.12, cùng tần số với sóng lượn
      thường) vào chính điểm mục tiêu đường thẳng, để đường "duỗi" bản thân
      nó cũng là một đường lượn sóng dọc theo hướng cuộn, thay vì một đường
      thẳng cứng — thân vẫn kéo dài rõ theo hướng cuộn nhưng có dáng uốn
      lượn tự nhiên như đang bay, không bị "đơ".
- [x] Kiểm thử: build sạch; headless Chrome xác nhận cả 2 hướng cuộn đều
      đúng chiều (đầu luôn dẫn đầu, đuôi trailing phía sau) và thân có dáng
      uốn lượn rõ khi đang duỗi; sau khi ngừng cuộn thân trở lại đứng yên
      (chụp 2 ảnh cách nhau 1.5s giống hệt nhau, không hồi quy lỗi "xoay
      liên tục"); không lỗi console; click CTA vẫn xuyên đúng qua canvas.

### 6.15 Làm mượt chuyển trạng thái cong ↔ duỗi thẳng khi cuộn
- [x] Phản hồi: rồng "hơi cứng" lúc chuyển sang trạng thái lướt/cuộn. Nguyên
      nhân: `scrollStraighten` (hệ số quyết định độ duỗi thẳng) được tính
      trực tiếp từ `scrollVelocity` mỗi frame mà không qua làm mượt riêng —
      do `scrollVelocity` bản thân đã bám khá sát tốc độ cuộn thực (hệ số
      lerp 0.35, hội tụ trong ~3 frame), hệ số duỗi có thể nhảy từ 0 lên gần
      1 chỉ trong vài frame, gây cảm giác "cắt cứng" giữa 2 trạng thái thay
      vì chuyển tiếp mượt.
- [x] Sửa: thêm một lớp làm mượt RIÊNG cho `scrollStraighten` (lerp hệ số
      0.1/frame, độc lập với làm mượt của `scrollVelocity`) để hệ số duỗi
      tăng/giảm dần qua nhiều frame thay vì bám sát tức thời; đồng thời giảm
      hệ số trộn mỗi đốt thân vào đường duỗi thẳng (0.6 → 0.35) để bản thân
      việc duỗi cũng diễn ra từ từ hơn thay vì gần như tức thời mỗi frame.
- [x] Kiểm thử: build sạch; headless Chrome chụp chuỗi khung hình trong lúc
      bắt đầu/kết thúc cuộn — xác nhận thân rồng duỗi dần ra theo từng nấc
      cuộn (không nhảy thẳng ngay lập tức) và co lại dần sau khi ngừng cuộn
      (không "bật" về tư thế cong ngay); không lỗi console; click CTA vẫn
      xuyên đúng qua canvas; đứng yên đúng khi không tương tác (không hồi
      quy lỗi "xoay liên tục").

### 6.16 "Không thấy đầu/miệng rồng đâu cả" — đầu quay lưng vào camera
- [x] Người dùng gửi ảnh chụp cho thấy chỉ nhìn thấy chân/móng vuốt, không
      thấy mặt/miệng. Kiểm tra lại bằng cách tự chụp nhiều tư thế khác nhau
      — xác nhận đúng vấn đề: đầu rồng vẫn tồn tại đầy đủ (mắt, miệng, sừng,
      bờm) nhưng hướng xoay của nó hoàn toàn phụ thuộc `tangent` (hướng di
      chuyển tức thời) — khi hướng di chuyển khiến mặt quay ra xa camera
      (khoảng một nửa thời gian, tùy chuột đang ở đâu), người dùng chỉ thấy
      MẶT SAU đầu (bờm, sừng) chứ không bao giờ thấy mắt/miệng, dù code vẫn
      đúng — đây là hệ quả tự nhiên của một đầu 3D luôn quay đúng theo
      hướng di chuyển trong khi camera cố định một chỗ, không phải lỗi hiển
      thị hay bị mất code.
- [x] Sửa: thêm hằng số `FACE_CAMERA_QUAT` (quaternion identity, tương ứng
      hướng "mặt nhìn thẳng vào camera" vì camera đặt trên trục +Z nhìn về
      gốc tọa độ và mặt rồng được dựng hướng theo trục +Z cục bộ). Mỗi
      frame, sau khi tính hướng xoay "tự nhiên" theo `tangent` như cũ, dùng
      `quaternion.slerp(FACE_CAMERA_QUAT, 0.65)` để kéo mạnh về phía "luôn
      hướng mặt vào người xem", chỉ giữ lại một phần nghiêng theo hướng di
      chuyển thay vì xoay tự do hoàn toàn.
- [x] Kiểm thử: build sạch; headless Chrome chụp đầu ở 6 tư thế/hướng chuột
      khác nhau — xác nhận cả 6 tư thế đều thấy rõ mắt và/hoặc miệng phát
      sáng (trước đây có tư thế chỉ thấy bờm/sừng, không thấy mặt); không
      lỗi console; click CTA vẫn xuyên đúng qua canvas; đứng yên đúng khi
      không tương tác.

### 6.17 Vẫn "không thấy đầu/miệng" — hóa ra là 2 vấn đề khác nhau, không phải 1
- [x] Người dùng gửi tiếp ảnh chụp thứ 2 cho thấy vẫn không thấy mặt, dù đã
      sửa hướng xoay ở mục 6.16. Kiểm tra lại và phát hiện đây thực ra là
      **2 vấn đề riêng biệt chồng lên nhau**, sửa mục 6.16 chỉ giải quyết
      vấn đề đầu tiên:
      1. **Pitch (ngẩng/cúi) vẫn còn sót lại**: bản sửa 6.16 chỉ giảm nhẹ
         (`slerp` 65%) toàn bộ góc xoay 3D theo `tangent`, nhưng KHÔNG loại
         bỏ hẳn thành phần pitch. Do điểm khởi tạo ban đầu của chuỗi
         follow-chain nằm chính xác thẳng đứng `(0,1,0)`, và trạng thái nghỉ
         (không tương tác — đúng lúc người dùng vừa mở trang) cũng gần như
         luôn giữ hướng gần thẳng đứng này, phần pitch còn sót đủ để xoay
         đầu ra nhìn từ trên xuống (thấy đỉnh sọ/mào) thay vì nhìn thẳng mặt
         — đây chính xác là điều cả 2 ảnh người dùng gửi đều cho thấy.
         **Sửa dứt điểm**: đổi cách tính hướng đầu — chỉ lấy thành phần yaw
         (xoay trái/phải quanh trục dọc) từ hướng di chuyển bằng cách chiếu
         `tangent` xuống mặt phẳng ngang (bỏ hẳn thành phần Y) trước khi
         dựng khung xoay, có xử lý trường hợp đặc biệt khi chiếu ra vector
         0 (đúng lúc hướng ban đầu thẳng đứng) bằng hướng mặc định "nhìn về
         camera". Pitch giờ không bao giờ bị ảnh hưởng bởi hướng di chuyển
         nữa.
      2. **Mắt/miệng quá nhỏ & thiếu tương phản để thấy được ở kích thước
         thực tế**: sau khi sửa (1), dùng mắt "chẩn đoán" (hình cầu xanh lá
         to, tự phát sáng mạnh) để xác nhận hướng xoay ĐÃ đúng — mắt chẩn
         đoán thấy rõ. Nhưng đổi lại mắt bình thường (hình cầu nhỏ 0.11,
         màu gần đen + phát sáng cam nhẹ) thì vẫn KHÔNG thấy — vì con rồng
         ở tư thế cuộn tròn nghỉ chỉ chiếm một vùng rất nhỏ trên màn hình,
         và màu cam phát sáng của mắt gần giống màu cam phát sáng của
         chính khuôn mặt (cùng tông), nên "chìm" vào mặt thay vì nổi bật.
         **Sửa**: dựng lại mắt thành 2 lớp — tròng trắng ngà LỚN HƠN
         (bán kính 0.24, tự phát sáng màu kem `#fdf6e3` cường độ 1.4 — phát
         sáng thật chứ không chỉ là màu tĩnh, để không bị mất nét do khử
         răng cưa ở kích thước nhỏ) + con ngươi đen nhỏ phát sáng cam ở
         phía trước — tương phản trắng/đen nổi bật hẳn trên nền mặt vàng,
         khác hẳn "thêm một sắc cam khác" như bản cũ.
- [x] Kiểm thử: build sạch; headless Chrome chụp lặp lại 3 lần độc lập trạng
      thái nghỉ mặc định (không di chuột) — cả 3 lần đều thấy rõ 2 mắt phát
      sáng trắng/cam; chụp thêm 4 tư thế di chuột khác nhau — đa số cho
      thấy mặt rõ ràng (một số góc quay nghiêng mạnh vẫn hơi khó thấy do
      góc nhìn, chấp nhận được vì đây là đánh đổi cố hữu của đầu 3D xoay tự
      do, không còn là "không bao giờ thấy" như trước). Không lỗi console;
      click CTA vẫn xuyên đúng qua canvas.

### 6.18 Sửa yaw-only (6.17) làm đầu "nằm ngang" lúc lưới trang, không nghiêng theo hướng
- [x] Người dùng phản hồi: sau bản 6.17, lúc lướt xuống đầu rồng không còn
      nghiêng theo hướng lướt nữa — cứ "nằm ngang" trông xấu hơn cả trước.
      Nguyên nhân: bản 6.17 loại bỏ HOÀN TOÀN pitch khỏi hướng xoay đầu
      (chỉ lấy yaw bằng cách chiếu `tangent` xuống mặt phẳng ngang, bỏ hẳn
      thành phần Y) để tránh lộ đỉnh sọ khi đứng yên/di chuột. Nhưng lúc
      lướt trang, hướng di chuyển gần như thẳng đứng (`scrollDir` là
      `(0, ±1, 0)`) — nên sau khi bỏ hết thành phần dọc, gần như không còn
      gì để đầu "bám" theo, và nó giữ nguyên yaw cũ, đọc như không phản ứng
      với việc lướt (nằm ngang, bất động).
- [x] Sửa: pha trộn ngược lại thành phần dọc theo mức độ đang lướt
      (`scrollStraighten`, chạy từ 0 lúc đứng yên đến gần 1 lúc lướt nhanh)
      — `steer = lerp(flatTangent, tangent, scrollStraighten)`. Lúc đứng
      yên/di chuột (`scrollStraighten` ≈ 0) vẫn giữ nguyên yaw-only như
      6.17 (không hồi quy lỗi che mặt); lúc lướt thật (`scrollStraighten`
      tiến gần 1) đầu được phép nghiêng lên/xuống theo đúng hướng lướt.
      Vì `steer` lúc này gần như thẳng đứng, không thể dùng `WORLD_UP` cố
      định để dựng khung chiếu (tích có hướng suy biến) — dùng lại đúng kỹ
      thuật "rightRef dự phòng" (chọn `WORLD_RIGHT` khi `|steer.y| > 0.95`)
      đã dùng cho thân/chân ở trên. Đồng thời giảm dần độ "kéo về nhìn
      camera" (`FACE_CAMERA_QUAT` slerp) theo `(1 - scrollStraighten)` để
      nó không ngáng lại hướng nghiêng lúc đang lướt.
- [x] Kiểm thử: gắn tạm biến `window.__dragonDebug` (steerY, scrollStraighten,
      scrollVelocity) trong `useFrame`, dùng puppeteer-core lướt xuống 8
      bước liên tiếp rồi lướt lên 8 bước, đọc số liệu trực tiếp thay vì chỉ
      đoán qua ảnh chụp — xác nhận lướt xuống → `steerY` tiến dần tới ‑0.93
      (đầu chúc xuống rõ), lướt lên → `steerY` tiến dần tới +0.93 (đầu
      ngẩng lên rõ), và `scrollStraighten` tăng dần lên trên 0.9 chứ không
      còn kẹt gần 0. Gỡ bỏ biến debug sau khi xác nhận, build lại sạch,
      kiểm tra lại không lỗi console và không hồi quy click-through.

### 6.19 Bỏ hẳn hệ thống "xoay đầu độc lập" — gắn đầu cứng theo đúng khung của đốt cổ
- [x] Người dùng gửi ảnh chụp cho thấy đầu rồng trông như một mảnh rời nổi
      lệch khỏi thân, xoay sai hướng — "nhìn hài quá". Yêu cầu: bỏ luôn việc
      quay đầu ra ngoài, sửa cho đầu gắn liền với thân.
- [x] Nguyên nhân gốc: qua nhiều vòng sửa (6.16-6.18), khối đầu luôn tính
      hướng xoay ĐỘC LẬP với thân — yaw riêng, rồi steer riêng lúc lướt,
      rồi lại kéo thêm về hướng camera (`FACE_CAMERA_QUAT` slerp). Khối
      thân (đốt số 0, ngay sau đầu) lại tính hướng của nó theo công thức
      khác hẳn (dựa thẳng vào `tangent`/`right`/`up` của chuỗi
      follow-chain). Hai hệ thống độc lập này gần như không bao giờ khớp
      nhau chính xác — chênh lệch đủ để mắt thường thấy đầu như xoay lệch,
      tạo cảm giác "rời khỏi thân" dù vị trí (position) vẫn đúng.
- [x] Sửa: bỏ hẳn toàn bộ hệ thống xoay riêng của đầu (yaw-only, steer lúc
      lướt, slerp về camera). Thay bằng cách lấy ĐÚNG 3 vector
      `right`/`up`/`tangent` mà đốt cổ (index 0) đã dùng để tự xoay chính
      nó (lưu lại vào `scratch.neckRight/neckUp/neckTangent` ngay trong
      vòng lặp dựng thân, trước khi vòng lặp chân ghi đè lên các biến dùng
      chung), rồi dựng khung xoay của đầu từ chính 3 vector đó (đảo dấu
      `right` và `tangent` — vì đầu hướng ra ngoài còn `tangent` của đốt cổ
      quy ước trỏ vào trong thân — giữ nguyên `up` để khung vẫn thuận
      chiều). Kết quả: đầu luôn xoay Y HỆT một khối cứng gắn liền với đốt
      cổ, không còn phép tính riêng nào có thể lệch pha. Vị trí đầu cũng
      dịch nhẹ vào phía thân (theo `neckTangent`) để phần đầu chồng khít
      lên đầu đốt cổ thay vì chỉ chạm nhẹ. Hiệu ứng đầu nghiêng theo hướng
      lướt trang (6.18) vẫn còn — nhưng giờ tự nhiên "thừa hưởng" từ
      chuyển động thật của đốt cổ thay vì phải tính riêng.
- [x] Kiểm thử: build sạch; headless Chrome chụp lúc đứng yên, 5 vị trí di
      chuột khác nhau (góc trên/dưới/trái/phải/giữa) và lúc đang lướt trang
      — tất cả đều cho thấy đầu là một khối liền mạch với thân, không còn
      mảnh nào trông tách rời/xoay lệch như ảnh người dùng gửi. Không lỗi
      console. Đánh đổi: bỏ theo đó luôn cơ chế "giữ mặt hướng về camera"
      (6.16/6.17) — đầu giờ có thể quay khuất mặt ở một số góc tùy hướng
      đốt cổ, chấp nhận theo đúng yêu cầu "bỏ quay đầu ra ngoài" của người
      dùng lần này (ưu tiên gắn liền thân hơn là luôn thấy mặt).

### 6.20 Há mồm rõ hơn, sừng/râu dài hùng hồn hơn — và tiện thể khắc phục luôn việc "gần như không bao giờ thấy mặt" của 6.19
- [x] Người dùng gửi ảnh mẫu (rồng vàng minh họa, mồm há to lộ răng/lưỡi,
      sừng dài uốn cong, nhiều râu dài bay ngược) và yêu cầu: há mồm rõ
      hơn, sừng/râu dài và hùng hồn hơn giống ảnh.
- [x] Miệng: góc mở hàm tăng từ -0.95 lên -1.35 rad (biên độ dao động
      cũng tăng nhẹ 0.08→0.1), khoang miệng (hộp phát sáng đỏ cam) phóng to
      từ scale 0.22 lên 0.3 theo chiều cao để khớp độ há rộng hơn. Thêm
      LƯỠI (2 khối đỏ gắn theo hàm dưới, di chuyển cùng lúc hàm mở) — chi
      tiết còn thiếu trước đây khiến miệng chỉ như "một khoảng tối", giờ
      có điểm nhấn đỏ rõ ràng đúng như tranh mẫu.
- [x] Sừng: từ 2 đoạn ngắn (tổng dài ~0.56 đơn vị cục bộ) nâng lên 3 đoạn
      với độ dài tăng dần (0.42+0.4+0.34), góc cong sau tăng dần qua từng
      đoạn để tạo đường cong mượt kiểu sừng linh dương dài thay vì 2 que
      ngắn nối cứng.
- [x] Râu: từ 2 xi-lanh thẳng ngắn (dài 0.46) đổi thành mỗi bên 2 sợi
      cong (kỹ thuật "nhiều đoạn góc tăng dần" giống sừng) dài hơn hẳn +
      1 sợi phụ ngắn cho đầy đặn — đọc như nhiều dải râu dài bay ngược
      thay vì 2 cây tăm cứng.
- [x] Trong lúc chụp ảnh kiểm tra các chi tiết trên, phát hiện việc gắn
      đầu "khoá cứng y hệt khung của đốt cổ" (6.19) khiến mặt gần như
      KHÔNG BAO GIỜ hướng về camera trong thực tế (rà qua hàng chục vị trí
      chuột khác nhau, gần như luôn chỉ thấy đỉnh sọ/lưng đầu) — vì hướng
      "tự nhiên" của đốt cổ gần như luôn thẳng đứng (do thiết kế chuỗi
      follow-chain), hiếm khi có thành phần hướng ra trục camera. Điều này
      khiến các chi tiết mặt vừa nâng cấp ở trên gần như vô nghĩa vì không
      ai thấy được. Đã thử 2 cách sửa:
      1. Khoá "right" (không đổi, để tránh lệch mối nối) nhưng trộn
         "forward" về phía camera rồi chiếu vuông góc lại — KHÔNG hiệu
         quả: `right` của đốt cổ tự nó thường mang thành phần trục Z (quay
         theo cùng lúc thân uốn ngang), nên phép chiếu vuông góc lại xoá
         mất phần lớn độ trộn.
      2. **Cách dùng**: trộn "forward" về phía camera TRƯỚC, sau đó dựng
         lại toàn bộ khung right/up bằng ĐÚNG công thức "stable basis" mà
         đốt cổ đang dùng (rightRef dự phòng + tích có hướng) trên hướng
         forward đã trộn, thay vì giữ nguyên right/up cũ của đốt cổ. Đã
         chứng minh bằng đại số: khi hệ số trộn = 0, công thức này cho ra
         CHÍNH XÁC kết quả y hệt 6.19 (không lệch mối nối) — khi hệ số > 0,
         đầu đọc như đang "cúi/ngẩng" hướng về phía người xem (một động
         tác uốn cong tự nhiên) thay vì xoay độc lập không liên quan như
         lỗi "hài" ban đầu.
- [x] Kiểm thử: build sạch nhiều lần qua từng bước thử; headless Chrome rà
      qua hàng chục vị trí chuột — xác nhận với cách 2 (hệ số trộn 0.55),
      mặt (2 mắt, sừng, râu, lưỡi) hiển thị rõ ràng ở NHIỀU tư thế thay vì
      hầu như không bao giờ như trước, mà thân vẫn liền mạch không tái
      diễn lỗi lệch mối nối ở tư thế nào được chụp. Không lỗi console;
      click CTA vẫn xuyên đúng qua canvas sau khi lướt trang + di chuột.

## 7. Giai đoạn A — Nhất quán trải nghiệm (theo lộ trình sau khi viết SPEC.md)

### 7.1 F1 — Đưa dự án vào git
- [x] Vấn đề: dự án chưa có version control — mọi thay đổi (kể cả hàng chục
      vòng chỉnh rồng 3D) chỉ tồn tại trên đĩa, không có cách quay lại.
- [x] Làm: `git init`; danh tính commit đặt **riêng cho repo**
      (`git config --local`: `DCT <trudang2409@gmail.com>`), cấu hình global
      của máy giữ nguyên. `.gitignore` sẵn có đã loại
      `node_modules`, `dist`. Stage theo tên file (không `git add -A`), commit
      gốc `0455d82` (hash sau khi viết lại lịch sử ở mục 7.9).
- [x] Ghi chú: các cảnh báo "LF will be replaced by CRLF" khi commit là do
      `core.autocrlf` của máy — chỉ là cảnh báo, không ảnh hưởng nội dung.

### 7.2 A5 — Dọn asset thừa của template
- [x] Xoá `src/assets/react.svg`, `vite.svg`, `hero.png`, `public/icons.svg`.
      Đã grep `src/` và `index.html` trước khi xoá: không nơi nào tham chiếu.

### 7.3 Hàm cuộn dùng chung `scrollToSection`
- [x] Vấn đề: logic "cuộn mượt tới id bằng Lenis, fallback `scrollIntoView`"
      bị chép ở `Navbar.tsx` (`goTo`) và `Hero.tsx` (`scrollToId`, duration
      1.3 lệch với 1.2 của Navbar), và Footer sắp cần bản thứ ba.
- [x] Sửa: gom về `scrollToSection(id)` trong `src/hooks/useLenis.ts` cạnh
      `getLenis()`; Navbar, Hero, Footer cùng dùng. Duration thống nhất 1.2.

### 7.4 A1 — Menu "Khám phá ▾" (GAP-01)
- [x] Vấn đề: 3 section `unesco`, `artifact`, `explore` không có trong menu.
      Thứ tự menu cũ cũng lệch thứ tự trang (Bản đồ đứng thứ 5 trong menu
      nhưng là section thứ 2).
- [x] Sửa: gộp 3 section vào nhóm con "Khám phá ▾" (theo lựa chọn của người
      dùng — thêm thẳng 10 mục sẽ không vừa một dòng); sắp lại menu theo đúng
      thứ tự trang. Mobile hiện nhóm dạng tiêu đề nhỏ + 3 mục con thụt lề.
- [x] Lỗi tự phát hiện khi thiết kế: nút nhóm ban đầu **toggle** khi click —
      nhưng hover đã mở dropdown, nên một cú click chuột sẽ đóng đúng cái menu
      vừa hiện ra. Đổi thành click chỉ mở; đóng bằng rời chuột, rời focus bàn
      phím (`onBlur` + `relatedTarget`), chọn mục con, hoặc Escape.
- [x] Lỗi chỉ phát hiện nhờ ảnh chụp (test tự động không bắt được): thêm mục
      thứ 8 làm các mục menu **xuống dòng** ("TRANG / CHỦ", "BẢN ĐỒ DI / SẢN")
      và logo cũng xuống dòng. Đo bằng script ở 1280px: logo 208px + menu
      1048px = 1256px > 1216px khả dụng. Sửa: `whitespace-nowrap`, khoảng cách
      mục 24→16px, giãn chữ 0.15em→0.1em (tiết kiệm ~116px), và chỉ hiện menu
      ngang từ `xl` (≥1280px) thay vì `lg` (1024px) — 8 mục không thể vừa ở
      1024px. Đo lại ở 1280px: logo cách menu 75px, mép phải menu đúng bằng
      giới hạn padding, không mục nào bị cắt.
- [x] Dọn thêm: bỏ thẻ `<span>` gạch chân dùng `group-hover` trong nút menu cũ
      — nút không có class `group` nên gạch chân đó chưa bao giờ hiện.

### 7.5 A2 — Thẻ dòng thời gian mở modal (GAP-02)
- [x] Vấn đề: `Timeline` là section nội dung duy nhất không nhận
      `onOpenDetail`, dù kiểu `TimelineEvent` đã có sẵn `relatedHeritageIds`.
- [x] Sửa: `App.tsx` truyền `onOpenDetail`; mỗi mốc tra di sản đầu tiên trong
      `relatedHeritageIds` từ `allHeritage`. Có ⇒ thẻ thành `<button>` (viền
      sáng khi hover, thêm dòng "Xem di sản →"); không có ⇒ giữ thẻ tĩnh.
- [x] Dữ liệu: mốc 1070 (Văn Miếu) được bổ sung
      `relatedHeritageIds: ["bia-tien-si-van-mieu"]` vì di sản này đã có trong
      `heritage.ts`. Kết quả 5/9 mốc bấm được; 4 mốc còn lại (Bạch Đằng 938,
      Cận đại 1858…) không có di sản tương ứng trong data nên để tĩnh — không
      bịa liên kết.

### 7.6 A3 — Footer (GAP-03)
- [x] Vấn đề: 6 "liên kết" footer là `<span className="cursor-default
      hover:text-ivory">` — trông như link, sáng lên khi hover, nhưng click
      không làm gì.
- [x] Sửa (theo lựa chọn của người dùng): "Giới thiệu" → `hero`, "UNESCO Việt
      Nam" → `unesco` thành nút cuộn; 4 mục chưa có trang đích (Đội ngũ, Liên
      hệ hợp tác, Nguồn dữ liệu & bản quyền ảnh, Đóng góp tư liệu) để chữ
      thường mờ, **bỏ** hiệu ứng hover để không gây hiểu nhầm là link.

### 7.7 A4 — Trống đồng trên mobile (GAP-05)
- [x] Vấn đề: `ArtifactViewer` chỉ tắt 3D khi reduced-motion; trên mobile vẫn
      dựng canvas WebGL, kèm ghi chú "Đã tối ưu hiệu ứng 3D" không đúng thực tế.
- [x] Sửa: `show3D = !reducedMotion && !isMobile`, dùng nhánh ảnh tĩnh sẵn có;
      sửa ghi chú thành "Trên di động hiển thị ảnh hiện vật thay cho mô hình 3D
      để tiết kiệm pin."

### 7.8 Kiểm thử
- [x] `npm run lint` + `npm run build` sạch.
- [x] Script puppeteer-core trên `npm run preview` — **19/19 đạt**:
      desktop 1440×900 (hover mở dropdown; 3 mục con cuộn tới đúng section,
      `top = 0`; click khi đang hover không đóng; Escape đóng; 5/9 mốc thời gian
      bấm được, mốc 938 không; mốc 1070 mở modal "Bia đá các khoa thi tiến sĩ
      triều Lê - Mạc"; footer 2 nút + 4 chữ thường, "UNESCO Việt Nam" cuộn tới
      `#unesco`; canvas rồng `pointer-events: none` và không bao giờ là phần tử
      nhận click); mobile 390×844 (menu có nhóm + 3 mục con; "Hiện vật 3D" cuộn
      tới `#artifact`; `#artifact` 0 canvas, 1 ảnh; không cuộn ngang); 0 lỗi
      console/pageerror.
- [x] Hai lần FAIL đầu tiên đều là lỗi của chính script test, không phải lỗi
      sản phẩm — ghi lại để lần sau khỏi mắc: (1) `document.querySelector('h2')`
      lấy nhầm tiêu đề section đầu trang thay vì tiêu đề modal (phải chọn
      `.fixed.inset-0 h2`); (2) kiểm tra "không có CANVAS tại điểm click" quá
      rộng — canvas bắt được là **nền particle của Hero** (nằm trong `#hero`,
      là nền trang trí, nút CTA vẫn nhận click bình thường), không phải canvas
      rồng. Kiểm tra đúng là: phần tử nhận click không bao giờ là canvas rồng.
- [x] Chụp full viewport 1440/1280/1100 và mobile để soát bằng mắt — nhờ bước
      này mới phát hiện lỗi menu xuống dòng ở 7.4.

### 7.9 Viết lại lịch sử git: bỏ tên Claude khỏi commit, xoá email công việc
- [x] Vấn đề: mọi commit đều có dòng `Co-Authored-By: Claude …` nên GitHub hiện
      Claude là đồng tác giả; người dùng muốn commit chỉ đứng tên mình. Đồng thời
      email công việc từng ghi trong mục 7.1 vẫn còn trong lịch sử các phiên bản
      cũ của `TASKS.md` dù bản mới nhất đã xoá.
- [x] Làm (người dùng chọn dọn cả lịch sử, không chỉ từ giờ):
      1. Tag local `backup/truoc-viet-lai` (không push) giữ nguyên lịch sử cũ để
         khôi phục nếu cần.
      2. `git filter-branch --prune-empty` trên `main` và `docs/an-email`:
         `--msg-filter` bỏ dòng Co-Authored-By của Claude; `--tree-filter` thay
         đúng cụm chứa email bằng câu mà nhánh `docs/an-email` đã dùng ⇒ commit
         xoá email trở thành rỗng và được gộp đi.
      3. Force push `main`, xoá nhánh `docs/an-email`.
      4. Quy tắc mới trong CLAUDE.md: commit/PR không thêm ghi chú Claude/AI.
- [x] Sự cố gặp phải:
      - Lần chạy đầu với `-c core.autocrlf=false` bị từ chối "unstaged changes":
        file trong thư mục làm việc là CRLF (do `autocrlf=true` của máy), ép
        `false` khiến git thấy chúng khác bản trong repo. Chạy lại với cài đặt
        mặc định — git tự đưa về LF khi ghi, và kiểm tra hash cây bên dưới xác
        nhận không file nào bị đổi.
      - Force push lần đầu bị GitHub **từ chối** (`stale info`): trong lúc đó
        người dùng đã tự merge PR #1 (`docs/an-email`) trên GitHub, tạo commit
        `bb1ad08` mà máy chưa biết. `--force-with-lease` đã chặn đúng việc ghi
        đè mù. Kiểm tra: cây của `bb1ad08` trùng khớp tuyệt đối với `main` đã
        viết lại (`git diff` rỗng) ⇒ ghi đè không mất nội dung; push lại với
        lease khoá đúng `bb1ad08`. Rút ra quy tắc mới: luôn `git fetch` và so
        `origin/main` trước khi động vào `main`.
- [x] Kiểm tra: 0 dòng `Co-Authored-By` trong toàn bộ lịch sử `main`; 0 lần xuất
      hiện email công việc trong mọi phiên bản mọi file (`git log -p`); hash cây
      `main` mới = hash cây bản mong muốn (`f282064…`); tác giả duy nhất
      `DCT <trudang2409@gmail.com>`; vẫn 10 commit; phần thân message nhiều đoạn
      giữ nguyên; `npm run build` sạch.
- [x] Giới hạn còn lại: GitHub giữ ref chỉ-đọc `refs/pull/1/head` cho PR #1, trỏ
      vào commit cũ — trang PR #1 vẫn hiện các commit cũ (có dòng Claude và
      lịch sử có email). Ref này không xoá được bằng git; chỉ xoá được qua
      GitHub Support hoặc xoá hẳn repo.

## 8. Giai đoạn B — Khả năng tiếp cận & cảm ứng

Ba nhánh không đụng chung file nào, merge theo thứ tự nào cũng được:
`feat/modal-giu-focus` (modal), `fix/ban-do-cam-ung` (bản đồ + `useLenis.ts`),
`docs/giai-doan-b` (tài liệu này).

### 8.1 Modal giữ focus bàn phím (GAP-04)
- [x] Vấn đề: mở modal bằng bàn phím xong, Tab chạy ra các phần tử phía sau
      nền mờ; đóng modal thì focus mất, người dùng phải Tab lại từ đầu trang.
- [x] Sửa (`HeritageDetailModal.tsx`): `role="dialog"`, `aria-modal`,
      `aria-labelledby` → tiêu đề; mở thì lưu phần tử đang focus (mọi nơi mở
      modal đều là `<button>` — đã kiểm cả 6 nơi) rồi focus nút ✕; Tab/Shift+Tab
      xoay vòng trong panel; đóng thì trả focus về phần tử đã lưu
      (`preventScroll` để trang không nhảy).
- [x] Lỗi tiềm ẩn phát hiện khi đọc code: effect cũ phụ thuộc `onClose`, mà
      `App.tsx` truyền hàm inline mới sau mỗi lần render ⇒ effect chạy lại liên
      tục khi modal đang mở. Trước đây vô hại, nhưng với logic focus thì mỗi
      lần chạy lại sẽ bắt nhầm "phần tử mở modal" và giật focus về nút ✕. Đổi
      sang chỉ phụ thuộc trạng thái mở/đóng, giữ `onClose` mới nhất qua ref.

### 8.2 Lăn chuột trong modal (lỗi có sẵn, phát hiện khi kiểm thử B3)
- [x] Vấn đề: trên desktop, lăn chuột lên modal **không cuộn nội dung modal**
      mà cuộn trang phía sau (đo được: nội dung modal 0px, trang dịch 397px) —
      phần dưới của các modal dài (thông tin, bản đồ vị trí) không đọc được
      bằng con lăn.
- [x] Nguyên nhân: Lenis bắt sự kiện wheel trên toàn trang để làm cuộn mượt,
      kể cả khi con trỏ nằm trên một khung cuộn riêng.
- [x] Sửa: gắn `data-lenis-prevent` cho khung cuộn của modal (cơ chế sẵn có của
      Lenis để nhường sự kiện cho phần tử con).
- [x] Kiểm: nội dung modal cuộn tới đáy (107/107px), trang phía sau Δ=0; đóng
      modal xong lăn chuột vẫn cuộn trang bình thường (Δ=500).

### 8.3 Bản đồ dùng được bằng chạm (GAP-06)
- [x] Vấn đề (đọc code): trên cảm ứng, một cú chạm giả lập `mouseenter` +
      `mousemove` nhưng không bao giờ có `mouseleave` ⇒ popup xem trước kẹt che
      bản đồ, bản đồ nghiêng một lần rồi đứng im ở góc đó. Chấm ghim chỉ 10px.
      Panel chi tiết nằm **dưới** bản đồ ở bố cục 1 cột nên chạm xong không thấy
      gì thay đổi.
- [x] Sửa: đổi sang pointer events, hover/nghiêng chỉ áp dụng khi
      `pointerType === "mouse"`; vùng chạm ghim 34px (`p-3`) + `aria-label`;
      nếu panel nằm dưới 70% chiều cao màn hình thì tự cuộn lên ngay dưới
      navbar (thêm `scrollToElement(el, offset)` vào `useLenis.ts`, dùng lại
      cho `scrollToSection`). Kiểm tra vị trí panel thay vì kiểm tra loại con
      trỏ: đúng với mọi kiểu nhập và không phụ thuộc trình duyệt có báo
      `pointerType` cho sự kiện click hay không.
- [x] **Lỗi do chính thay đổi này gây ra, test bắt được**: chạm ghim Hà Nội lại
      mở Bắc Ninh. Hai ghim chỉ cách nhau 16px trên mobile, vùng chạm 34px đè
      lên nhau, ghim nằm trên "cướp" cú chạm. Không thể vừa có vùng chạm đủ to
      vừa không chồng khi hai điểm sát nhau ⇒ phân xử theo **tâm ghim gần điểm
      chạm nhất** (bàn phím thì giữ đúng ghim đang focus). Test chạm lần lượt
      cả 10 ghim để khẳng định.

### 8.4 Bản đồ trên desktop: không ghim nào click được bằng chuột (lỗi có sẵn)
- [x] Phát hiện: test hover/click ghim trên desktop thất bại. Đo bằng chuột
      thật (di chuyển → nhấn → nhả) từng ghim: **0/10 ghim click được**. Tính
      năng chọn vùng trên desktop đã hỏng từ bản dựng đầu tiên mà chưa ai thấy
      — các lần kiểm thử trước chỉ dùng `elementFromPoint` khi *không* có chuột,
      lúc đó bản đồ chưa nghiêng nên mọi thứ trông bình thường.
- [x] Nguyên nhân 1: chuột đi vào bản đồ làm nó nghiêng; container dùng
      `.card-3d` (`preserve-3d`) nên nửa bản đồ xoay "lùi ra sau" mặt phẳng
      container, mọi sự kiện rơi vào container. Đổi container sang
      `transform-style: flat` (vẫn giữ `perspective`, vẫn nghiêng) ⇒ 4/10.
- [x] Nguyên nhân 2: trong tấm bản đồ (`preserve-3d`), SVG nền và các nút ghim
      là các mặt phẳng **trùng nhau trong 3D**; trình duyệt chọn cái nào "ở trên"
      theo sai số làm tròn, và độ nghiêng chỉ nhích 0.00006° giữa lúc nhấn và
      nhả là đủ lật kết quả: `pointerdown` rơi vào ghim, `pointerup` rơi vào
      SVG ở **cùng toạ độ** ⇒ không có click. (Đã đo: ghim không hề dịch — giả
      thuyết đầu tiên "ghim trượt khỏi con trỏ" là sai.) Bỏ `preserve-3d` ở
      tấm bản đồ ⇒ 7/10, còn chập chờn.
- [x] Sửa dứt điểm: với chuột, **chọn vùng ngay lúc nhấn** (`pointerdown` luôn
      rơi đúng ghim), không đợi click cần nhấn–nhả cùng một phần tử. Cảm ứng
      vẫn chọn bằng click để một cú vuốt cuộn trang bắt đầu trên ghim không bị
      hiểu nhầm là chọn vùng.
- [x] Hướng đã thử và bỏ: "đóng băng độ nghiêng khi hover ghim". Có giúp
      (10/10 ở 2/3 lượt) nhưng vẫn chập chờn 29/30; sau khi chuyển sang chọn lúc
      nhấn thì bỏ đi và đo lại vẫn **50/50** (5 lượt × 10 ghim) ⇒ không cần, bỏ
      cho code gọn.

### 8.5 Kiểm thử
- [x] `npm run lint` + `npm run build` sạch trên từng nhánh.
- [x] Nhánh modal: 10/10 test focus (Enter mở, focus vào ✕, Tab 25 lần không
      lọt ra, Shift+Tab xoay vòng, Escape đóng và trả focus đúng thẻ, gỡ khoá
      cuộn, luồng chuột vẫn chạy) + 4/4 test lăn chuột.
- [x] Nhánh bản đồ: chuột thật 50/50 ghim; bản đồ vẫn nghiêng khi di chuột
      trên nền; click ghim trên desktop không cuộn trang; Enter trên ghim chọn
      đúng ghim đó. Cảm ứng 390×844: chạm 10/10 ghim đúng vùng, không popup kẹt,
      không nghiêng, panel cuộn lên ngay dưới navbar (top=100px).
- [x] B3 toàn trang mobile: hamburger mở/đóng; không cuộn ngang ở cả 10
      section; chạm thẻ mở modal, vuốt cuộn được bên trong (0→300px), nút ✕
      đóng; 0 lỗi console. Soát bằng mắt ảnh chụp full viewport.
