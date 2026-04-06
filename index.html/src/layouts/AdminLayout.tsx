import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/store/AppContext';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20 xl:w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-foreground/10">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <span className={`font-display text-xl font-bold xl:block ${isSidebarOpen ? 'lg:block' : 'lg:hidden'}`}>
                Accio Admin
              </span>
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-secondary-foreground/10 rounded-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary-foreground/10'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className={`xl:block ${isSidebarOpen ? 'lg:block' : 'lg:hidden'}`}>
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <ChevronRight className={`w-4 h-4 ml-auto xl:block ${isSidebarOpen ? 'lg:block' : 'lg:hidden'}`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-secondary-foreground/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className={`xl:block ${isSidebarOpen ? 'lg:block' : 'lg:hidden'}`}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-4 lg:px-8">
          <button
            className="p-2 hover:bg-muted rounded-lg lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            className="hidden lg:flex p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View Website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
