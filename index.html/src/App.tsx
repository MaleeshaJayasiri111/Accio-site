import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAuth, useAdmin } from '@/store/AppContext';
import { Toaster } from '@/components/ui/sonner';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Customer Pages
import Dashboard from '@/pages/customer/Dashboard';
import Orders from '@/pages/customer/Orders';
import Profile from '@/pages/customer/Profile';

// Admin Pages
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminCustomers from '@/pages/admin/Customers';
import AdminOrders from '@/pages/admin/Orders';
import AdminMessages from '@/pages/admin/Messages';
import AdminSettings from '@/pages/admin/Settings';

// Protected Route Components
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated } = useAdmin();
  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected Customer Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}

export default App;
