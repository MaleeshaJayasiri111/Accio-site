import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff, User, Lock, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const success = login(formData.username, formData.password);
      
      if (success) {
        toast.success('Welcome back, Admin!');
        navigate('/admin');
      } else {
        toast.error('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <Badge className="mb-4 bg-primary text-primary-foreground">Admin Panel</Badge>
          <h1 className="font-display text-3xl font-bold text-secondary-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-secondary-foreground/70">
            Secure access for authorized personnel only
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Username <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-secondary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Login to Admin
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium">Default Credentials:</span>
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Username: <span className="font-mono">Kavindu Jayasiri</span>
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Password: <span className="font-mono">Accio@2026</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
