import { useState } from 'react';
import { useAdmin } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Shield, Save, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { admin, updateCredentials } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    username: admin?.username || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (admin) {
      updateCredentials(profileForm.username, admin.password);
      toast.success('Profile updated successfully');
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (admin && passwordForm.currentPassword !== admin.password) {
      toast.error('Current password is incorrect');
      return;
    }

    if (admin) {
      updateCredentials(admin.username, passwordForm.newPassword);
      toast.success('Password updated successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Badge className="mb-2 bg-primary/20 text-primary-foreground">Settings</Badge>
        <h1 className="font-display text-3xl font-bold text-secondary">Admin Settings</h1>
        <p className="text-muted-foreground">Manage your admin account settings</p>
      </div>

      <Tabs defaultValue="profile" className="max-w-2xl">
        <TabsList className="w-full">
          <TabsTrigger value="profile" className="flex-1">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            <Lock className="w-4 h-4 mr-2" />
            Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {/* Current Info */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Current Username</div>
                  <div className="font-medium">{admin?.username}</div>
                </div>

                {/* New Username */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    New Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({ username: e.target.value })}
                      placeholder="Enter new username"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Current Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      placeholder="Enter current password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    New Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      placeholder="Enter new password"
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 6 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Confirm New Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      placeholder="Confirm new password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
