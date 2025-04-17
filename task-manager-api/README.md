# 📝 Task Manager API

A simple RESTful CRUD API built with **Node.js**, **Express**, **MySQL**, and **Sequelize ORM**.  
This project allows you to manage users and their tasks efficiently with full Create, Read, Update, and Delete functionality.

---

## 📌 Features

- User registration with email
- Create, Read, Update, and Delete tasks
- Tasks belong to users (1-to-Many relationship)
- Built using Sequelize ORM to avoid raw SQL queries
- Organized with MVC structure

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize ORM**
- **Sequelize CLI**
- **dotenv**
- **Postman** (for testing)

---

## 🧱 ERD (Entity Relationship Diagram)

![ERD Screenshot](./erd.png)

> This ERD represents:
> - `User` has many `Tasks`
> - `Task` belongs to `User`

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/eric-mwakazi/Database-Project-Submission.git
cd Database-Project-Submission/task-manager-api
```
## 📂 Folder Structure
```bash
task-manager-api/
│
├── config/          # Sequelize config
├── migrations/      # DB table migrations
├── models/          # Sequelize models
├── routes/          # Express routes
├── seeders/         # Sample seed data
├── .env             # Environment variables
├── app.js           # Main app entry
└── README.md
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a .env File
```env
DB_NAME=task_manager
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
```
### 4. Setup the Database
* a) Create MySQL Database
```sql
CREATE DATABASE task_manager;
```
* b) Run Migrations
```bash
npx sequelize-cli db:migrate
```
* (Optional) Seed Sample Data
```bash
npx sequelize-cli db:seed:all
```
* 5. Run the Project
```bash
npm start
```
The server will start on http://localhost:3000.

### 🧪 Test Endpoints
Use Postman or cURL to test the endpoints:

Create a Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "completed": false,
  "user_id": 1
}
```

