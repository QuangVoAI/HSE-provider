# Lead backend

Các form tại `/contact` và `/csms` gửi `POST /api/leads`. API lưu lead vào MongoDB trước, sau đó đồng bộ tùy chọn sang Google Sheets và gửi email qua SMTP (Gmail demo hoặc Zoho production).

## Cấu hình local

1. Sao chép `.env.example` thành `.env.local`.
2. Điền `MONGODB_URI`, `MONGODB_DB` và (tuỳ chọn) `MONGODB_COLLECTION`.
3. Tạo Google service account có quyền Editor trên spreadsheet, điền JSON một dòng vào `GOOGLE_SERVICE_ACCOUNT_JSON` và đặt `GOOGLE_SHEET_ID`/`GOOGLE_SHEET_RANGE`.
4. Điền tài khoản SMTP vào `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, cùng địa chỉ nhận lead trong `LEAD_NOTIFICATION_EMAIL`. Với Gmail, dùng App Password thay vì mật khẩu tài khoản.
5. Khởi động lại Next.js sau khi đổi biến môi trường.

API đã có kiểm tra trường bắt buộc, chuẩn hóa số điện thoại và giới hạn 5 yêu cầu mỗi IP trong 10 phút. Email/số điện thoại có thể trùng: yêu cầu mới vẫn được lưu, đồng thời trường `duplicateOf` tham chiếu lead trước đó để đội ngũ theo dõi. Nếu Google Sheets hoặc email chưa cấu hình, lead vẫn được lưu trong MongoDB và trạng thái tích hợp trả về `skipped`.

## Quy trình xử lý lead

Cột J (`Trạng thái`) trong sheet là nguồn trạng thái vận hành. Hệ thống tự gán `Mới` cho lead mới và thêm danh sách chọn gồm: `Mới`, `Đã liên hệ`, `Đã đặt lịch`, `Báo giá`, `Thành công`, `Không phù hợp`.

Trên Vercel, thêm biến môi trường `CRON_SECRET` bằng một chuỗi ngẫu nhiên dài. Cron chạy lúc 08:00 giờ Việt Nam mỗi ngày, đồng bộ trạng thái từ Google Sheets sang MongoDB và gửi email nhắc tới `LEAD_NOTIFICATION_EMAIL` cho những lead vẫn ở `Mới` sau 24 giờ. Có thể thay đổi thời hạn qua `LEAD_REMINDER_AFTER_HOURS` và nhịp nhắc qua `LEAD_REMINDER_REPEAT_HOURS`.

Khi cột J được đổi sang bất kỳ trạng thái nào ngoài `Mới`, lead đó sẽ không nhận email nhắc tiếp theo.

Không commit `.env.local` hoặc JSON service account vào repository.
