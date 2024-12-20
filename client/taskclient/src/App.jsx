import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/loginPage"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import TasksPage from "./pages/TasksPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

import ProtectedRoute from "./ProtectedRoute.jsx"
import { AuthProvider } from "./context/authContext"
import { TaskProvider } from "./context/TasksContext.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className="container mx-auto px10">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/new" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
