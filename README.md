# Di Sản Văn Hóa Việt Nam — Bảo tàng số 3D

Website bảo tàng số giới thiệu di sản văn hóa Việt Nam, xây dựng theo phong
cách **3D interactive · cinematic · dark luxury**, với họa tiết truyền thống
và trải nghiệm thiên về "khám phá" thay vì đọc tuyến tính.

Nội dung chia làm ba nhóm: di sản **vật thể**, **phi vật thể** và **tư liệu**
— tổng cộng 25 di sản có dữ liệu đầy đủ, phần lớn dùng ảnh thật từ Wikimedia
Commons.

---

## Tính năng chính

| | Tính năng |
|---|---|
| 🎬 | Loading screen có progress, Hero cinematic với particle 3D và text reveal |
| 🗺️ | Bản đồ Việt Nam tương tác — hover xem trước, click mở panel theo vùng miền |
| 🏛️ | Gallery di sản vật thể (thẻ 3D tilt, cuộn ngang) |
| 🎭 | Di sản phi vật thể (floating object + particle) |
| 📜 | Di sản tư liệu (thẻ tài liệu kiểu polaroid) |
| ⏳ | Timeline lịch sử cuộn ngang |
| 🏆 | Section UNESCO — carousel 3D coverflow + counter animation |
| 🥁 | Artifact Viewer 3D — Trống đồng Đông Sơn (drag / zoom / auto-rotate) |
| 🔍 | Tìm kiếm + lọc theo loại / khu vực / thời kỳ |
| 🐉 | Rồng 3D phong cách thời Lý bay theo con trỏ chuột, phản ứng khi cuộn trang |
| ✨ | Custom cursor, thanh tiến trình cuộn, modal chi tiết di sản, smooth scroll |

Toàn bộ hiệu ứng nặng tự tắt trên mobile và khi người dùng bật
`prefers-reduced-motion`.

---

## Tech stack

| Layer | Công nghệ |
|---|---|
| Build | Vite 8 |
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, theme token qua `@theme`) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion |
| Smooth scroll | Lenis |
| Lint | Oxlint |

Không dùng state management ngoài (`useState` ở `App.tsx` là đủ), không có
backend/CMS, không tải asset 3D bên ngoài — toàn bộ mô hình 3D dựng bằng
hình học thủ công trong code.

---

## Bắt đầu

Yêu cầu: **Node.js 20.19+ hoặc 22.12+** (theo yêu cầu của Vite 8) và npm.

```bash
npm install      # cài dependencies
npm run dev      # chạy dev server (http://localhost:5173)
```

### Các script

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Dev server có HMR |
| `npm run build` | Type-check (`tsc -b`) rồi build production vào `dist/` |
| `npm run preview` | Chạy thử bản build production |
| `npm run lint` | Kiểm tra code bằng Oxlint |

---

## Cấu trúc thư mục

```
src/
├─ App.tsx              # composition root — ghép các section + overlay toàn cục
├─ main.tsx
├─ index.css            # theme token, utility (.glass-panel, .ornament-pattern…)
├─ types/index.ts       # Heritage, TimelineEvent, RegionInfo, UnescoStat + label maps
├─ data/                # nguồn sự thật duy nhất của mọi nội dung hiển thị
│  ├─ heritage.ts       # 25 di sản
│  ├─ regions.ts        # điểm trên bản đồ theo vùng miền
│  ├─ timeline.ts       # mốc lịch sử
│  ├─ unesco.ts         # số liệu UNESCO
│  └─ placeholder.ts    # sinh ảnh SVG placeholder khi chưa có ảnh thật
├─ hooks/
│  ├─ useLenis.ts       # smooth scroll (tự tắt khi reduced-motion)
│  └─ useMediaQuery.ts  # useIsMobile, usePrefersReducedMotion
└─ components/          # các section + overlay, thuần presentational
```

Ba `<Canvas>` 3D (`HeroScene`, `ArtifactScene`, `DragonScene`) được tách
thành chunk riêng và lazy-load để không chặn bundle chính.

---

## Thêm / sửa nội dung

Dự án **data-driven**: không hard-code nội dung trong JSX. Để thêm một di
sản mới, chỉ cần thêm một object vào `src/data/heritage.ts` theo đúng
interface `Heritage` — mọi section (gallery, bản đồ, tìm kiếm, modal chi
tiết) sẽ tự động nhận:

```ts
{
  id: "ma-dinh-danh-duy-nhat",
  name: "Tên di sản",
  type: "tangible",          // tangible | intangible | documentary
  region: "bac-bo",          // bac-bo | trung-bo | tay-nguyen | nam-bo
  era: "trung-dai",          // co-dai | trung-dai | can-dai | hien-dai
  location: "Tỉnh/Thành phố",
  description: "Mô tả ngắn hiển thị trên thẻ.",
  longDescription: "Nội dung lịch sử & giá trị văn hóa hiển thị trong modal.",
  image: "https://upload.wikimedia.org/...",
  mapPosition: { x: 43, y: 58 },   // % toạ độ trên bản đồ SVG
  unesco: true, unescoYear: 1993,  // tuỳ chọn
}
```

Chưa có ảnh thật thì dùng `placeholderImage(...)` từ `data/placeholder.ts`,
thay bằng URL thật sau cũng không cần sửa UI.

---

## Tài liệu liên quan

| File | Nội dung |
|---|---|
| [SPEC.md](SPEC.md) | Đặc tả sản phẩm: mô hình dữ liệu, yêu cầu chức năng theo từng section (có mã FR để tra ngược), yêu cầu phi chức năng, ràng buộc, khoảng trống đã biết |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Kế hoạch triển khai: phân tích yêu cầu, kiến trúc, chia phase, tiêu chí hoàn thành từng phase |
| [TASKS.md](TASKS.md) | Nhật ký tiến độ chi tiết — mỗi hạng mục ghi vấn đề, nguyên nhân gốc, cách sửa và cách kiểm thử |
| [CLAUDE.md](CLAUDE.md) | Quy ước kỹ thuật bắt buộc khi sửa code (đặc biệt phần 3D) |

---

## Nguồn ảnh

Ảnh di sản lấy từ **Wikimedia Commons** (ảnh tự do bản quyền / Creative
Commons), tra cứu qua Wikipedia REST API + Commons imageinfo API và đã xác
minh trả về HTTP 200. Bốn di sản hiếm ảnh tự do (Ví Giặm, Xòe Thái, Mộc bản
Phúc Giang, Hoàng hoa sứ trình đồ) tạm dùng ảnh placeholder SVG sinh trong
code. Chi tiết xem mục *Nguồn ảnh* trong [TASKS.md](TASKS.md).
