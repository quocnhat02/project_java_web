# Dự án Quản lý Thư viện - Tổng hợp

Đây là dự án Quản lý Thư viện gồm hai phần chính:

- **Client (Frontend):** React + TypeScript
- **Server (Backend):** Spring Boot + Java

## 1. Mô tả tổng quan

Dự án cho phép người dùng tìm kiếm, mượn/trả sách, quản lý đơn hàng, đánh giá sách, gửi tin nhắn cho quản trị viên, xác thực người dùng, v.v. Giao diện hiện đại, API mạnh mẽ, dễ mở rộng.

## 2. Cấu trúc thư mục

```
project_java_web/
  ├── client/         # Giao diện người dùng (React)
  └── server/         # Máy chủ API (Spring Boot)
```

## 3. Hướng dẫn cài đặt & chạy

### 3.1. Client (React)

```bash
cd client
npm install
npm start
```

Truy cập [http://localhost:3000](http://localhost:3000)

### 3.2. Server (Spring Boot)

```bash
cd server/booksapp
./mvnw spring-boot:run
```

Hoặc dùng Maven nếu đã cài:

```bash
mvn spring-boot:run
```

- Cấu hình database trong `server/booksapp/src/main/resources/application.properties`.
- Yêu cầu Java 17+ và MySQL (hoặc database tương thích).

## 4. Tài liệu chi tiết

- Xem thêm hướng dẫn riêng trong:
  - `client/README.md`
  - `server/booksapp/README.md`

## 5. Thông tin liên hệ

- Quản trị viên mẫu: admin@gmail.com / nhat123@

## 6. Tài liệu tham khảo

- [React](https://reactjs.org/), [Create React App](https://github.com/facebook/create-react-app)
- [Spring Boot](https://spring.io/projects/spring-boot), [Maven](https://maven.apache.org/)
