
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
This project uses the following libraries for efficient development and modern user experience:

-   **axios**: For making HTTP requests to the backend API.
-   **next**: The React framework used to build the application.
-   **react** & **react-dom**: Core libraries for building the user interface.
-   **react-icons**: Provides a collection of popular icons for easy UI integration.
-   **sweetalert2**: For displaying alerts with better UI/UX.
-   **zustand**: A small, fast, and scalable state management library for React.
-   **@types/react** & **@types/react-dom**: Type definitions for React and React DOM.
-   **postcss**: A tool for transforming CSS with plugins.
-   **tailwindcss**: A utility-first CSS framework for styling.
-   **typescript**: For adding static types to JavaScript, ensuring better code quality and maintainability.

### Project Structure

```plaintext
frontend/
├── public/                    # Static assets like images, icons, etc.
└── src/                       # Source files for the frontend application
    ├── app/                   # Next.js app directory (pages and layout structure)
    │   ├── fonts/             # Fonts directory
    │   ├── login/             # Login page directory
    │   ├── our-blog/          # Blog page directory
    │   ├── post-details/[id]/ # Dynamic post details page based on id
    │   ├── favicon.ico        # Favicon for the application
    │   ├── globals.css        # Global CSS styles
    │   ├── layout.tsx         # Main layout file for the application
    │   └── page.tsx           # Main page of the application
    │
    ├── components/            # Reusable React components
    │   ├── modal/             # Modal-related components
    │   ├── sweetalert2/       # Components utilizing SweetAlert2 for alerts
    │   ├── AuthStatus.tsx     # Component for displaying authentication status
    │   ├── ClientWrapper.tsx  # Component for client-side logic wrapper
    │   ├── CommunityDropdown.tsx # Dropdown component for community selection
    │   ├── Navbar.tsx         # Navigation bar component
    │   ├── Post.tsx           # Post display component
    │   ├── SearchCreate.tsx   # Search and create functionality component
    │   └── Sidebar.tsx        # Sidebar component
    │
    ├── constants/             # Constants used across the application
    │   └── apiPaths.ts        # API path constants
    │
    ├── mock/                  # Mock data for testing and development
    │   └── mockupdata.ts      # Sample mock data
    │
    ├── routers/               # Routing configurations
    │   └── routers.ts         # Router configurations for the application
    │
    ├── services/              # Services for API calls and state management
    │   ├── api/               # API-related services
    │   └── store/             # Zustand store for state management
    │
    └── utils/                 # Utility functions and helpers
        └── apiHelpers.ts      # Helper functions for API handling
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

