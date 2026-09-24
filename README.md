# HSE Provider

Website marketing HSE Provider song ngữ Việt–Anh, giới thiệu hệ thống CSMS và các phân hệ Health, Safety và Environment. Website hỗ trợ responsive desktop, tablet và mobile, ảnh demo mở toàn màn hình, form tiếp nhận lead và các endpoint tích hợp MongoDB, email và Google Sheets theo cấu hình môi trường.

Production: [https://landing.1hse.vn/](https://landing.1hse.vn/)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for local development. The deployed site is [https://landing.1hse.vn/](https://landing.1hse.vn/).

## Routes

- `/` và `/csms` — Tổng quan CSMS
- `/health-management` — Quản lý sức khỏe
- `/training-management` — Quản lý huấn luyện
- `/risk-management` — Quản lý rủi ro
- `/contractor-management` — Quản lý nhà thầu
- `/chemical-management` — Quản lý hóa chất
- `/environmental-management` — Quản lý môi trường
- `/equipment-management` — Quản lý thiết bị
- `/safety-culture` — Văn hóa an toàn
- `/safety-observation` — Quan sát an toàn
- `/legal-compliance` — Đánh giá tuân thủ
- `/customers` — Khách hàng
- `/contact` — Liên hệ

Các route hỗ trợ `?lang=vi` và `?lang=en` khi có nội dung song ngữ. Sitemap và robots được cung cấp tại `/sitemap.xml` và `/robots.txt`.
