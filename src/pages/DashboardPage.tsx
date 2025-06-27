import React from 'react';
import { useNavigate } from 'react-router-dom';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to the login page as defined in App.tsx
    console.log('User logging out...');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              You are successfully authenticated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="text-center text-sm text-muted-foreground">
              <p>This is your secure dashboard. From here, you would typically be redirected to your main application.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogout} className="w-full" variant="destructive">
              Logout
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;