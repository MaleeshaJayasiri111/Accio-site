import { useState } from 'react';
import { useAuth, useApp } from '@/store/AppContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, Lock, Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { user, logout } = useAuth();
  const { dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, ...formData };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground">My Profile</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="font-display text-4xl font-bold text-primary">
                      {user?.fullName.charAt(0)}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-display text-xl font-bold text-secondary">
                  {user?.fullName}
                </h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={logout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="w-full">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="password">Change Password</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display text-xl">
                      Personal Information
                    </CardTitle>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            Full Name
                          </Label>
                          <Input
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4" />
                            Country
                          </Label>
                          <Input
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({ ...formData, country: e.target.value })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4" />
                          Delivery Address
                        </Label>
                        <Input
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          disabled={!isEditing}
                          placeholder="Enter your full address"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex gap-4">
                          <Button onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false);
                              setFormData({
                                fullName: user?.fullName || '',
                                email: user?.email || '',
                                phone: user?.phone || '',
                                country: user?.country || '',
                                address: user?.address || '',
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        toast.success('Password changed successfully!');
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4" />
                          Current Password
                        </Label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4" />
                          New Password
                        </Label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4" />
                          Confirm New Password
                        </Label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
