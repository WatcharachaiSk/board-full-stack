

# คู่มือการติดตั้ง Environment (Development)

- พัฒนาด้วย Next Nest PostgreSQL
- พัฒนาบน Node Version 18.20.4

## Setup Docker

### Prerequisites

- ตรวจสอบให้แน่ใจว่ามีการติดตั้ง Docker และ Docker Compose 
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

### การตั้งค่า Docker Compose

ไฟล์ Docker Compose นี้ตั้งค่าให้รัน PostgreSQL 14 ในคอนเทนเนอร์โดยมีการตั้งค่าดังนี้:
รันคำสั่งที่ root file
```bash
docker-compose up -d
```
## Setup Backend

```javascript
// เข้าไปที่ ไฟล์ Backend
cd backend/

// ติดตั้ง package
npm install

// รัน
npm run dev

// port listen on 3500
```
libraries ที่ใช้ในการพัฒนา:
-   **class-transformer**: ช่วยแปลงข้อมูลให้อยู่ในรูปแบบที่เราอยากได้ ทำให้จัดการข้อมูลได้ง่ายขึ้น
-   **class-validator**: เอาไว้ตรวจสอบข้อมูลว่าถูกต้องตามที่เรากำหนดไหม เช่น เช็คว่าฟิลด์ไหนเป็นตัวเลข ฟิลด์ไหนเป็นอีเมล
-   **lodash**: มีฟังก์ชันช่วยเหลือสารพัด เช่น จัดการอาร์เรย์ ออบเจ็กต์ และข้อมูลทั่วไปในโปรเจกต์
-   **passport-jwt**: เป็นตัวช่วยให้ระบบพิสูจน์ตัวตนด้วย JWT ใช้ร่วมกับ PassportJS
-   **passport-local**: ตัวนี้ช่วยให้เราทำระบบล็อกอินง่ายๆ ด้วยชื่อผู้ใช้และรหัสผ่าน
-   **pg**: เป็นไลบรารีสำหรับเชื่อมต่อกับฐานข้อมูล PostgreSQL โดยเฉพาะ
-   **typeorm**: เป็น ORM ที่ช่วยจัดการกับฐานข้อมูลเชิงสัมพันธ์ (พวกฐานข้อมูล SQL) โดยไม่ต้องเขียน SQL เยอะ
- **dotenv**: ใช้จัดการ environment variables โดยโหลดค่าจากไฟล์ `.env` ช่วยให้แยกคอนฟิกต่างๆ ออกจากโค้ดได้ง่าย
- **jest**: เอาไว้สำหรับเขียนเทส เพื่อให้มั่นใจว่าโค้ดทำงานถูกต้อง
- **ts-jest**: ช่วยให้ Jest รองรับ TypeScript ทำให้เขียนเทสไฟล์ `.ts` ได้
- **prettier**: ตัวจัดรูปแบบโค้ดให้อ่านง่าย สะอาดตา ตามมาตรฐานที่เรากำหนดไว้

### Testing Documentation

**AuthService** 
```bash 
npm run test -- src/auth/auth.service.spec.ts 
```
 -   **register**: ตรวจสอบว่าผู้ใช้สามารถลงทะเบียนได้สำเร็จ
-   **signIn**: ตรวจสอบว่าผู้ใช้สามารถเข้าสู่ระบบได้และรับ access token กลับมา 

**PostService** 
```bash 
npm run test -- src/post/post.service.spec.ts
```
-   **create**: ตรวจสอบว่าระบบสามารถสร้างโพสต์ใหม่ได้
-   **findAll**: ตรวจสอบว่าระบบสามารถดึงโพสต์ทั้งหมดพร้อมความสัมพันธ์ได้
-   **findOneById**: ตรวจสอบว่าระบบสามารถค้นหาโพสต์ตาม ID ได้ และกรณีที่ไม่พบโพสต์จะมีการแจ้งข้อผิดพลาด
-   **findByUserId**: ตรวจสอบว่าระบบสามารถดึงโพสต์ทั้งหมดของผู้ใช้ตาม ID ของผู้ใช้ได้
-   **update**: ตรวจสอบว่าระบบสามารถอัปเดตข้อมูลโพสต์ได้
-   **remove**: ตรวจสอบว่าระบบสามารถลบโพสต์ (soft delete) ตาม ID ได้

**CommentService** 
```bash 
npm run test -- src/comment/comment.service.spec.ts
```
-   **create**: ตรวจสอบว่าระบบสามารถสร้างคอมเมนต์ใหม่ได้
-   **findAll**: ตรวจสอบว่าระบบสามารถดึงคอมเมนต์ทั้งหมดพร้อมความสัมพันธ์ได้
-   **findOneById**: ตรวจสอบว่าระบบสามารถค้นหาคอมเมนต์ตาม ID ได้ และกรณีที่ไม่พบคอมเมนต์จะมีการแจ้งข้อผิดพลาด
-   **update**: ตรวจสอบว่าระบบสามารถอัปเดตข้อมูลคอมเมนต์ได้
-   **remove**: ตรวจสอบว่าระบบสามารถลบคอมเมนต์ (soft delete) ตาม ID ได้

**UserService** 
```bash 
npm run test -- src/user/user.service.spec.ts
```
-   **create**: ตรวจสอบว่าผู้ใช้สามารถสร้างผู้ใช้ใหม่ได้สำเร็จ
-   **checkUsernameConflict**: ตรวจสอบว่าระบบจะแจ้งข้อผิดพลาดกรณีที่ชื่อผู้ใช้ซ้ำ
-   **findByUsername**: ตรวจสอบว่าระบบสามารถค้นหาผู้ใช้ตามชื่อผู้ใช้ได้ และกรณีที่ไม่พบจะส่ง `undefined`
-   **findById**: ตรวจสอบว่าระบบสามารถค้นหาผู้ใช้ตาม ID ได้ และกรณีที่ไม่พบจะมีการแจ้งข้อผิดพลาด


### Project Structure

```plaintext
backend/
├── src/                              # ไฟล์โค้ดหลักของโปรเจกต์ Backend
│   ├── auth/                         # โมดูลการยืนยันตัวตน (Authentication)
│   │   ├── dto/                      # Data Transfer Object สำหรับ auth
│   │   ├── auth.controller.ts        # ควบคุมการทำงานของ auth (Controller)
│   │   ├── auth.guard.ts             # Guard สำหรับการยืนยันตัวตน
│   │   ├── auth.module.ts            # โมดูลสำหรับ auth
│   │   ├── auth.service.spec.ts      # เทสสำหรับ service ของ auth
│   │   └── auth.service.ts           # บริการจัดการ logic สำหรับ auth
│   │
│   ├── base/                         # โฟลเดอร์สำหรับ Entity พื้นฐาน
│   │   └── base.entity.ts            # Entity พื้นฐานที่ใช้ร่วมกัน
│   │
│   ├── comment/                      # โมดูลจัดการคอมเมนต์
│   │   ├── dto/                      # Data Transfer Object สำหรับ comment
│   │   ├── entities/                 # Entity ของ comment
│   │   ├── comment.controller.ts     # ควบคุมการทำงานของ comment (Controller)
│   │   ├── comment.module.ts         # โมดูลสำหรับ comment
│   │   ├── comment.service.spec.ts   # เทสสำหรับ service ของ comment
│   │   └── comment.service.ts        # บริการจัดการ logic สำหรับ comment
│   │
│   ├── community/                    # โมดูลจัดการ community
│   │   ├── entities/                 # Entity ของ community
│   │   ├── community.controller.ts   # ควบคุมการทำงานของ community (Controller)
│   │   ├── community.module.ts       # โมดูลสำหรับ community
│   │   └── community.service.ts      # บริการจัดการ logic สำหรับ community
│   │
│   ├── constant/                     # โฟลเดอร์สำหรับค่าคงที่
│   │   └── jwtConstants.ts           # ค่าคงที่สำหรับการยืนยันตัวตนด้วย JWT
│   │
│   ├── dto/                          # Data Transfer Object สำหรับ Response ทั่วไป
│   │   └── Response.dto.ts           # DTO สำหรับ Response ทั่วไป
│   │
│   ├── init-data/                    # โมดูลสำหรับการตั้งค่าและข้อมูลเริ่มต้น
│   │   ├── init-data.module.ts       # โมดูลสำหรับการตั้งค่าข้อมูลเริ่มต้น
│   │   └── init-data.service.ts      # บริการสำหรับการตั้งค่าข้อมูลเริ่มต้น
│   │
│   ├── post/                         # โมดูลจัดการโพสต์
│   │   ├── dto/                      # Data Transfer Object สำหรับ post
│   │   ├── entities/                 # Entity ของ post
│   │   ├── post.controller.ts        # ควบคุมการทำงานของ post (Controller)
│   │   ├── post.module.ts            # โมดูลสำหรับ post
│   │   ├── post.service.spec.ts      # เทสสำหรับ service ของ post
│   │   └── post.service.ts           # บริการจัดการ logic สำหรับ post
│   │
│   ├── user/                         # โมดูลจัดการผู้ใช้
│   │   ├── dto/                      # Data Transfer Object สำหรับ user
│   │   ├── entities/                 # Entity ของ user
│   │   ├── user.controller.ts        # ควบคุมการทำงานของ user (Controller)
│   │   ├── user.decorator.ts         # Decorator สำหรับ user
│   │   ├── user.module.ts            # โมดูลสำหรับ user
│   │   ├── user.service.spec.ts      # เทสสำหรับ service ของ user
│   │   └── user.service.ts           # บริการจัดการ logic สำหรับ user
│   │
│   ├── app.controller.ts             # ควบคุมการทำงานของแอปหลัก
│   ├── app.module.ts                 # โมดูลหลักของแอป
│   ├── app.service.ts                # บริการหลักของแอป
│   └── main.ts                       # Entry point ของแอปพลิเคชัน
│
├── test/                             # ไฟล์และโฟลเดอร์สำหรับการทดสอบ (ไม่แสดงในภาพ)
├── .env                              # ไฟล์สำหรับ Environment Variables
├── jest.config.js                    # การตั้งค่าสำหรับการทดสอบโดยใช้ Jest
├── nest-cli.json                     # การตั้งค่าสำหรับ Nest CLI
├── package.json                      # ข้อมูลและไลบรารีที่ใช้ในโปรเจกต์
├── tsconfig.build.json               # การตั้งค่า TypeScript สำหรับการ build
└── tsconfig.json                     # การตั้งค่า TypeScript สำหรับโปรเจกต์

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

เอกสารนี้ให้ภาพรวมของโครงสร้างฐานข้อมูลที่ใช้ในโปรเจกต์ ซึ่งประกอบไปด้วย 4 ตารางหลัก ได้แก่ `User`, `Post`, `Community`, และ `Comment` แต่ละตารางและความสัมพันธ์อธิบายดังนี้

## ตาราง

### ตาราง User
ตาราง `User` ใช้เก็บข้อมูลของผู้ใช้ในแอปพลิเคชัน

| คอลัมน์      | ชนิดข้อมูล     | คำอธิบาย                                |
|--------------|----------------|------------------------------------------|
| id           | SERIAL (PK)    | รหัสเฉพาะของผู้ใช้แต่ละคน              |
| username     | VARCHAR(255)   | ชื่อผู้ใช้                               |
| created_at   | TIMESTAMP      | วันที่และเวลาที่สร้างผู้ใช้              |
| updated_at   | TIMESTAMP      | วันที่และเวลาที่อัปเดตล่าสุด             |
| deleted_at   | TIMESTAMP      | วันที่และเวลาที่ลบผู้ใช้                 |

---

### ตาราง Post
ตาราง `Post` ใช้เก็บข้อมูลโพสต์ที่สร้างโดยผู้ใช้

| คอลัมน์       | ชนิดข้อมูล     | คำอธิบาย                                |
|---------------|----------------|------------------------------------------|
| id            | SERIAL (PK)    | รหัสเฉพาะของโพสต์แต่ละรายการ            |
| user_id       | INT (FK)       | อ้างอิง `user_id` ในตาราง `User` แสดงถึงผู้เขียนโพสต์ |
| community_id  | INT (FK)       | อ้างอิง `community_id` ในตาราง `Community` แสดงถึงชุมชนที่โพสต์ถูกสร้างขึ้น |
| title         | VARCHAR(255)   | หัวข้อของโพสต์                          |
| content       | TEXT           | เนื้อหาของโพสต์                         |
| created_at    | TIMESTAMP      | วันที่และเวลาที่สร้างโพสต์               |
| updated_at    | TIMESTAMP      | วันที่และเวลาที่อัปเดตโพสต์ล่าสุด       |
| deleted_at    | TIMESTAMP      | วันที่และเวลาที่ลบโพสต์                  |

---

### ตาราง Community
ตาราง `Community` ใช้เก็บข้อมูลเกี่ยวกับชุมชนหรือกลุ่มต่างๆ ในแอปพลิเคชัน

| คอลัมน์      | ชนิดข้อมูล     | คำอธิบาย                                |
|--------------|----------------|------------------------------------------|
| id           | SERIAL (PK)    | รหัสเฉพาะของแต่ละชุมชน                  |
| title        | VARCHAR(255)   | ชื่อหรือหัวข้อของชุมชน                   |
| created_at   | TIMESTAMP      | วันที่และเวลาที่สร้างชุมชน               |
| updated_at   | TIMESTAMP      | วันที่และเวลาที่อัปเดตล่าสุดของชุมชน     |
| deleted_at   | TIMESTAMP      | วันที่และเวลาที่ลบชุมชน                  |

---

### ตาราง Comment
ตาราง `Comment` ใช้เก็บข้อมูลคอมเมนต์ที่ผู้ใช้โพสต์ลงในโพสต์ต่างๆ

| คอลัมน์      | ชนิดข้อมูล     | คำอธิบาย                                |
|--------------|----------------|------------------------------------------|
| id           | SERIAL (PK)    | รหัสเฉพาะของแต่ละคอมเมนต์              |
| post_id      | INT (FK)       | อ้างอิง `post_id` ในตาราง `Post` แสดงถึงโพสต์ที่คอมเมนต์เกี่ยวข้องกับ |
| user_id      | INT (FK)       | อ้างอิง `user_id` ในตาราง `User` แสดงถึงผู้เขียนคอมเมนต์ |
| content      | TEXT           | เนื้อหาของคอมเมนต์                      |
| created_at   | TIMESTAMP      | วันที่และเวลาที่สร้างคอมเมนต์           |
| updated_at   | TIMESTAMP      | วันที่และเวลาที่อัปเดตคอมเมนต์ล่าสุด    |
| deleted_at   | TIMESTAMP      | วันที่และเวลาที่ลบคอมเมนต์              |

## ความสัมพันธ์ระหว่างตาราง

- **User to Post**: ความสัมพันธ์แบบ One-to-Many เนื่องจากผู้ใช้คนหนึ่งสามารถสร้างโพสต์ได้หลายโพสต์
- **User to Comment**: ความสัมพันธ์แบบ One-to-Many เนื่องจากผู้ใช้คนหนึ่งสามารถสร้างคอมเมนต์ได้หลายคอมเมนต์
- **Community to Post**: ความสัมพันธ์แบบ One-to-Many เนื่องจากชุมชนหนึ่งสามารถมีหลายโพสต์
- **Post to Comment**: ความสัมพันธ์แบบ One-to-Many เนื่องจากโพสต์หนึ่งสามารถมีหลายคอมเมนต์
