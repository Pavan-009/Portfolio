import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProjectFormPage from './pages/AdminProjectFormPage';
import AdminSkillsPage from './pages/AdminSkillsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/auth/PrivateRoute';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requireAdmin>
                <AdminDashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/projects/new" 
            element={
              <PrivateRoute requireAdmin>
                <AdminProjectFormPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/projects/:id" 
            element={
              <PrivateRoute requireAdmin>
                <AdminProjectFormPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/skills" 
            element={
              <PrivateRoute requireAdmin>
                <AdminSkillsPage />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;