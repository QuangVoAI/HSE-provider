# Lead backend

Các form tại `/contact` và `/csms` gửi `POST /api/leads`. API lưu lead vào MongoDB trước, sau đó đồng bộ tùy chọn sang Google Sheets và gửi email qua SMTP (Gmail demo hoặc Zoho production).

## Cấu hình local

1. Sao chép `.env.example` thành `.env.local`.
2. Điền `MONGODB_URI`, `MONGODB_DB` và (tuỳ chọn) `MONGODB_COLLECTION`.
3. Tạo Google service account có quyền Editor trên spreadsheet, điền JSON một dòng vào `GOOGLE_SERVICE_ACCOUNT_JSON` và đặt `GOOGLE_SHEET_ID`/`GOOGLE_SHEET_RANGE`.
4. Điền tài khoản SMTP vào `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, cùng địa chỉ nhận lead trong `LEAD_NOTIFICATION_EMAIL`. Với Gmail, dùng App Password thay vì mật khẩu tài khoản.
5. Khởi động lại Next.js sau khi đổi biến môi trường.

API đã có kiểm tra trường bắt buộc, chuẩn hóa số điện thoại và giới hạn 5 yêu cầu mỗi IP trong 10 phút. Email/số điện thoại có thể trùng: yêu cầu mới vẫn được lưu, đồng thời trường `duplicateOf` tham chiếu lead trước đó để đội ngũ theo dõi. Nếu Google Sheets hoặc email chưa cấu hình, lead vẫn được lưu trong MongoDB và trạng thái tích hợp trả về `skipped`.

Không commit `.env.local` hoặc JSON service account vào repository.
