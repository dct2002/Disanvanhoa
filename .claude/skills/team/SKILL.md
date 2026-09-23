---
name: team
description: Chạy team agents (BA → UI/UX → dev → tester → UI/UX review → review) cho một yêu cầu tính năng hoặc sửa lỗi. Agent chính điều phối, review và báo cáo; chỉ merge khi người dùng đồng ý.
disable-model-invocation: true
---

# Team agents

Yêu cầu của người dùng: **$ARGUMENTS**

Bạn là **agent chính**: điều phối và review, không tự viết code sản phẩm. Bốn
subagent: `ba`, `ui-ux`, `dev`, `tester` (định nghĩa trong `.claude/agents/`).
Chúng không gọi được nhau — mọi thông tin đi qua bạn, nên mỗi lần giao việc phải
**chuyển đầy đủ ngữ cảnh** (đặc tả, thiết kế, tên nhánh, báo cáo của agent
trước), vì subagent không thấy cuộc trò chuyện này.

Giữ người dùng nắm tiến độ: một câu ngắn mỗi khi chuyển bước.

## Bước 0 — Chuẩn bị
1. `git fetch --prune origin`; `main` local phải trùng `origin/main` (không trùng
   ⇒ `git pull --ff-only`; nếu đang ở nhánh khác có thay đổi dở ⇒ dừng, hỏi).
2. Tạo nhánh theo quy tắc trong `CLAUDE.md` (`<loại>/<mô-tả-ngắn>`, chữ thường,
   không dấu) từ `main` mới nhất. Ghi lại tên nhánh để giao cho các agent.
3. Xác định yêu cầu **có ảnh hưởng giao diện/tương tác** không (bố cục, màu, chữ,
   trạng thái, chuyển động, cách bấm/chạm). Có ⇒ chạy các bước UI/UX (2 và 5).
   Không (ví dụ tách chunk, dữ liệu thuần, tài liệu) ⇒ bỏ qua, ghi lý do trong
   báo cáo bàn giao.

## Bước 1 — BA
Giao `ba`: yêu cầu nguyên văn của người dùng + mọi ngữ cảnh đã biết.
Review báo cáo BA:
- Tiêu chí nghiệm thu có **kiểm được** không (có số đo/phần tử/hành vi cụ thể)?
  Có đủ desktop, mobile, reduced-motion, cách tương tác thật không? Thiếu ⇒ trả
  lại BA kèm nhận xét cụ thể.
- Có **"Câu hỏi mở"** ⇒ hỏi người dùng (AskUserQuestion) **trước khi code**. Không
  đoán thay người dùng.
- Phạm vi phình to so với yêu cầu ⇒ cắt lại, hoặc hỏi người dùng.

Duyệt xong ⇒ **bạn** commit `SPEC.md` trên nhánh (BA không có quyền git, dev
không được đụng `SPEC.md`): `git add SPEC.md`, message "Đặc tả: <tóm tắt>".

## Bước 2 — UI/UX thiết kế (chỉ khi có ảnh hưởng giao diện)
Giao `ui-ux` **Việc 1**: đặc tả BA đã duyệt + tên nhánh.
Review thiết kế: cụ thể tới class/token, đủ 3 khung (390/1280/1440), đủ trạng
thái, có phương án reduced-motion, không đưa asset ngoài.
- Thiết kế mâu thuẫn với đặc tả BA ⇒ bạn quyết nếu rõ ràng đúng/sai; nếu là lựa
  chọn thẩm mỹ hoặc thay đổi hành vi ⇒ hỏi người dùng.
- Gộp **tiêu chí nghiệm thu giao diện** của UI/UX vào danh sách tiêu chí của BA —
  đây là danh sách tester sẽ kiểm.

## Bước 3 — Dev
Giao `dev`: tên nhánh + đặc tả đã duyệt (bảng tiêu chí đầy đủ) + thiết kế UI/UX
(nếu có) + ràng buộc BA nêu.
Kiểm báo cáo: đã commit trên đúng nhánh chưa (`git log main..HEAD`), lint/build
có kết quả thật không.

## Bước 4 — Tester
Giao `tester`: tên nhánh + toàn bộ tiêu chí (BA + UI/UX) + báo cáo dev (phần
"chưa chắc chắn" để tester chú ý).

## Bước 5 — UI/UX review trực quan (chỉ khi có ảnh hưởng giao diện, sau khi tester PASS)
Giao `ui-ux` **Việc 2**: tên nhánh + thiết kế đã duyệt ở bước 2 + vùng/trạng thái
bị thay đổi (theo báo cáo dev).
- **Bắt buộc sửa** ⇒ coi như FAIL, sang bước 6.
- **Nên sửa** ⇒ không chặn; liệt kê cho người dùng ở bước bàn giao để họ quyết.

## Bước 6 — Vòng sửa (tối đa 3 vòng)
Có FAIL của tester hoặc "bắt buộc sửa" của UI/UX ⇒ giao lại `dev` kèm **nguyên
văn** chi tiết lỗi ⇒ giao lại `tester` kiểm lại **toàn bộ** (sửa có thể gây hồi
quy) ⇒ nếu có ảnh hưởng giao diện, giao lại `ui-ux` review.
Mỗi lượt dev sửa tính là một vòng, kể cả lượt do bạn trả về ở bước 7.
Sau **3 vòng** vẫn còn lỗi ⇒ **dừng**, báo người dùng: còn lỗi gì, đã thử gì, đề
xuất hướng đi. Không tự nới tiêu chí để cho qua.

## Bước 7 — Review (agent chính tự làm)
Đọc `git diff main...HEAD` và tự kiểm:
- Đúng phạm vi đặc tả, không sửa lan ra ngoài.
- Tuân thủ `CLAUDE.md`: data-driven; không asset 3D ngoài; không cấp phát trong
  `useFrame`; overlay `pointer-events: none` trên `<Canvas>`; tự tắt hiệu ứng nặng
  khi mobile/reduced-motion; comment chỉ nói *tại sao*; không trừu tượng hoá thừa.
- Tái sử dụng tiện ích sẵn có thay vì viết lại; giao diện dùng token/utility của
  design system thay vì giá trị tự chế.
- `TASKS.md` đã có mục mới đúng cấu trúc; `SPEC.md` khớp với code thật.
- Commit message không có dòng `Co-Authored-By` hay ghi chú Claude/AI.
Có vấn đề ⇒ trả về dev (tính vào giới hạn vòng ở bước 6).

Chỉ khi review đạt: nhờ `ba` đánh dấu các GAP liên quan trong `SPEC.md` §8 là đã
khắc phục (nếu có), rồi bạn commit thay đổi đó.

## Bước 8 — Bàn giao
1. `git push -u origin <nhánh>` (chỉ agent chính được push).
2. Báo người dùng ngắn gọn: yêu cầu → đã làm gì, kết quả tester X/Y PASS, kết
   luận UI/UX (hoặc lý do bỏ qua), số vòng sửa, điểm review đáng chú ý, các mục
   "nên sửa" của UI/UX, lỗi phát hiện ngoài phạm vi (nếu có), link tạo PR.
3. **Không merge** vào `main` cho tới khi người dùng đồng ý. Khi được đồng ý:
   làm đúng các bước merge trong `CLAUDE.md` (fetch và so `origin/main` trước).
