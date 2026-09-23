# Implementation Plan — Di Sản Văn Hóa Việt Nam (Digital Heritage Museum)

> Tài liệu này mô tả kế hoạch triển khai tổng thể cho dự án, được viết lại
> dựa trên trạng thái thực tế đã xây dựng để dùng làm tài liệu tham chiếu
> cho các giai đoạn tiếp theo. Các phase đã hoàn thành được đánh dấu ✅.

---

## 1. Phân tích yêu cầu

### 1.1 Mục tiêu sản phẩm
Xây dựng một **"bảo tàng số 3D"** giới thiệu di sản văn hóa Việt Nam, gồm 3
nhóm nội dung chính:
- Di sản văn hóa **vật thể** (di tích, danh thắng, kiến trúc)
- Di sản văn hóa **phi vật thể** (âm nhạc, lễ hội, tín ngưỡng, nghệ thuật
  trình diễn)
- Di sản **tư liệu** (mộc bản, châu bản, bia đá, tài liệu cổ)

### 1.2 Yêu cầu phi chức năng (định hướng trải nghiệm)
| Yêu cầu | Diễn giải |
|---|---|
| Phong cách | 3D Interactive + Cinematic + Premium, dark luxury, họa tiết Việt Nam truyền thống |
| Tương tác | Cuộn/hover/click/drag đều có phản hồi, cảm giác "khám phá" chứ không phải đọc tuyến tính |
| Hiệu năng | 60 FPS mục tiêu, giảm hiệu ứng nặng trên mobile, tôn trọng `prefers-reduced-motion` |
| Responsive | Ưu tiên desktop, không vỡ layout / không scroll ngang ngoài ý muốn trên mobile |
| Dữ liệu | Tách biệt hoàn toàn khỏi UI (data-driven), dễ mở rộng thêm di sản mới hoặc chuyển sang API/CMS sau này |
| Hình ảnh | Ảnh thật, đúng chủ thể, có nguồn, lazy-load, có fallback |
| Không lỗi | Không component nào crash khi chạy, không dùng nội dung placeholder kiểu lorem ipsum |

### 1.3 Yêu cầu chức năng (tóm tắt)
Hero cinematic → Navbar glass → Bản đồ Việt Nam tương tác → Gallery di sản
vật thể (3D tilt) → Di sản phi vật thể (floating object) → Di sản tư liệu
(digital archive) → Timeline lịch sử → UNESCO carousel + counter → 3D
Artifact Viewer (Trống đồng) → Search & Filter → Modal chi tiết → Footer.
Bổ sung sau (theo phản hồi người dùng): **rồng 3D bay theo con trỏ chuột**
xuyên suốt trang, mang tính trang trí/companion, không chặn tương tác.

---

## 2. Đề xuất tech stack

| Layer | Lựa chọn | Lý do |
|---|---|---|
| Build tool | **Vite** | Dev server nhanh, code-splitting/lazy-import sẵn có |
| Framework | **React 19 + TypeScript** | Component hóa rõ ràng, type-safety cho data layer |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Utility-first, theme token qua `@theme`, không cần config file riêng |
| 3D | **Three.js + @react-three/fiber + @react-three/drei** | Khai báo scene 3D bằng JSX, tái sử dụng hook `useFrame`/`useThree` |
| Animation 2D | **Framer Motion** | Scroll-reveal, layout animation, `useScroll`/`useMotionValueEvent` |
| Smooth scroll | **Lenis** | Cinematic easing khi cuộn, tự tắt khi `reduced-motion` |
| Data nguồn ảnh | Wikimedia Commons (REST + imageinfo API) | Ảnh thật, tự do bản quyền, có thể xác minh HTTP 200 |
| Testing (dev-time) | **puppeteer-core** + Chrome cài sẵn của máy | Headless smoke-test: screenshot theo section, bắt console error, giả lập scroll/mouse/click |

**Không dùng**: Redux/Zustand (state đơn giản, đủ dùng `useState` ở
`App.tsx`), CMS/backend (chưa cần ở giai đoạn này), thư viện mesh-line/GLTF
ngoài (chưa có model thật để load).

---

## 3. Đề xuất architecture

```
┌─────────────────────────────────────────────────────────┐
│ App.tsx (composition root)                               │
│  - state: loading, selected (Heritage | null)             │
│  - global overlays (không phụ thuộc section nào):         │
│      LoadingScreen · CustomCursor · ScrollProgress ·       │
│      DragonCompanion · Navbar · HeritageDetailModal        │
│  - <main> render tuần tự các section, mỗi section nhận     │
│    onOpenDetail để mở modal dùng chung                     │
└─────────────────────────────────────────────────────────┘
        │                              │
        ▼                              ▼
┌───────────────────┐        ┌───────────────────────────┐
│ data/*.ts (nguồn   │        │ components/*.tsx (thuần    │
│ sự thật duy nhất)  │──────► │ presentational, nhận data  │
│ heritage/regions/  │        │ qua import trực tiếp hoặc   │
│ timeline/unesco     │        │ props — không hard-code)   │
└───────────────────┘        └───────────────────────────┘
        │
        ▼
┌───────────────────┐
│ types/index.ts     │  interface Heritage, TimelineEvent,
│                    │  RegionInfo, UnescoStat + label maps
└───────────────────┘

Cross-cutting: hooks/useLenis.ts (smooth scroll singleton),
hooks/useMediaQuery.ts (isMobile / reduced-motion), dùng để
bật/tắt hiệu ứng 3D nặng theo thiết bị.
```

**Nguyên tắc kiến trúc:**
1. **Data-driven**: mọi nội dung hiển thị đọc từ `src/data/*.ts`, không
   hard-code trong JSX → dễ thay bằng API/CMS sau này mà không sửa UI.
2. **Lazy-load các Canvas 3D** (`HeroScene`, `ArtifactScene`, `DragonScene`)
   qua `React.lazy` + `Suspense` → không chặn bundle chính, chỉ tải khi cần.
3. **Overlay layers độc lập section**: cursor, scroll progress, rồng đồng
   hành là các layer `fixed` toàn cục, tách khỏi luồng nội dung, luôn
   `pointer-events: none` trừ phần tử thực sự cần tương tác.
4. **State tối giản**: chỉ 2 state ở cấp App (`loading`, `selected`); mỗi
   section tự quản lý state cục bộ của nó (filter, search, active slide...).
5. **Type-first**: `Heritage`, `TimelineEvent`, `RegionInfo`, `UnescoStat`
   là hợp đồng dữ liệu duy nhất giữa data layer và UI.

---

## 4. Đề xuất cấu trúc thư mục

```
/ (root)
├─ index.html
├─ TASKS.md                     # nhật ký tiến độ theo hạng mục
├─ IMPLEMENTATION_PLAN.md        # tài liệu này
├─ vite.config.ts
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                   # composition root
│  ├─ index.css                 # theme token, glass/ornament utility, keyframes
│  ├─ types/
│  │  └─ index.ts                # Heritage, TimelineEvent, RegionInfo, UnescoStat
│  ├─ data/
│  │  ├─ heritage.ts             # 25 di sản + Trống đồng Đông Sơn
│  │  ├─ regions.ts              # điểm bản đồ theo vùng miền
│  │  ├─ timeline.ts             # mốc lịch sử
│  │  ├─ unesco.ts               # số liệu UNESCO (data-driven)
│  │  └─ placeholder.ts          # sinh ảnh SVG placeholder khi chưa có ảnh thật
│  ├─ hooks/
│  │  ├─ useLenis.ts
│  │  └─ useMediaQuery.ts        # useIsMobile, usePrefersReducedMotion
│  └─ components/
│     ├─ LoadingScreen.tsx
│     ├─ CustomCursor.tsx
│     ├─ ScrollProgress.tsx
│     ├─ Navbar.tsx
│     ├─ Hero.tsx · HeroScene.tsx
│     ├─ HeritageMap.tsx
│     ├─ SectionHeading.tsx
│     ├─ HeritageCard.tsx · HeritageImage.tsx
│     ├─ TangibleHeritage.tsx
│     ├─ IntangibleHeritage.tsx
│     ├─ DocumentaryHeritage.tsx
│     ├─ Timeline.tsx
│     ├─ UNESCOSection.tsx
│     ├─ ArtifactViewer.tsx · ArtifactScene.tsx
│     ├─ SearchBar.tsx · FilterPanel.tsx · Explore.tsx
│     ├─ HeritageDetailModal.tsx
│     ├─ DragonCompanion.tsx · DragonScene.tsx
│     └─ Footer.tsx
└─ public/
   └─ favicon.svg
```

---

## 5. Danh sách feature

**Core (theo brief gốc):**
1. Loading screen có progress %
2. Hero cinematic (ảnh nền + particle 3D + text reveal + CTA glow)
3. Navbar glassmorphism khi cuộn, menu mobile
4. Bản đồ Việt Nam tương tác (hover preview, click mở panel theo vùng)
5. Gallery di sản vật thể — 3D tilt card, cuộn ngang
6. Di sản phi vật thể — floating object tròn + particle
7. Di sản tư liệu — thẻ tài liệu kiểu polaroid xoay
8. Timeline lịch sử cuộn ngang
9. UNESCO section — carousel 3D coverflow + counter animation
10. 3D Artifact Viewer — Trống đồng Đông Sơn (drag/zoom/auto-rotate)
11. Search + Filter (loại / khu vực / thời kỳ)
12. Modal chi tiết di sản (gallery ảnh, lịch sử, vị trí trên mini-map)
13. Footer
14. Custom cursor, scroll progress bar
15. Responsive desktop-first + tắt hiệu ứng nặng trên mobile/reduced-motion

**Enhancement (phát sinh theo phản hồi người dùng):**
16. Rồng 3D (phong cách thời Lý) bay theo con trỏ chuột, xuyên suốt trang,
    không chặn tương tác (`pointer-events: none` áp đúng lên `<Canvas>`)

---

## 6. Chia project thành các phase

| # | Phase | Trạng thái |
|---|---|---|
| 0 | Khởi tạo dự án & tooling | ✅ Hoàn thành |
| 1 | Data layer & types | ✅ Hoàn thành |
| 2 | Design system / theme CSS | ✅ Hoàn thành |
| 3 | Hạ tầng UI toàn cục (loading, cursor, scroll progress, navbar, footer) | ✅ Hoàn thành |
| 4 | Hero cinematic 3D | ✅ Hoàn thành |
| 5 | Các section nội dung (map, 3 loại di sản, timeline, UNESCO) | ✅ Hoàn thành |
| 6 | 3D Artifact Viewer | ✅ Hoàn thành |
| 7 | Search, Filter, Detail Modal | ✅ Hoàn thành |
| 8 | Tích hợp, responsive, performance, kiểm thử tổng | ✅ Hoàn thành |
| 9 | Enhancement: Rồng 3D đồng hành theo chuột | ✅ Hoàn thành |
| 10 | Mở rộng tương lai (model 3D thật, CMS/API, audio/video, code-splitting sâu) | ⏳ Chưa bắt đầu |

---

## 7. Chi tiết từng phase

### Phase 0 — Khởi tạo dự án & tooling ✅
- **Mục tiêu**: có bộ khung chạy được, đúng stack đã chọn.
- **File tạo/sửa**: `package.json`, `vite.config.ts`, `index.html`,
  `public/favicon.svg`.
- **Dependencies**: `vite`, `react`, `react-dom`, `typescript`,
  `@tailwindcss/vite`, `three`, `@react-three/fiber`, `@react-three/drei`,
  `framer-motion`, `lenis`.
- **Tiêu chí hoàn thành**: `npm run dev` chạy được trang trắng không lỗi;
  `npm run build` thành công.
- **Cách test**: chạy `npm run build`; mở dev server kiểm tra console sạch.

### Phase 1 — Data layer & types ✅
- **Mục tiêu**: định nghĩa hợp đồng dữ liệu và nội dung mẫu thật (≥15–20 di
  sản), tách hoàn toàn khỏi UI.
- **File tạo/sửa**: `src/types/index.ts`, `src/data/heritage.ts`,
  `src/data/regions.ts`, `src/data/timeline.ts`, `src/data/unesco.ts`,
  `src/data/placeholder.ts`.
- **Dependencies**: Phase 0.
- **Tiêu chí hoàn thành**: 25 di sản có đủ trường theo `Heritage` interface;
  ảnh lấy từ Wikimedia Commons đã xác minh HTTP 200 (26/29 ảnh thật, 4 ảnh
  fallback placeholder có cấu trúc dễ thay).
- **Cách test**: `tsc -b` không lỗi type; script `curl -o /dev/null -w
  "%{http_code}"` xác minh từng URL ảnh trả về 200.

### Phase 2 — Design system / theme CSS ✅
- **Mục tiêu**: bảng màu (charcoal/burgundy/gold/ivory), font
  (Playfair/Cormorant/Inter), glassmorphism, ornament pattern, hỗ trợ
  `prefers-reduced-motion`.
- **File tạo/sửa**: `src/index.css`, `index.html` (Google Fonts link).
- **Dependencies**: Phase 0.
- **Tiêu chí hoàn thành**: các utility class (`.glass-panel`, `.glass-nav`,
  `.text-gradient-gold`, `.ornament-pattern`, `.dragon-layer`...) render
  đúng theme trên mọi section.
- **Cách test**: kiểm tra trực quan qua screenshot headless Chrome ở nhiều
  section khác nhau.

### Phase 3 — Hạ tầng UI toàn cục ✅
- **Mục tiêu**: các thành phần tồn tại xuyên suốt, độc lập section.
- **File tạo/sửa**: `LoadingScreen.tsx`, `CustomCursor.tsx`,
  `ScrollProgress.tsx`, `Navbar.tsx`, `Footer.tsx`, `hooks/useLenis.ts`,
  `hooks/useMediaQuery.ts`.
- **Dependencies**: Phase 1, 2.
- **Tiêu chí hoàn thành**: loading screen chạy 0→100% rồi biến mất; navbar
  chuyển glass khi cuộn qua 60px; cursor tùy chỉnh chỉ hiện trên desktop.
- **Cách test**: headless Chrome — chờ loading biến mất, cuộn trang kiểm
  tra navbar đổi style, kiểm tra `pointer: coarse` ẩn cursor.

### Phase 4 — Hero cinematic 3D ✅
- **Mục tiêu**: màn mở đầu ấn tượng, text reveal, particle 3D, CTA.
- **File tạo/sửa**: `Hero.tsx`, `HeroScene.tsx`.
- **Dependencies**: Phase 2, 3.
- **Tiêu chí hoàn thành**: particle + vòng tròn xoay hiển thị trên desktop,
  tự tắt trên mobile/reduced-motion; nút CTA cuộn mượt tới section map.
- **Cách test**: screenshot hero ở desktop & mobile viewport; xác nhận
  không có canvas nào render khi `isMobile` true.

### Phase 5 — Các section nội dung ✅
- **Mục tiêu**: đủ 6 khối nội dung chính brief yêu cầu.
- **File tạo/sửa**: `HeritageMap.tsx`, `SectionHeading.tsx`,
  `HeritageCard.tsx`, `HeritageImage.tsx`, `TangibleHeritage.tsx`,
  `IntangibleHeritage.tsx`, `DocumentaryHeritage.tsx`, `Timeline.tsx`,
  `UNESCOSection.tsx`.
- **Dependencies**: Phase 1 (data), Phase 3 (SectionHeading dùng chung).
- **Tiêu chí hoàn thành**: mỗi section render đúng data thật, hover/click
  hoạt động (tilt card, floating object, polaroid, coverflow, counter).
- **Cách test**: headless Chrome scroll tới từng `id` section, screenshot,
  kiểm tra không có console error; click 1 card mở modal đúng heritage.

### Phase 6 — 3D Artifact Viewer ✅
- **Mục tiêu**: mô hình 3D placeholder Trống đồng Đông Sơn, tương tác
  drag/zoom/auto-rotate, ánh sáng kiểu spotlight bảo tàng.
- **File tạo/sửa**: `ArtifactViewer.tsx`, `ArtifactScene.tsx`.
- **Dependencies**: Phase 1 (data `trongDongDongSon`).
- **Tiêu chí hoàn thành**: `LatheGeometry` render đúng dáng trống đồng, ánh
  sáng đủ rõ chi tiết (không bị "silhouette" tối), OrbitControls hoạt động,
  fallback ảnh tĩnh khi `reduced-motion`.
- **Cách test**: screenshot section trước/sau khi chỉnh lighting; xác nhận
  không còn warning `PCFSoftShadowMap` (đã sửa bằng `shadows="percentage"`).

### Phase 7 — Search, Filter, Detail Modal ✅
- **Mục tiêu**: tra cứu toàn bộ di sản theo tên/địa phương/loại/thời kỳ,
  xem chi tiết dạng modal 3D.
- **File tạo/sửa**: `SearchBar.tsx`, `FilterPanel.tsx`, `Explore.tsx`,
  `HeritageDetailModal.tsx`.
- **Dependencies**: Phase 1 (data), Phase 5 (`HeritageCard` dùng chung).
- **Tiêu chí hoàn thành**: gõ từ khóa/lọc trả kết quả đúng ngay lập tức;
  modal mở đúng heritage được click, đóng bằng nút X hoặc phím Escape.
- **Cách test**: headless Chrome gõ "Huế" vào ô tìm kiếm → xác nhận đúng 3
  kết quả liên quan; click card → xác nhận modal chứa đúng tiêu đề.

### Phase 8 — Tích hợp, responsive, performance, kiểm thử tổng ✅
- **Mục tiêu**: ráp toàn bộ vào `App.tsx`, đảm bảo chạy ổn định mọi kích
  thước màn hình, không lỗi console.
- **File tạo/sửa**: `App.tsx`, `main.tsx`.
- **Dependencies**: tất cả phase trên.
- **Tiêu chí hoàn thành**: `npm run build` sạch; test headless Chrome ở
  desktop (1440×900) và mobile (390×844) không có console error; menu
  mobile mở/đóng đúng; nav-click hoạt động.
- **Cách test**: bộ script `puppeteer-core` (scratchpad) chụp toàn bộ
  section + tương tác (modal, search, mobile nav) + `console --errors`.

### Phase 9 — Enhancement: Rồng 3D đồng hành theo chuột ✅
- **Mục tiêu**: thêm yếu tố 3D xuyên suốt trang theo yêu cầu bổ sung của
  người dùng — rồng phong cách thời Lý, bay theo con trỏ chuột, không che
  cứng nội dung, không chặn click.
- **File tạo/sửa**: `DragonCompanion.tsx`, `DragonScene.tsx`, `index.css`
  (`.dragon-layer`), `App.tsx` (gắn component).
- **Dependencies**: Phase 3 (`useMediaQuery`), Phase 0 (Three.js/R3F).
- **Tiêu chí hoàn thành**:
  - Thân rồng gồm các đốt xoay theo tiếp tuyến + vây lưng đỏ (đọc rõ là
    "rồng", không phải "giun/sâu")
  - Đầu bám theo vị trí chuột với độ trễ mượt (lerp ≈0.055/frame)
  - Tự tắt trên mobile / `prefers-reduced-motion`
  - `pointer-events: none` áp đúng lên `<Canvas>` (không chỉ div cha) —
    click xuyên qua bình thường
- **Cách test**: `document.elementFromPoint` xác nhận trả về phần tử nội
  dung (không phải `<canvas>`) tại điểm có rồng đè lên; di chuột nhiều vị
  trí + screenshot xác nhận đầu rồng bám theo; click card vẫn mở modal.

### Phase 10 — Mở rộng tương lai ⏳ (chưa bắt đầu)
- **Mục tiêu (đề xuất)**:
  - Thay `model3D` placeholder bằng file `.glb/.gltf` thật cho Trống đồng
    và (tuỳ chọn) cho rồng.
  - Thêm audio/video thật cho di sản phi vật thể (Nhã nhạc, Ca trù...).
  - Code-splitting sâu hơn cho chunk `three.js` (~893kB gzip ~236kB).
  - Cân nhắc chuyển `src/data/*.ts` sang gọi API/CMS khi có backend.
- **File dự kiến**: `src/assets/models/*.glb`, cập nhật
  `ArtifactScene.tsx`/`DragonScene.tsx` để `useGLTF`, thêm `audio`/`video`
  field đã có sẵn trong `Heritage` interface.
- **Dependencies**: cần asset thật (chưa có), có thể cần backend cho CMS.
- **Tiêu chí hoàn thành**: chưa xác định — phụ thuộc phạm vi được chọn.
- **Cách test**: chưa áp dụng.
