# Hướng dẫn cho Claude Code

Quy ước kỹ thuật của dự án này. Đọc trước khi sửa code — nhiều mục dưới đây
là kết luận rút ra sau khi đã sửa sai vài lần, không phải sở thích cá nhân.

## Lệnh

```bash
npm run dev      # dev server
npm run build    # tsc -b && vite build — luôn chạy trước khi báo hoàn thành
npm run preview  # chạy thử bản production (dùng để kiểm thử headless)
npm run lint     # oxlint
```

## Giao tiếp & tài liệu

- Trao đổi với người dùng bằng **tiếng Việt**.
- `TASKS.md` và `IMPLEMENTATION_PLAN.md` viết bằng tiếng Việt. Comment trong
  code: theo ngôn ngữ đang dùng sẵn trong chính file đó.
- Sau mỗi lần sửa có ý nghĩa, thêm mục mới vào `TASKS.md` theo đúng cấu trúc
  đang có: **vấn đề được báo → nguyên nhân gốc → cách sửa → cách kiểm thử**.
  Ghi cả những hướng đã thử nhưng không dùng và lý do — đó là phần giá trị
  nhất khi đọc lại về sau.

## Team agents

Gõ `/team <yêu cầu>` (`.claude/skills/team/SKILL.md`) để chạy cả team. Phiên
chính là **agent chính**: điều phối, review, là agent duy nhất được push.

| Agent | File | Model | Được sửa | Việc |
|---|---|---|---|---|
| `ba` | `.claude/agents/ba.md` | sonnet | chỉ `SPEC.md` | Yêu cầu → đặc tả + tiêu chí nghiệm thu kiểm được |
| `ui-ux` | `.claude/agents/ui-ux.md` | sonnet | chỉ script tạm `*.tmp.cjs`, `.tmp-test/` | Thiết kế theo design system trước khi code; review trực quan trên ảnh chụp thật sau khi tester PASS |
| `dev` | `.claude/agents/dev.md` | inherit | code, `TASKS.md` | Hiện thực trên nhánh, lint/build, commit local — không push/merge |
| `tester` | `.claude/agents/tester.md` | sonnet | chỉ script tạm `*.tmp.cjs`, `.tmp-test/` | Kiểm thử nghiệm thu trên bản build thật, báo PASS/FAIL có bằng chứng |

Luồng: BA → (hỏi người dùng nếu có câu hỏi mở) → UI/UX thiết kế → dev → tester →
UI/UX review → tối đa **3 vòng** sửa → agent chính review diff → push nhánh →
**merge chỉ khi người dùng đồng ý**. Hai bước UI/UX chỉ chạy khi yêu cầu ảnh hưởng
giao diện/tương tác; "bắt buộc sửa" của UI/UX tính như FAIL của tester.
Subagent không gọi được nhau và không thấy cuộc trò chuyện: agent chính phải
chuyển đủ ngữ cảnh mỗi lần giao việc.

Khi sửa frontmatter của agent/skill: viết giá trị một dòng, **không** chứa `: `
hoặc ` #`, không cần nháy — theo đúng kiểu `ba.md`/`dev.md`/`tester.md`. File
trong `.claude/` phải là LF (`.gitattributes` đã ép `eol=lf`). Sai một trong hai,
agent **âm thầm biến mất** khỏi danh sách: `ui-ux` từng mất khi git ghi lại file
bằng CRLF (description có `: `), và vẫn mất khi chỉ thêm nháy kép.

## Quy trình git (bắt buộc)

Repo: `https://github.com/dct2002/Disanvanhoa` — nhánh chính `main`.

- **Không bao giờ commit hay push thẳng lên `main`.** Mọi thay đổi đi qua một
  nhánh riêng, push nhánh đó lên GitHub, rồi mới hợp nhất vào `main` sau.
- Tạo nhánh từ `main` mới nhất:

  ```bash
  git switch main && git pull --ff-only
  git switch -c <loại>/<mô-tả-ngắn>
  ```

- Đặt tên nhánh `<loại>/<mô-tả-ngắn>`: chữ thường, không dấu, nối bằng `-`.

  | Loại | Dùng khi | Ví dụ |
  |---|---|---|
  | `feat` | Thêm tính năng mới | `feat/menu-kham-pha` |
  | `fix` | Sửa lỗi | `fix/dau-rong-lech-than` |
  | `refactor` | Cấu trúc lại code, không đổi hành vi | `refactor/scroll-to-section` |
  | `perf` | Cải thiện hiệu năng | `perf/tach-chunk-three` |
  | `docs` | Chỉ sửa tài liệu | `docs/quy-trinh-git` |
  | `chore` | Cấu hình, dọn dẹp, dependency | `chore/xoa-asset-thua` |

- Mỗi nhánh chỉ phục vụ **một** mục đích; việc khác thì mở nhánh khác.
- Trên nhánh: commit theo từng bước có ý nghĩa, rồi `git push -u origin <nhánh>`.
- **Hợp nhất vào `main` chỉ khi người dùng đồng ý**, không tự làm ngay sau khi
  push. Khi đã được đồng ý:

  ```bash
  git switch main && git pull --ff-only
  git merge --no-ff <nhánh>      # giữ commit merge để thấy rõ ranh giới nhánh
  git push origin main
  git branch -d <nhánh> && git push origin --delete <nhánh>
  ```

  Hoặc người dùng tự tạo Pull Request trên GitHub từ link mà `git push` in ra.
- Không `push --force` lên `main`, không viết lại lịch sử đã push khi chưa được
  người dùng cho phép rõ ràng.
- Trước khi push nhánh có sửa code: `npm run lint` + `npm run build` phải sạch
  (xem mục Kiểm thử).
- **Commit chỉ đứng tên người dùng.** Commit message không thêm dòng
  `Co-Authored-By` hay bất kỳ ghi chú Claude/AI nào; mô tả Pull Request không
  thêm dòng "Generated with Claude Code". Quy tắc này ưu tiên hơn mặc định của
  công cụ.
- Người dùng có thể tự merge Pull Request trên GitHub — luôn `git fetch` và so
  `origin/main` trước khi merge hay push `main`, không giả định `main` trên
  GitHub vẫn ở chỗ lần cuối mình đẩy.

## Nguyên tắc kiến trúc

- **Data-driven**: mọi nội dung hiển thị đọc từ `src/data/*.ts`. Không
  hard-code nội dung trong JSX.
- `src/types/index.ts` là hợp đồng dữ liệu duy nhất giữa data layer và UI.
- State giữ tối giản: chỉ `loading` và `selected` ở `App.tsx`; mỗi section tự
  quản lý state cục bộ của nó.
- Ba `<Canvas>` 3D lazy-load qua `React.lazy` + `Suspense`, không import
  tĩnh vào bundle chính.
- **Không tải asset ngoài**: không GLTF/model/texture/HDRI. Mọi hình khối 3D
  dựng bằng primitive geometry của Three.js. Đây là quyết định có chủ đích —
  đừng "cải thiện" bằng cách thêm asset.

## Hiệu năng & khả năng tiếp cận

- Hiệu ứng nặng (canvas 3D, cursor tùy chỉnh, smooth scroll) phải tự tắt khi
  `useIsMobile()` hoặc `usePrefersReducedMotion()` trả về `true`.
- Overlay toàn cục (`DragonCompanion`, `CustomCursor`, `ScrollProgress`) phải
  `pointer-events: none` áp **trực tiếp lên phần tử `<Canvas>`** — nếu không,
  canvas phủ toàn màn hình sẽ nuốt mọi click của trang.

## Quy ước trong `useFrame` (quan trọng)

- **Không cấp phát object trong vòng lặp frame.** Mọi `Vector3` / `Matrix4` /
  `Quaternion` / `Color` tạm phải khai báo sẵn một lần trong
  `useRef({...}).current` rồi tái sử dụng. Xem `scratch` trong
  `DragonScene.tsx` làm mẫu.
- **Dựng hướng xoay bằng "stable basis"**, không dùng
  `quaternion.setFromUnitVectors` với một trục thế giới: cách đó để hở góc
  roll quanh trục tiếp tuyến và lật thất thường khi thân uốn cong (đã gây lỗi
  "chân như que gãy" trước đây). Công thức đang dùng:

  ```ts
  const rightRef = Math.abs(tangent.y) > 0.95 ? WORLD_RIGHT : WORLD_UP;
  const right = crossVectors(rightRef, tangent).normalize();
  const up = crossVectors(tangent, right).normalize();
  makeBasis(right, up, tangent);   // thoả cross(right, up) === tangent
  ```

- Các bộ phận gắn vào thân (đầu, chân, vây) phải suy ra hướng từ **đúng bộ
  vector `right`/`up`/`tangent` mà đốt thân tại vị trí đó đang dùng**, không
  tính hướng độc lập. Hai phép tính độc lập gần như không bao giờ khớp nhau
  chính xác, và sai lệch đó đọc thành "bộ phận bị rời khỏi thân".

## Quy ước dựng hình 3D

- Con rồng chiếm rất ít pixel trên màn hình thật. Chi tiết "đúng tỉ lệ thực
  tế" sẽ biến mất hoàn toàn ở kích thước đó — phải **phóng đại rõ rệt** so
  với mức trông hợp lý khi zoom cận.
- Chi tiết nhỏ cần nhìn thấy (mắt, khoang miệng) nên **tự phát sáng**
  (`emissive`), không chỉ dựa vào màu khuếch tán; và phải tương phản màu với
  nền xung quanh nó — thêm "một sắc cam khác" lên khuôn mặt vàng cam là vô
  hình.

## Kiểm thử

Không báo "đã xong" nếu chỉ suy luận trên code. Quy trình chuẩn:

1. `npm run build` — phải sạch.
2. `npm run preview` ở một cổng chưa dùng, rồi kiểm thử bằng `puppeteer-core`
   trỏ tới Chrome cài sẵn của máy.
3. Chụp ảnh ở **tỉ lệ thật, full viewport** — không chỉ ảnh zoom/crop sát.
   Ảnh zoom từng cho kết luận sai ("đã thấy rõ") trong khi ở kích thước thật
   người dùng vẫn không nhìn ra gì.
4. Khi khó kết luận bằng mắt (hướng xoay, góc nghiêng), gắn tạm biến debug
   lên `window` trong `useFrame`, đọc số liệu trực tiếp qua `page.evaluate`,
   rồi **gỡ biến debug** trước khi build lần cuối.
5. Kiểm tra không có console error và click vẫn xuyên qua được canvas overlay
   (`document.elementFromPoint`).
6. Với phần tử tương tác, kiểm bằng **chuột/chạm thật** (`page.mouse.move` →
   `down` → `up`, `page.touchscreen.tap`), không chỉ `elementFromPoint` hay
   `el.click()`. Bản đồ từng trông "click được" theo `elementFromPoint` nhưng
   thực tế 0/10 ghim bấm được: hiệu ứng nghiêng chỉ kích hoạt khi chuột thật
   đi vào, và nhấn/nhả có thể rơi vào hai phần tử khác nhau.
7. Tránh `transform-style: preserve-3d` trên vùng chứa phần tử bấm được khi
   vùng đó xoay 3D: nửa lùi ra sau mặt phẳng cha bị mất sự kiện, các phần tử
   cùng mặt phẳng tranh nhau hit-test (xem TASKS.md 8.4).
8. Xoá script/ảnh tạm và tắt preview server sau khi xong.

> Script kiểm thử tạm phải đặt trong thư mục dự án (không phải scratchpad)
> thì Node mới resolve được `puppeteer-core` từ `node_modules`.

## Phong cách code

- Mặc định **không viết comment**. Chỉ viết khi lý do *tại sao* không hiển
  nhiên: một ràng buộc ẩn, một bất biến tinh tế, hoặc cách xử lý một lỗi cụ
  thể đã gặp. Không mô tả code đang làm gì.
- Không thêm lớp trừu tượng, fallback hay xử lý lỗi cho tình huống không thể
  xảy ra. Ba dòng lặp lại vẫn tốt hơn một trừu tượng hoá vội vàng.
