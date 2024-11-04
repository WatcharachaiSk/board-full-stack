

# คู่มือการติดตั้ง Environment (Development)

- พัฒนาด้วย Next Nest PostgreSQL
- พัฒนาบน Node Version 18.19.0

## Setup Docker

This README provides instructions to set up and run the PostgreSQL database using Docker. This setup uses a Docker Compose file to initialize and manage the PostgreSQL container for the project in a development environment.

### Prerequisites

- Ensure that Docker and Docker Compose are installed on your system.
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

### Docker Compose Configuration

The Docker Compose file is configured to set up a PostgreSQL 14 container with the following settings:

### `docker-compose.yml` Configuration
Run command on root file

```bash
docker-compose up -d
```
## Setup Backend

```javascript
// เข้าไปที่ ไฟล์ back-end
cd backend/

// ติดตั้ง package
npm install

// รัน
npm run dev

// port listen on 3500
```

## Setup Frontend

```javascript
// เข้าไปที่ ไฟล์ Frontend
cd frontend/

// ติดตั้ง package
npm install

// รัน
npm run dev

// port listen on 3000
```
libraries ที่ใช้ในการพัฒนา:
-   **axios**: สำหรับการเรียก HTTP ไปยัง API ฝั่ง backend
-   **next**: เฟรมเวิร์ก React ที่ใช้ในการสร้างแอปพลิเคชัน
-   **react** & **react-dom**: ไลบรารีหลักสำหรับสร้าง UI
-   **react-icons**: ให้ไอคอนที่ใช้ใน UI ได้สะดวก
-   **sweetalert2**: สำหรับแสดงข้อความแจ้งเตือนด้วย UI ที่ดีขึ้น
-   **zustand**: ไลบรารีจัดการสถานะที่มีขนาดเล็กและรวดเร็วสำหรับ React
-   **@types/react** & **@types/react-dom**: ไทป์สำหรับ React และ React DOM
-   **postcss**: เครื่องมือสำหรับแปลง CSS ด้วยปลั๊กอิน
-   **tailwindcss**: เฟรมเวิร์ก CSS ที่เน้นการใช้งานแบบ utility-first
-   **typescript**: เพื่อเพิ่มไทป์ใน JavaScript เพื่อให้โค้ดมีคุณภาพและการบำรุงรักษาที่ดีขึ้น

### Project Structure

```plaintext
frontend/
├── public/                    # ไฟล์ Static เช่น รูปภาพ ไอคอน ฯลฯ
└── src/                       # ไฟล์โค้ดหลักของโปรเจกต์ Frontend
    ├── app/                   # โฟลเดอร์ app ของ Next.js (โครงสร้างเพจและเลย์เอาต์)
    │   ├── fonts/             # ไฟล์ฟอนต์
    │   ├── login/             # โฟลเดอร์เพจ Login
    │   ├── our-blog/          # โฟลเดอร์เพจ Blog
    │   ├── post-details/[id]/ # โฟลเดอร์เพจแสดงรายละเอียดโพสต์โดยอิงจาก id
    │   ├── favicon.ico        # Favicon ของแอปพลิเคชัน
    │   ├── globals.css        # CSS ทั่วไปสำหรับแอปพลิเคชัน
    │   ├── layout.tsx         # เลย์เอาต์หลักของแอปพลิเคชัน
    │   └── page.tsx           # หน้าแรกของแอปพลิเคชัน
    │
    ├── components/            # คอมโพเนนต์ React ที่นำกลับมาใช้ได้
    │   ├── modal/             # คอมโพเนนต์ที่เกี่ยวข้องกับ modal
    │   ├── sweetalert2/       # คอมโพเนนต์ที่ใช้ SweetAlert2 สำหรับการแจ้งเตือน
    │   ├── AuthStatus.tsx     # คอมโพเนนต์สำหรับแสดงสถานะการเข้าสู่ระบบ
    │   ├── ClientWrapper.tsx  # คอมโพเนนต์สำหรับห่อด้วย client-side logic
    │   ├── CommunityDropdown.tsx # คอมโพเนนต์ dropdown สำหรับเลือก community
    │   ├── Navbar.tsx         # คอมโพเนนต์ navigation bar
    │   ├── Post.tsx           # คอมโพเนนต์สำหรับแสดงโพสต์
    │   ├── SearchCreate.tsx   # คอมโพเนนต์สำหรับค้นหาและสร้างโพสต์
    │   └── Sidebar.tsx        # คอมโพเนนต์ sidebar
    │
    ├── constants/             # ค่าคงที่ที่ใช้ทั่วทั้งแอปพลิเคชัน
    │   └── apiPaths.ts        # ค่าคงที่ของ API paths
    │
    ├── mock/                  # ข้อมูลจำลองสำหรับการทดสอบและพัฒนา
    │   └── mockupdata.ts      # ตัวอย่างข้อมูลจำลอง
    │
    ├── routers/               # การตั้งค่า routing
    │   └── routers.ts         # การตั้งค่า routing สำหรับแอปพลิเคชัน
    │
    ├── services/              # บริการที่ใช้เรียก API และจัดการสถานะ
    │   ├── api/               # บริการที่เกี่ยวกับ API
    │   └── store/             # Zustand store สำหรับจัดการสถานะ
    │
    └── utils/                 # ฟังก์ชันและตัวช่วยต่างๆ
        └── apiHelpers.ts      # ฟังก์ชันตัวช่วยสำหรับจัดการ API
```


## Database Schema Documentation

This README provides an overview of the database schema used in this project. The schema consists of four main tables: `User`, `Post`, `Community`, and `Comment`. Each table and its relationships are described below.

## Tables

### User
The `User` table stores information about users of the application.

| Column     | Type         | Description            |
|------------|--------------|------------------------|
| id    | SERIAL (PK)  | Unique identifier for each user. |
| username   | VARCHAR(255) | The username of the user.        |
| created_at | TIMESTAMP    | The date and time when the user was created. |

---

### Post
The `Post` table stores information about posts created by users.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id     | SERIAL (PK)  | Unique identifier for each post. |
| user_id     | INT (FK)     | References `user_id` in `User` table, indicating the author of the post. |
| community_id | INT (FK)    | References `community_id` in `Community` table, indicating the community where the post was made. |
| title       | VARCHAR(255) | The title of the post.        |
| content     | TEXT         | The content of the post.      |
| created_at  | TIMESTAMP    | The date and time when the post was created. |
| updated_at  | TIMESTAMP    | The date and time when the post was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the post was deleted. |

---

### Community
The `Community` table stores information about different communities or groups in the application.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id| SERIAL (PK)  | Unique identifier for each community. |
| title       | VARCHAR(255) | The name or title of the community. |
| created_at  | TIMESTAMP    | The date and time when the community was created. |
| updated_at  | TIMESTAMP    | The date and time when the community was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the community was deleted. |

---

### Comment
The `Comment` table stores information about comments made by users on posts.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id  | SERIAL (PK)  | Unique identifier for each comment. |
| post_id     | INT (FK)     | References `post_id` in `Post` table, indicating the post the comment is associated with. |
| user_id     | INT (FK)     | References `user_id` in `User` table, indicating the author of the comment. |
| content     | TEXT         | The content of the comment.   |
| created_at  | TIMESTAMP    | The date and time when the comment was created. |
| updated_at  | TIMESTAMP    | The date and time when the comment was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the comment was deleted. |

### Relationships
- **User to Post**: One-to-Many relationship, as one user can create multiple posts.
- **User to Comment**: One-to-Many relationship, as one user can create multiple comments.
- **Community to Post**: One-to-Many relationship, as one community can have multiple posts.
- **Post to Comment**: One-to-Many relationship, as one post can have multiple comments.

## Database Schema Documentation

This README provides an overview of the database schema used in this project. The schema consists of four main tables: `User`, `Post`, `Community`, and `Comment`. Each table and its relationships are described below.

## Tables

### User
The `User` table stores information about users of the application.

| Column     | Type         | Description            |
|------------|--------------|------------------------|
| id    | SERIAL (PK)  | Unique identifier for each user. |
| username   | VARCHAR(255) | The username of the user.        |
| created_at | TIMESTAMP    | The date and time when the user was created. |

---

### Post
The `Post` table stores information about posts created by users.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id     | SERIAL (PK)  | Unique identifier for each post. |
| user_id     | INT (FK)     | References `user_id` in `User` table, indicating the author of the post. |
| community_id | INT (FK)    | References `community_id` in `Community` table, indicating the community where the post was made. |
| title       | VARCHAR(255) | The title of the post.        |
| content     | TEXT         | The content of the post.      |
| created_at  | TIMESTAMP    | The date and time when the post was created. |
| updated_at  | TIMESTAMP    | The date and time when the post was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the post was deleted. |

---

### Community
The `Community` table stores information about different communities or groups in the application.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id| SERIAL (PK)  | Unique identifier for each community. |
| title       | VARCHAR(255) | The name or title of the community. |
| created_at  | TIMESTAMP    | The date and time when the community was created. |
| updated_at  | TIMESTAMP    | The date and time when the community was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the community was deleted. |

---

### Comment
The `Comment` table stores information about comments made by users on posts.

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id  | SERIAL (PK)  | Unique identifier for each comment. |
| post_id     | INT (FK)     | References `post_id` in `Post` table, indicating the post the comment is associated with. |
| user_id     | INT (FK)     | References `user_id` in `User` table, indicating the author of the comment. |
| content     | TEXT         | The content of the comment.   |
| created_at  | TIMESTAMP    | The date and time when the comment was created. |
| updated_at  | TIMESTAMP    | The date and time when the comment was last updated. |
| deleted_at  | TIMESTAMP    | The date and time when the comment was deleted. |

### Relationships
- **User to Post**: One-to-Many relationship, as one user can create multiple posts.
- **User to Comment**: One-to-Many relationship, as one user can create multiple comments.
- **Community to Post**: One-to-Many relationship, as one community can have multiple posts.
- **Post to Comment**: One-to-Many relationship, as one post can have multiple comments.

