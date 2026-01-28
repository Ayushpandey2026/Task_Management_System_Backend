# Task Management System – Backend API (Node.js + TypeScript + Prisma)


This is the **backend REST API** for the Task Management System.


It provides:


- Secure JWT Authentication (Access + Refresh Tokens)
- User Registration & Login
- Full Task CRUD (Create, Read, Update, Delete)
- Pagination, Filtering, Searching
- Refresh Token Storage in Database
- Logout with Refresh Token Removal


---


## 🚀 Tech Stack


- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **SQLite Database** (SQL based)
- **JWT Authentication**
- **bcrypt Password Hashing**
- **Zod Validation**


---


## ✅ Features Implemented


---


### 🔐 Authentication & Security


- User Registration
- User Login
- Password Hashing using bcrypt
- Access Token (Short-lived)
- Refresh Token (Long-lived)
- Refresh Token Stored Securely in Database
- Logout removes refresh token from DB


---


### ✅ Task Management (CRUD)


Each task belongs only to the logged-in user.


- Create Task
- View All Tasks
- View Single Task
- Update Task
- Delete Task
- Toggle Task Status (Completed/Pending)


---


### 📌 Advanced Task Listing


The main endpoint supports:


- Pagination
- Filtering by status
- Searching by title


Example:


```http
📂 Folder Structure
task-manager-backend/
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── dev.db               # SQLite Database file
│
├── src/
│   ├── config/
│   │   └── db.ts            # Prisma client setup
│
│   ├── middleware/
│   │   └── auth.middleware.ts   # JWT route protection
│
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   └── tasks/
│   │       ├── task.routes.ts
│   │       ├── task.controller.ts
│   │       ├── task.service.ts
│   │       └── task.validation.ts
│
│   ├── utils/
│   │   └── token.ts         # JWT token generator
│
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
│
├── .env                     # Environment variables
├── package.json
└── tsconfig.json


## ⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone 
cd task-manager-backend
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file in the root:

JWT_SECRET=xxxxxx
REFRESH_SECRET=xxxxxxxx
DATABASE_URL=file:./dev.db
PORT=5000

4️⃣ Setup Prisma Database

Run migrations:

npx prisma migrate dev --name init

Generate Prisma Client:

npx prisma generate


5️⃣ Start Backend Server
npm run dev

Backend will run at:

http://localhost:5000
🔍 Prisma Studio (Database Viewer)

To view tables visually:

npx prisma studio

Opens at:

http://localhost:5555



📌 API Endpoints
Auth Endpoints
Endpoint	Method	Description
/auth/register	POST	Register new user
/auth/login	POST	Login user
/auth/refresh	POST	Refresh access token
/auth/logout	POST	Logout user (removes refresh token)
Task Endpoints (Protected)
Endpoint	Method	Description
/tasks	GET	Get tasks (pagination + filter + search)
/tasks	POST	Create new task
/tasks/:id	GET	Get single task
/tasks/:id	PATCH	Update task
/tasks/:id	DELETE	Delete task
/tasks/:id/toggle	PATCH	Toggle task status
🔐 Authentication Notes

All /tasks routes require Access Token:

Authorization: Bearer <accessToken>

Refresh Token is used to generate new access token when expired.
````

👨‍💻 Author

Ayush Pandey
Full Stack Developer
