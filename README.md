
# คู่มือการติดตั้ง Environment (Development)

- พัฒนาด้วย Next Nest PostgreSQL
- พัฒนาบน Node Version 18.19.0

#### Setup Docker



## Docker Setup for Project

This README provides instructions to set up and run the PostgreSQL database using Docker. This setup uses a Docker Compose file to initialize and manage the PostgreSQL container for the project in a development environment.

## Prerequisites

- Ensure that Docker and Docker Compose are installed on your system.
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

## Docker Compose Configuration

The Docker Compose file is configured to set up a PostgreSQL 14 container with the following settings:

### `docker-compose.yml` Configuration
Run command on root file

```bash
docker-compose up -d
```


#### Setup front-end

```javascript
// เข้าไปที่ ไฟล์ front-end
cd frontend/

// ติดตั้ง package
npm install

// รัน
npm run dev

// port listen on 3000
```

#### Setup back-end

```javascript
// เข้าไปที่ ไฟล์ back-end
cd backend/

// ติดตั้ง package
npm install

// รัน
npm run dev

// port listen on 3500
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

## Relationships

- **User to Post**: One-to-Many relationship, as one user can create multiple posts.
- **User to Comment**: One-to-Many relationship, as one user can create multiple comments.
- **Community to Post**: One-to-Many relationship, as one community can have multiple posts.
- **Post to Comment**: One-to-Many relationship, as one post can have multiple comments.

