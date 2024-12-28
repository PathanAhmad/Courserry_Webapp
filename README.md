# **Technical Overview**  

## 1. **Technology Stack**  
- **Backend** – Node.js, Express.js  
- **Frontend** – React.js, React Router  
- **Database** – MongoDB (Mongoose for schema modeling)  
- **Authentication** – JWT (JSON Web Tokens)  
- **Styling** – CSS, Bootstrap  
- **Visualization** – Recharts (Graphs for logs and analytics)  
- **Python Integration** – Flask or FastAPI (Data processing)  

---

## 2. **Backend Structure**  

### 2.1 **Core Initialization**  
- **`server.js`** – Main entry point initializing Express, connecting to MongoDB, and loading routes.  

---

### 2.2 **Routing & API Design**  
- **Auth Routes** – `authRoutes.js` (User login, registration, token management).  
- **Course Routes** – `courseRoutes.js` (Course creation, editing, deletion, and enrollment).  
- **Log Routes** – `logRoutes.js` (Daily logs, user submissions).  
- **Python Routes** – `pythonRoutes.js` (Triggering Python scripts for CSV data processing).  
- **Student Routes** – `studentRoutes.js` (Manage student dashboard and courses).  

---

### 2.3 **Controllers**  
- **`authController.js`** – Handles login, registration, and JWT issuance.  
- **`courseController.js`** – Manages course CRUD operations.  
- **`logController.js`** – Processes daily logs and student entries.  
- **`pythonController.js`** – Connects with Python scripts to handle CSV data processing.  
- **`studentController.js`** – Manages student enrollments and portal data.  

---

### 2.4 **Middleware**  
- **`authMiddleware.js`** – Protects routes by validating JWT tokens and enforcing role-based access.  

---

### 2.5 **Models (MongoDB Schemas)**  
- **`User.js`** – User schema (authentication, roles).  
- **`Course.js`** – Course schema (titles, descriptions, video links).  
- **`DailyLog.js`** – Daily log schema (mood, stress levels, sleep).  

---

## 3. **Frontend Structure**  

### 3.1 **Entry Points**  
- **`App.jsx`** – Main frontend component handling initial app rendering and redirection logic.  
- **`main.jsx`** – Renders the React app and sets up routing.  

---

### 3.2 **Pages (React Views)**  
- **Auth Pages** – `Login.jsx`, `Register.jsx` (User authentication).  
- **Admin Pages** – `AdminPortal.jsx`, `ManageCourses.jsx`, `CreateCourse.jsx`, `EditCourse.jsx` (Course management).  
- **Student Pages** – `StudentPortal.jsx`, `Dashboard.jsx`, `MyCourses.jsx` (Student dashboard and course views).  
- **Course Details** – `CourseDetails.jsx` (Detailed view of individual courses).  
- **404 Handling** – `NotFound.jsx` (Handles non-existent routes).  

---

### 3.3 **Components (Reusable UI)**  
- **Visualization Components**:  
  - **`DailyLogBox.jsx`** – Displays daily logs with interaction.  
  - **`WeeklyGraph.jsx`** – Graphs weekly data using Recharts.  
  - **`MonthlyGraph.jsx`** – Visualizes monthly log data.  
- **Interactive Elements**:  
  - **`QuestionModal.jsx`** – Modal for quizzes or questions during courses.  
  - **`DailyLogModal.jsx`** – Modal for daily log submissions.  
  - **`ResumeCourseCTA.jsx`** – Call to action to resume the last course.  
- **General Components**:  
  - **`Loading.jsx`** – Loading spinner for UI feedback.  
  - **`RedirectingScreen.jsx`** – Screen for handling redirects.  
  - **`ProtectedRoute.jsx`** – Protects frontend routes based on user roles.  
  - **`ColorSlider.jsx`** – Dynamic color slider for visual interactions.  
  - **`TypingTextBox.jsx`** – Simulated typing effect for UI elements.  

---

## 4. **Hooks & Utilities**  
- **Custom Hook**:  
  - **`useGraphData.js`** – Fetches and formats CSV data for graph rendering.  
- **Utilities**:  
  - **`courseUtils.js`** – Helper functions for fetching course details and API interactions.  

---

## 5. **Python Integration**  
- **`plot_data.py`** – Python script that processes `final.csv` for data visualization.  
- **`final.csv`** – CSV file containing raw data used for plotting graphs.  

---

## 6. **Configuration**  
- **`config.js`** – Centralizes API base URLs (fetches from environment variables).  

---

## 7. **Styling**  
- **`index.css`** – Core global styles.  
- **`auth.css`** – Styles specific to login and registration forms.  

---

## **Key Features**  
- **Admin Features** – Create, edit, delete courses.  
- **Student Portal** – Enroll, track progress, and log daily activities.  
- **JWT Authentication** – Role-based access control (admin, student).  
- **Graphs & Analytics** – Visual data from user logs (daily, weekly, monthly).  

---

Let me know if you'd like this saved to a file or need further adjustments!
