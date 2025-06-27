import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';

// Custom Components
import AuthForm from '@/components/AuthForm';
import SocialAuthButtons from '@/components/SocialAuthButtons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// Define the validation schema for the login form using Zod
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    console.log("Login form submitted:", values);
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // On successful login, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <AuthForm
          title="Welcome Back"
          description="Enter your credentials to access your account."
          formSchema={loginFormSchema}
          onSubmit={onSubmit}
          buttonText="Sign In"
          defaultValues={{
            email: "",
            password: "",
          }}
          socialAuthContent={<SocialAuthButtons />}
          footerContent={
            <>
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </>
          }
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="name@example.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AuthForm>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;