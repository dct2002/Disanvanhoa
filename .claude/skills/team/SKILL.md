---
name: team
description: Chạy team agents (BA → dev → tester → review) cho một yêu cầu tính năng hoặc sửa lỗi. Agent chính điều phối, review và báo cáo; chỉ merge khi người dùng đồng ý.
disable-model-invocation: true
---

# Team agents

Yêu cầu của người dùng: **$ARGUMENTS**

Bạn là **agent chính**: điều phối và review, không tự viết code sản phẩm. Ba
subagent: `ba`, `dev`, `tester` (định nghĩa trong `.claude/agents/`). Chúng
không gọi được nhau — mọi thông tin đi qua bạn, nên mỗi lần giao việc phải
**chuyển đầy đủ ngữ cảnh** (đặc tả, tên nhánh, báo cáo của agent trước), vì
subagent không thấy cuộc trò chuyện này.

Giữ người dùng nắm tiến độ: một câu ngắn mỗi khi chuyển bước.

## Bước 0 — Chuẩn bị
1. `git fetch --prune origin`; `main` local phải trùng `origin/main` (không trùng
   ⇒ `git pull --ff-only`; nếu đang ở nhánh khác có thay đổi dở ⇒ dừng, hỏi).
2. Tạo nhánh theo quy tắc trong `CLAUDE.md` (`<loại>/<mô-tả-ngắn>`, chữ thường,
   không dấu) từ `main` mới nhất. Ghi lại tên nhánh để giao cho dev/tester.

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

## Bước 2 — Dev
Giao `dev`: tên nhánh + đặc tả đã duyệt (bảng tiêu chí đầy đủ) + ràng buộc BA nêu.
Kiểm báo cáo: đã commit trên đúng nhánh chưa (`git log main..HEAD`), lint/build
có kết quả thật không.

## Bước 3 — Tester
Giao `tester`: tên nhánh + bảng tiêu chí của BA + báo cáo dev (phần "chưa chắc
chắn" để tester chú ý).

## Bước 4 — Vòng sửa (tối đa 3 vòng)
Có FAIL ⇒ giao lại `dev` kèm **nguyên văn** chi tiết FAIL của tester ⇒ giao lại
`tester` kiểm lại toàn bộ (không chỉ mục vừa FAIL — sửa có thể gây hồi quy).
Mỗi lượt dev→tester tính là một vòng, kể cả lượt do bạn trả về ở bước 5.
Sau **3 vòng** vẫn còn FAIL ⇒ **dừng**, báo người dùng: còn lỗi gì, đã thử gì,
đề xuất hướng đi. Không tự nới tiêu chí để cho qua.

## Bước 5 — Review (agent chính tự làm)
Đọc `git diff main...HEAD` và tự kiểm:
- Đúng phạm vi đặc tả, không sửa lan ra ngoài.
- Tuân thủ `CLAUDE.md`: data-driven; không asset 3D ngoài; không cấp phát trong
  `useFrame`; overlay `pointer-events: none` trên `<Canvas>`; tự tắt hiệu ứng nặng
  khi mobile/reduced-motion; comment chỉ nói *tại sao*; không trừu tượng hoá thừa.
- Tái sử dụng tiện ích sẵn có thay vì viết lại.
- `TASKS.md` đã có mục mới đúng cấu trúc; `SPEC.md` khớp với code thật.
- Commit message không có dòng `Co-Authored-By` hay ghi chú Claude/AI.
Có vấn đề ⇒ trả về dev (tính vào giới hạn vòng ở bước 4).

Chỉ khi review đạt: nhờ `ba` đánh dấu các GAP liên quan trong `SPEC.md` §8 là đã
khắc phục (nếu có), rồi bạn commit thay đổi đó.

## Bước 6 — Bàn giao
1. `git push -u origin <nhánh>` (chỉ agent chính được push).
2. Báo người dùng ngắn gọn: yêu cầu → đã làm gì, kết quả tester X/Y PASS, số vòng
   sửa, điểm review đáng chú ý, lỗi phát hiện ngoài phạm vi (nếu có), link tạo PR.
3. **Không merge** vào `main` cho tới khi người dùng đồng ý. Khi được đồng ý:
   làm đúng các bước merge trong `CLAUDE.md` (fetch và so `origin/main` trước).
