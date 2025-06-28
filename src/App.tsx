import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { initializeUsers } from './services/authService';
import './i18n/i18n'; // Import i18n configuration
import './index.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import WorkerProfile from './pages/WorkerProfile';
import EmployerProfile from './pages/EmployerProfile';
import IndividualProfile from './pages/IndividualProfile';
import EmployerType from './pages/EmployerType';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import WorkerDashboard from './pages/WorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import BrowseWorkers from './pages/BrowseWorkers';
import MassHiringDemo from './pages/MassHiringDemo';
import AnalyticsDemo from './pages/AnalyticsDemo';
import MessagingDemo from './pages/MessagingDemo';
import TemporaryEmployerProfile from './pages/TemporaryEmployerProfile';
import TemporaryWorkerProfile from './pages/TemporaryWorkerProfile';
import {supabase} from './client';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminLayout from './pages/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Initialize users data
    try {
      initializeUsers();
    } catch (error) {
      console.warn('Could not initialize users:', error);
    }
    
    // Indicate that the app is ready
    setIsLoading(false);
    
    return () => {
      try {
        document.head.removeChild(link);
      } catch (error) {
        console.warn('Could not remove font link:', error);
      }
    };
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-[Poppins]">
          <Header />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/worker-profile" element={<WorkerProfile />} />
                <Route path="/employer-type" element={<EmployerType />} />
                <Route path="/employer-profile" element={<EmployerProfile />} />
                <Route path="/individual-profile" element={<IndividualProfile />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/worker-dashboard" element={<WorkerDashboard />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/browse-workers" element={<BrowseWorkers />} />
                <Route path="/mass-hiring-demo" element={<MassHiringDemo />} />
                <Route path="/analytics-demo" element={<AnalyticsDemo />} />
                <Route path="/messaging-demo" element={<MessagingDemo />} />
                <Route path="/temporary-employer-profile" element={<TemporaryEmployerProfile />} />
                <Route path="/temporary-worker-profile" element={<TemporaryWorkerProfile />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="verification" element={<Dashboard />} />
                  <Route path="reports" element={<Dashboard />} />
                  <Route path="settings" element={<Dashboard />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
