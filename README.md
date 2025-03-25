# JobHunt - MERN Stack Job Portal

JobHunt is a full-featured job portal built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It allows job seekers to browse, search, and apply for jobs, while employers can post and manage job listings.

## Features

### For Job Seekers (Students)
- 🔍 Search and filter jobs by category, company, and keywords.
- 📌 Save jobs for later.
- 📝 Apply to jobs directly through the portal.
- 👤 User authentication (register/login/logout).
- 📄 Upload and manage resumes.

### For Employers (Admin)
- 📝 Post new job listings.
- ✏️ Edit and update job postings.
- 🗑️ Delete job postings.
- 📊 View applications submitted by candidates.

### General Features
- 🛠️ Secure authentication using JWT.
- ⚡ Real-time job updates.
- 📦 Fully responsive UI with modern design.
- 🔄 State management using Redux.
- 🔍 Efficient job searching with filters and keyword search.

## Technologies Used

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcrypt.js
- **State Management:** Redux Toolkit
- **UI Framework:** Tailwind CSS
- **HTTP Requests:** Axios
- **Deployment:** Vercel (Frontend), Render/Heroku (Backend)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/jobhunt.git
cd jobhunt
```

### 2. Install Dependencies
#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Application
#### Start Backend Server:
```bash
cd backend
npm start
```

#### Start Frontend Server:
```bash
cd frontend
npm start
```

## Login Credentials

### Student Login
- **Email:** sam1@gmail.com  
- **Password:** sam  

### Admin Login
- **Email:** rawat1@gmail.com  
- **Password:** rawat  

## Contributing
Contributions are welcome! Feel free to fork this repository and submit a pull request with improvements or bug fixes.

## License
This project is licensed under the MIT License.

