# Danh sách tính năng cần bổ sung — Hoàn thiện dự án

> Tổng quan 2 project: `scan-now-nextjs` (Admin Portal) + `scan-now-customer` (Customer App & Owner/Manager/Staff/Kitchen Portal)
> Mức độ hiện tại: ~65%

---

## I. Customer App (scan-now-customer)

### 1. Cashier Role — ⭐ ƯU TIÊN CAO NHẤT

Hiện tại hoàn toàn chưa có. Cần xây dựng:

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 1.1 | Định nghĩa role `CASHIER` | Thêm vào enum `UserRole` trong types |
| 1.2 | Auth guard + redirect | Cashier login → `/cashier/dashboard` |
| 1.3 | Tìm kiếm bàn / session | Nhập số bàn hoặc session code → xem order |
| 1.4 | Chọn phương thức thanh toán | Tiền mặt / PayOS |
| 1.5 | In hóa đơn (Receipt) | Xuất hóa đơn tạm tính / đã thanh toán (nếu có máy in). Hóa đơn hiển thị đầy đủ: tên quán, logo, địa chỉ, hotline, danh sách món (tên, SL, đơn giá, thành tiền), VAT, service charge, tổng cộng, mã QR PayOS để khách quét thanh toán |
| 1.6 | Lịch sử giao dịch | Xem các hóa đơn đã thanh toán trong ca |

### 2. Reports / Statistics — ⭐ ƯU TIÊN CAO

Hoàn toàn chưa có. Cần xây dựng:

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 2.1 | Dashboard tổng quan (Owner) | Biểu đồ doanh thu hôm nay / tuần / tháng |
| 2.2 | Doanh thu theo ngày | Chi tiết từng ngày, so sánh với kỳ trước |
| 2.3 | Top món bán chạy | Best-selling items theo khoảng thời gian |
| 2.4 | Giờ cao điểm (Peak hours) | Phân tích lượng order theo khung giờ |
| 2.5 | Báo cáo theo chi nhánh | So sánh doanh thu giữa các branch |
| 2.6 | Báo cáo thu ngân (Cashier report) | Tổng kết ca làm việc của thu ngân |
| 2.7 | Export Excel / PDF | Xuất báo cáo dưới dạng file |

### 3. Manager — Orders page

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 3.1 | Route `/manager/orders` | Đã có link sidebar nhưng chưa có page |
| 3.2 | Danh sách order tất cả bàn | Xem order real-time, lọc theo trạng thái |
| 3.3 | Chi tiết + thao tác | Xác nhận, hủy, sửa order |

### 4. Payment Config — Theo chi nhánh

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 4.1 | Bảng cấu hình thanh toán | Mỗi chi nhánh có 1 config riêng (PayOS API key, secret, checksum key) |
| 4.2 | Owner cài đặt PayOS | Trang settings → nhập PayOS credentials cho từng branch |
| 4.3 | Chỉ hỗ trợ 2 phương thức | **Tiền mặt** (CASH) và **PayOS** (QR thanh toán) |
| 4.4 | Mặc định CASH | Nếu chưa config PayOS, chỉ cho phép thanh toán tiền mặt |

### 5. Voucher (Giấy) — Thay thế Loyalty & Discount

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 5.1 | Tạo loại voucher | Owner tạo các loại voucher: giảm % / giảm tiền mặt / tặng món |
| 5.2 | Mã voucher vật lý | Sinh mã QR cho từng voucher (in ra giấy, phát cho khách) |
| 5.3 | Áp dụng voucher | Nhập mã / quét QR khi thanh toán → kiểm tra hợp lệ → áp dụng |
| 5.4 | Quản lý voucher đã dùng | Đánh dấu đã sử dụng, xem lịch sử |

### 6. Settings pages

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 6.1 | `/owner/settings` | Cấu hình thông tin nhà hàng, logo, giờ mở cửa, PayOS config |
| 6.2 | `/manager/settings` | Cấu hình chi nhánh, VAT, service charge |

### 7. Dashboard placeholders (cần hoàn thiện)

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 7.1 | `/admin/dashboard` | Admin — thống kê toàn nền tảng (users, restaurants, orders) |
| 7.2 | `/staff/dashboard` | Staff — danh sách bàn cần phục vụ, order mới |
| 7.3 | `/kitchen/dashboard` | Kitchen — tích hợp real-time order queue (hiện đang ở `/me/branches/[id]/kitchen`) |

### 8. Responsive Mobile — ⭐ Chuẩn hóa giao diện

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 8.1 | Customer App mobile-first | Tối ưu toàn bộ luồng QR → menu → cart → order → thanh toán trên mobile, đảm bảo thao tác 1 tay dễ dàng |
| 8.2 | Staff Portal mobile | Giao diện phục vụ / thu ngân chạy mượt trên điện thoại — ưu tiên touch-friendly, buttons to, spacing hợp lý |
| 8.3 | Manager Portal mobile | Dashboard, orders, settings responsive — quản lý từ xa bằng điện thoại |
| 8.4 | Bottom navigation | Dùng bottom nav thay sidebar trên mobile cho staff/customer |

### 9. Tính năng phụ trợ khác

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 9.1 | Đặt bàn trước (Reservation) | Khách đặt bàn online trước khi đến |
| 9.2 | Feedback / Review | Khách đánh giá sau khi dùng bữa |

---

## II. Admin Portal (scan-now-nextjs)

### 10. Super Admin Dashboard — Dashboard tổng quan có chart minh họa

| STT | Chức năng | Mô tả |
|-----|-----------|-------|
| 10.1 | Dashboard tổng quan | Biểu đồ (chart) trực quan: tổng users, restaurants, branches, orders toàn hệ thống |
| 10.2 | Platform growth | Biểu đồ đường / cột: số lượng nhà hàng mới, user mới theo tháng |
| 10.3 | Revenue chart | Biểu đồ doanh thu nền tảng theo thời gian (ngày / tuần / tháng) |

---

## Tổng kết ưu tiên theo phase

| Phase | Nội dung | Target % |
|-------|----------|----------|
| **Phase 1** 🔥 | Cashier role (full flow) + Reports (Owner dashboard) | → 80% |
| **Phase 2** | Manager missing pages (Orders, Settings) + Payment Config + Voucher | → 92% |
| **Phase 3** | Admin Dashboard (chart) + Reservation + Feedback | → 100% | 