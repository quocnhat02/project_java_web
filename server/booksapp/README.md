# Ứng dụng Quản lý Thư viện - Máy chủ (Server)

Đây là phần backend của dự án Quản lý Thư viện, xây dựng bằng Spring Boot và Java.

## Mô tả

Cung cấp API REST cho các chức năng: quản lý sách, đơn hàng, lịch sử mượn/trả, đánh giá, nhắn tin quản trị viên, xác thực người dùng, v.v.

## Cài đặt

1. Cài đặt Java 17 trở lên.
2. Cài đặt Maven (nếu chưa có).
3. Cài đặt MySQL hoặc cấu hình database phù hợp trong `src/main/resources/application.properties`.

## Chạy ứng dụng

- Build và chạy bằng Maven:

  ```bash
  ./mvnw spring-boot:run
  ```

  hoặc

  ```bash
  mvn spring-boot:run
  ```

- Build file jar:
  ```bash
  ./mvnw clean package
  ```
  File jar sẽ nằm trong `target/`.

## Tài liệu tham khảo

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Maven](https://maven.apache.org/)

## Thông tin khác

- Cấu hình chi tiết xem trong `application.properties`.
- Tham khảo thêm các tài liệu trong file HELP.md.
