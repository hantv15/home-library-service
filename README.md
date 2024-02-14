<div>

## Giới thiệu

Project theo đề test thiết kế Rest Service về Home Library Service.
Sơ đồ thiết kế database: https://drive.google.com/file/d/1MZ9UIvl5TWkTKxq6QPnbMhRa6MNBaTys/view?usp=sharing

## Cài đặt

#### Yêu cầu môi trường

| Technology      | Version |
| --------------- | ------- |
| Docker          | \*      |
| Docker Compose  | \*      |
| Node            | LTS     |
| Yarn (tùy chọn) | 1^      |

### API

Sau cài đặt môi trường xong, mở project tạo file .env từ file mẫu .env.example theo command sau:

```bash
cp .env.example .env
```

Khởi tạo database với Docker Compose

```bash
docker compose up -d
```

Thông số kết nối database

| MySQL    | Value                         |
| -------- | ----------------------------- |
| Host     | localhost                     |
| Port     | 3306                          |
| Username | admin                         |
| Password | 6B939D5671BB8F1EE1184B7A45F87 |
| Database | home-library                  |

Tất cả các thông số trên đều dựa vào file .env

Cài đặt dependencies cho project

```bash
npm install
```

Hoặc

```bash
yarn install
```

Start API

```bash
npm run start:dev
```

Hoặc

```bash
yarn start:dev
```

API sẽ chạy trên http://localhost:4000/v1/api
Open API swagger sẽ chạy trên http://localhost:4000/v1/api/doc

### Migration Database

Chạy command sau để migration database:

```bash
npm run migrate:up
```

Hoặc

```bash
yarn migrate:up
```

### Seed Database

Chạy command sau để migration database:

```bash
npm run seed:up
```

Hoặc

```bash
yarn seed:up
```

</div>
