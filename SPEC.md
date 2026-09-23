# Đặc tả dự án — Di Sản Văn Hóa Việt Nam

> **Mục đích tài liệu**: mô tả *sản phẩm phải làm được gì* và *đang làm được
> gì*, dùng làm chuẩn đối chiếu khi kiểm thử hoặc mở rộng. Khác với
> [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) (kế hoạch *làm như thế nào*,
> chia theo phase) và [TASKS.md](TASKS.md) (nhật ký *đã làm gì*).
>
> Mọi hành vi mô tả dưới đây được đọc trực tiếp từ code, không phải ý định
> thiết kế. Phần chênh lệch giữa ý định và hiện trạng ghi ở §8.

| | |
|---|---|
| Phiên bản | 1.0 |
| Cập nhật | 2026-09-23 |
| Trạng thái | Bản dựng đầu tiên đã hoàn thành, đang trong giai đoạn tinh chỉnh |

---

## 1. Phạm vi

### 1.1 Trong phạm vi
Website tĩnh một trang (single-page, cuộn dọc) giới thiệu di sản văn hóa Việt
Nam, chạy hoàn toàn phía client, không cần backend. Nội dung gồm ba nhóm di
sản, bản đồ vùng miền, dòng thời gian lịch sử, khu vực UNESCO, trình xem hiện
vật 3D và công cụ tra cứu.

### 1.2 Ngoài phạm vi
| Hạng mục | Lý do |
|---|---|
| Đăng nhập / tài khoản người dùng | Không có nội dung cá nhân hóa |
| Backend, database, CMS | Dữ liệu tĩnh trong `src/data/*.ts` |
| Đa ngôn ngữ (i18n) | Chỉ phục vụ tiếng Việt |
| SEO nâng cao / SSR | Là trang trưng bày, không tối ưu tìm kiếm |
| Audio/video thật cho di sản phi vật thể | Chưa có nguồn tư liệu hợp pháp |
| Model 3D thật (.glb/.gltf) | Chưa có asset; xem ràng buộc RB-02 |

### 1.3 Đối tượng người dùng
Người xem phổ thông quan tâm văn hóa Việt Nam, truy cập chủ yếu bằng
**desktop** (thiết kế desktop-first). Mobile phải xem được đầy đủ nội dung
nhưng chấp nhận lược bớt hiệu ứng nặng.

---

## 2. Đặc tả dữ liệu

Nguồn sự thật duy nhất: `src/data/*.ts`. Hợp đồng kiểu: `src/types/index.ts`.

### 2.1 Bảng liệt kê dữ liệu hiện có

| Export | File | Số bản ghi | Ghi chú |
|---|---|---|---|
| `heritageList` | `heritage.ts` | 25 | Toàn bộ đều có `unesco: true` |
| `trongDongDongSon` | `heritage.ts` | 1 | Hiện vật cho trình xem 3D, **không** phải di sản UNESCO |
| `allHeritage` | `heritage.ts` | 26 | `[...heritageList, trongDongDongSon]` |
| `regions` | `regions.ts` | 10 | Điểm ghim trên bản đồ, gom về 4 vùng |
| `timelineEvents` | `timeline.ts` | 9 | Mốc lịch sử |
| `unescoStats` | `unesco.ts` | 4 | Số liệu cho counter |

Phân bố theo `type` trong `allHeritage`: **vật thể 10 · phi vật thể 10 · tư
liệu 6**.

### 2.2 Kiểu `Heritage`

| Trường | Kiểu | Bắt buộc | Ý nghĩa / ràng buộc |
|---|---|---|---|
| `id` | `string` | ✔ | Định danh duy nhất, dạng kebab-case |
| `name` | `string` | ✔ | Tên hiển thị |
| `type` | `"tangible" \| "intangible" \| "documentary"` | ✔ | Quyết định di sản xuất hiện ở section nào |
| `location` | `string` | ✔ | Tỉnh/thành — nằm trong phạm vi tìm kiếm |
| `region` | `"bac-bo" \| "trung-bo" \| "tay-nguyen" \| "nam-bo"` | ✔ | Dùng cho bộ lọc và bản đồ |
| `era` | `"co-dai" \| "trung-dai" \| "can-dai" \| "hien-dai"` | ✔ | Dùng cho bộ lọc |
| `description` | `string` | ✔ | Mô tả ngắn trên thẻ — nằm trong phạm vi tìm kiếm |
| `longDescription` | `string` | ✔ | Nội dung modal chi tiết |
| `image` | `string` | ✔ | URL ảnh chính |
| `year` · `unescoYear` | `number` | ✖ | Năm âm hiển thị dạng "… TCN" |
| `unesco` | `boolean` | ✖ | `true` ⇒ xuất hiện ở carousel UNESCO và có huy hiệu trên thẻ |
| `gallery` | `string[]` | ✖ | Không có ⇒ modal dùng `[image]` |
| `mapPosition` | `{x, y}` | ✖ | Phần trăm 0–100 trên bản đồ SVG; không có ⇒ không hiện chấm trên mini-map |
| `tags` | `string[]` | ✖ | Hiển thị dạng `#tag` trong modal |
| `significance` · `culturalSpace` · `practitioners` · `material` · `origin` · `pattern` | `string` | ✖ | Mỗi trường có mặt sẽ sinh thêm một hàng thông tin trong modal |
| `coordinates` · `model3D` · `audio` · `video` | — | ✖ | Đã khai báo trong kiểu nhưng **chưa được UI sử dụng** |

**DL-01** — Thêm/sửa nội dung chỉ được thực hiện trong `src/data/*.ts`; không
hard-code nội dung trong JSX.
**DL-02** — Ảnh lỗi phải tự thay bằng ảnh SVG placeholder sinh trong code, không
để vỡ layout (xem FR-21).

---

## 3. Cấu trúc trang & điều hướng

### 3.1 Thứ tự section (theo `App.tsx`)

| # | Section | `id` | Có trong menu? |
|---|---|---|---|
| 1 | Hero | `hero` | ✔ Trang chủ |
| 2 | Bản đồ di sản | `map` | ✔ Bản đồ di sản |
| 3 | Di sản vật thể | `tangible` | ✔ Di sản vật thể |
| 4 | Di sản phi vật thể | `intangible` | ✔ Di sản phi vật thể |
| 5 | Di sản tư liệu | `documentary` | ✔ Di sản tư liệu |
| 6 | Dòng thời gian | `timeline` | ✔ Dòng thời gian |
| 7 | UNESCO | `unesco` | ✖ |
| 8 | Trình xem hiện vật 3D | `artifact` | ✖ |
| 9 | Khám phá (tìm kiếm) | `explore` | ✖ |
| 10 | Footer | `about` | ✔ Về dự án |

**FR-01** — Click mục menu hoặc logo phải cuộn mượt tới section tương ứng, ưu
tiên Lenis (`duration: 1.2`), fallback `scrollIntoView` nếu Lenis chưa khởi tạo.
**FR-02** — Navbar chuyển sang nền kính (`.glass-nav`) khi `scrollY > 60px`.
**FR-03** — Dưới breakpoint `lg`, menu thu về nút hamburger mở/đóng dropdown.

---

## 4. Đặc tả chức năng theo section

Ký hiệu: **FR** = yêu cầu chức năng. Mỗi mục kèm tiêu chí nghiệm thu quan sát
được bằng mắt hoặc script kiểm thử.

### 4.1 Lớp phủ toàn cục

| Mã | Yêu cầu | Tiêu chí nghiệm thu |
|---|---|---|
| FR-04 | Màn hình tải chạy 0→100% trong 2200ms rồi mờ dần 350ms và biến mất | Sau ~2.6s không còn lớp phủ, nội dung tương tác được |
| FR-05 | Con trỏ tùy chỉnh (chấm + vòng trễ, hệ số lerp 0.18) phóng to khi hover `a`, `button`, `[data-cursor-hover]` | Tự tắt hoàn toàn trên thiết bị `pointer: coarse` và dưới breakpoint `md` |
| FR-06 | Thanh tiến trình cuộn ở mép trên, `scaleX` bám tiến độ cuộn, làm mượt bằng spring (stiffness 120 / damping 30) | Cuộn tới đáy ⇒ thanh đầy |
| FR-07 | Rồng 3D bay theo con trỏ xuyên suốt trang, phản ứng khi cuộn | Xem §4.4 |

### 4.2 Section nội dung

| Mã | Section | Yêu cầu | Tiêu chí nghiệm thu |
|---|---|---|---|
| FR-08 | Hero | Tiêu đề hiện từng chữ (stagger tới ~2.4s), ảnh nền zoom chậm 24s, nút CTA cuộn tới `map` | Canvas particle 3D chỉ render khi **không** mobile và **không** reduced-motion |
| FR-09 | Bản đồ | Bản đồ SVG hình chữ S, nghiêng 3D theo chuột; hover điểm ghim hiện popup (ảnh + tên + số lượng); click chọn vùng, hiện mô tả và lưới di sản thuộc vùng đó | Click một di sản trong lưới ⇒ mở modal đúng di sản. Bản đồ loại trừ `trong-dong-dong-son` |
| FR-10 | Di sản vật thể | Băng cuộn ngang các thẻ `type === "tangible"`, nút trái/phải cuộn ±420px mượt | Thẻ nghiêng 3D theo vị trí chuột, click mở modal |
| FR-11 | Di sản phi vật thể | Các ảnh tròn trôi nổi nhẹ (chu kỳ 5–8s so le), hiện dần khi cuộn tới (chỉ một lần) | Click ảnh mở modal đúng di sản |
| FR-12 | Di sản tư liệu | Thẻ tài liệu xoay nghiêng theo 6 góc preset, hover thì thẳng lại + phóng to + hiện mô tả | Click mở modal |
| FR-13 | Dòng thời gian | Cuộn ngang 9 mốc lịch sử; lăn chuột dọc được quy đổi thành cuộn ngang (`deltaY × 1.4`); nút lùi/tiến ±360px | Thẻ hiện dần khi vào khung nhìn |
| FR-14 | UNESCO | 4 số liệu đếm tăng dần trong 1600ms (ease-out) khi vào khung nhìn lần đầu; carousel 3D tự chuyển mỗi 4200ms, chỉ hiện các thẻ lệch ±2 | Click thẻ giữa ⇒ mở modal; click thẻ bên ⇒ đưa thẻ đó ra giữa; chấm chỉ mục nhảy đúng vị trí |
| FR-15 | Hiện vật 3D | Mô hình Trống đồng Đông Sơn xoay/zoom được bằng kéo–thả và lăn chuột, có nút bật/tắt tự xoay | Khi reduced-motion ⇒ thay bằng ảnh tĩnh, **không** dựng canvas 3D |
| FR-16 | Khám phá | Ô tìm kiếm + 3 nhóm bộ lọc + lưới kết quả | Xem FR-17…FR-19 |
| FR-17 | Tìm kiếm | Khớp chuỗi con, không phân biệt hoa thường, trên **tên · địa điểm · mô tả ngắn** | Lọc lại ngay mỗi lần gõ (không debounce) |
| FR-18 | Bộ lọc | 3 nhóm (loại · khu vực · thời kỳ), mỗi nhóm chọn đơn, có tùy chọn "Tất cả"; các nhóm kết hợp theo **AND**, rồi mới áp từ khóa | Đổi bộ lọc ⇒ lưới cập nhật tức thì |
| FR-19 | Không có kết quả | Hiện thông báo "Không tìm thấy di sản phù hợp…" thay vì lưới rỗng | — |
| FR-20 | Footer | Thông tin dự án + năm bản quyền tính động | — |

### 4.3 Modal chi tiết

| Mã | Yêu cầu | Tiêu chí nghiệm thu |
|---|---|---|
| FR-21 | Mở khi click bất kỳ thẻ di sản nào (trừ dòng thời gian — xem §8) | Tiêu đề modal khớp di sản đã click |
| FR-22 | Thư viện ảnh với dải ảnh nhỏ; click ảnh nhỏ đổi ảnh lớn | Đổi sang di sản khác khi modal đang mở ⇒ chỉ mục ảnh reset (ép remount bằng `key={heritage.id}`) |
| FR-23 | Đóng bằng: nút ✕, click nền mờ, hoặc phím **Escape** | Cả ba cách đều đóng được |
| FR-24 | Khóa cuộn trang nền khi modal mở, trả lại khi đóng | `document.body.style.overflow` được khôi phục |
| FR-25 | Chỉ render các trường tùy chọn thực sự có dữ liệu | Không hiện hàng trống |
| FR-26 | Ảnh lỗi tải ⇒ tự thay bằng placeholder SVG; ảnh ngoài khung nhìn dùng `loading="lazy"` | Ảnh hero của modal dùng `eager` |

### 4.4 Rồng 3D đồng hành

| Mã | Yêu cầu | Tiêu chí nghiệm thu |
|---|---|---|
| FR-27 | Bay theo con trỏ với độ trễ mượt (lerp ≈0.055/frame), không bám dính tức thì | Quan sát bằng ảnh chụp ở nhiều vị trí chuột |
| FR-28 | Khi cuộn trang, toàn thân duỗi thẳng theo hướng cuộn và uốn lượn, đầu dẫn hướng | Cuộn xuống ⇒ đầu chúc xuống; cuộn lên ⇒ đầu ngẩng lên |
| FR-29 | Chuyển trạng thái cuộn ⇄ nghỉ phải mượt, không giật cấp | Chuỗi ảnh liên tiếp cho thấy tăng/giảm dần |
| FR-30 | Đầu phải luôn là một khối liền với thân, không lệch/rời mối nối ở mọi tư thế | Rà nhiều vị trí chuột, không thấy khe hở hay xoắn ở cổ |
| FR-31 | **Không được chặn tương tác**: `pointer-events: none` áp trực tiếp lên `<Canvas>` | `document.elementFromPoint` tại điểm có rồng đè phải trả về phần tử nội dung, không phải `<canvas>` |
| FR-32 | Tự gỡ bỏ hoàn toàn (unmount, không gắn listener) khi mobile hoặc reduced-motion | Không có canvas rồng trong DOM ở hai trường hợp này |

---

## 5. Đặc tả giao diện

### 5.1 Token màu (`src/index.css`, khối `@theme`)

| Token | Mã | Dùng cho |
|---|---|---|
| `--color-ink` | `#0b0908` | Nền trang |
| `--color-charcoal` / `-light` | `#14100f` / `#1d1715` | Nền khối, thẻ |
| `--color-burgundy` / `-light` / `-dark` | `#5c1a24` / `#7a2532` / `#3a0f16` | Nhấn đỏ truyền thống |
| `--color-gold` / `-light` / `-dark` | `#d4af37` / `#f0d78c` / `#a1791f` | Viền, chữ nhấn, hiệu ứng phát sáng |
| `--color-ivory` / `-dim` | `#f4ecd8` / `#cfc3a6` | Chữ chính / chữ phụ |

### 5.2 Kiểu chữ

| Token | Font | Dùng cho |
|---|---|---|
| `--font-display` | Playfair Display | Tiêu đề lớn |
| `--font-serif` | Cormorant Garamond | Trích dẫn, mô tả in nghiêng |
| `--font-body` | Inter | Nội dung, giao diện |

### 5.3 Utility bắt buộc dùng lại

`.glass-panel` · `.glass-nav` (nền kính mờ) · `.text-gradient-gold` ·
`.text-glow-gold` · `.btn-glow` · `.ornament-pattern` · `.divider-gold` ·
`.card-3d` · `.no-scrollbar` · `.dragon-layer`.

**UI-01** — Không tự chế lại nền kính/gradient vàng bằng class rời; dùng
utility sẵn có để giữ đồng nhất.

---

## 6. Yêu cầu phi chức năng

| Mã | Yêu cầu | Cách kiểm chứng |
|---|---|---|
| NFR-01 | Mục tiêu 60 FPS trên desktop tầm trung | Quan sát khi cuộn qua các section 3D |
| NFR-02 | Không cấp phát object mới trong vòng lặp `useFrame` | Đọc code: mọi vector/matrix tạm phải nằm trong `scratch` khai báo bằng `useRef` |
| NFR-03 | Ba canvas 3D phải được code-split, tải theo nhu cầu | Bản build sinh chunk riêng cho `HeroScene`, `ArtifactScene`, `DragonScene` |
| NFR-04 | Tôn trọng `prefers-reduced-motion`: tắt smooth scroll, hiệu ứng 3D nặng, rút mọi animation về ~0ms | Bật reduced-motion trong trình duyệt, kiểm tra không có canvas rồng/hero |
| NFR-05 | Trên mobile: không render rồng 3D và con trỏ tùy chỉnh; không có cuộn ngang ngoài ý muốn | Kiểm ở khung nhìn 390×844 |
| NFR-06 | Không có lỗi console ở mọi luồng chính | Script headless bắt `pageerror` + `console.error` |
| NFR-07 | `npm run build` (gồm `tsc -b`) phải sạch trước mỗi lần bàn giao | Chạy lệnh |
| NFR-08 | Ảnh dùng `loading="lazy"` trừ ảnh trong khung nhìn đầu | Đọc thuộc tính trong DOM |
| NFR-09 | Trình duyệt hỗ trợ: các bản hiện hành của Chrome/Edge/Firefox/Safari có WebGL | — |

### 6.1 Khả năng tiếp cận (hiện trạng)

| Mã | Yêu cầu | Trạng thái |
|---|---|---|
| A11Y-01 | Nút biểu tượng có `aria-label` (hamburger, mũi tên cuộn, xóa tìm kiếm, đóng modal, chấm carousel) | ✔ Đạt |
| A11Y-02 | Ảnh nội dung có `alt` mô tả; ảnh trang trí để `alt=""` | ✔ Đạt |
| A11Y-03 | Modal đóng được bằng phím Escape | ✔ Đạt |
| A11Y-04 | Lớp trang trí (`CustomCursor`, `DragonCompanion`) đánh dấu `aria-hidden` | ✔ Đạt |
| A11Y-05 | Modal bẫy tiêu điểm bàn phím và trả tiêu điểm về nơi vừa click | ✖ Chưa làm — xem §8 |

---

## 7. Ràng buộc kỹ thuật

| Mã | Ràng buộc | Lý do |
|---|---|---|
| RB-01 | Không backend, không CMS; dữ liệu là module TypeScript tĩnh | Giữ deploy dạng static hosting |
| RB-02 | **Không tải asset 3D/texture/HDRI bên ngoài**; mọi hình khối dựng bằng primitive geometry trong code | Quyết định có chủ đích — tránh phụ thuộc asset chưa có bản quyền rõ ràng |
| RB-03 | Ảnh lấy từ Wikimedia Commons (giấy phép tự do), phải xác minh trả về HTTP 200 trước khi đưa vào data | Tránh ảnh chết và vi phạm bản quyền |
| RB-04 | Không thêm thư viện quản lý state | State hiện đủ đơn giản |
| RB-05 | Hướng xoay trong 3D phải dựng bằng "stable basis" (xem [CLAUDE.md](CLAUDE.md)) | `setFromUnitVectors` để hở góc roll, gây lật thất thường |

---

## 8. Khoảng trống đã biết & nợ kỹ thuật

Các điểm chênh giữa ý định thiết kế và hiện trạng code, cần quyết định giữ
nguyên hay khắc phục:

| Mã | Mô tả | Ảnh hưởng |
|---|---|---|
| GAP-01 | Ba section `unesco`, `artifact`, `explore` không có mục trong menu điều hướng | Người dùng chỉ tới được bằng cách cuộn tay |
| GAP-02 | Thẻ dòng thời gian không click được (không nhận `onOpenDetail`), khác với mọi section nội dung khác | Thiếu nhất quán tương tác |
| GAP-03 | Các "liên kết" trong footer là `<span>`, click không có tác dụng | Gây kỳ vọng sai |
| GAP-04 | Modal chưa bẫy tiêu điểm bàn phím (A11Y-05) | Người dùng bàn phím có thể tab ra sau nền mờ |
| GAP-05 | `ArtifactViewer` chỉ tắt 3D khi reduced-motion, vẫn dựng canvas trên mobile (chỉ hiện ghi chú đã tối ưu) | Chênh với NFR-05 ở phần tinh thần "giảm tải cho mobile" |
| GAP-06 | Bản đồ nghiêng theo `mousemove`, chưa kiểm thử trên thiết bị cảm ứng | Hành vi trên mobile chưa xác định |
| GAP-07 | Các trường `coordinates`, `model3D`, `audio`, `video` đã có trong kiểu nhưng chưa dùng | Dữ liệu thừa, hoặc là chỗ bám cho Phase 10 |
| GAP-08 | Rồng khóa hướng theo đốt cổ ⇒ ở một số tư thế mặt quay khuất khỏi người xem | Đánh đổi đã chấp nhận để ưu tiên đầu gắn liền thân (FR-30) |
| GAP-09 | Chunk `three.js` ~893kB (gzip ~236kB), vượt ngưỡng cảnh báo của Vite | Thời gian tải lần đầu |

---

## 9. Tiêu chí nghiệm thu tổng

Một thay đổi chỉ được coi là hoàn thành khi **tất cả** điều kiện sau đạt:

1. `npm run build` sạch (bao gồm `tsc -b`).
2. Chạy `npm run preview`, kiểm thử bằng headless Chrome: không có
   `pageerror` và không có `console.error` ở luồng chính.
3. Chụp ảnh **tỉ lệ thật, full viewport** (không chỉ ảnh phóng to) xác nhận
   thay đổi hiển thị đúng như mô tả.
4. `document.elementFromPoint` xác nhận lớp phủ không chặn click (FR-31).
5. Kiểm ở cả hai khung nhìn desktop (1440×900) và mobile (390×844).
6. Ghi lại vào [TASKS.md](TASKS.md) theo cấu trúc: vấn đề → nguyên nhân gốc →
   cách sửa → cách kiểm thử.
