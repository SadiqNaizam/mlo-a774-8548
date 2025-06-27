import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';

// Custom Components
import AuthForm from '@/components/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

// Define the validation schema for the reset password form
const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Set the error on the confirmPassword field
  });

const ResetPasswordPage: React.FC = () => {
  console.log('ResetPasswordPage loaded');
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simulate API call
    console.log('Resetting password with:', values.password);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // On success, show toast and redirect
    toast.success('Your password has been updated.');
    navigate('/dashboard'); // Path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm
          title="Reset Your Password"
          description="Enter and confirm a new password for your account."
          formSchema={formSchema}
          onSubmit={onSubmit}
          buttonText="Set New Password"
          defaultValues={{
            password: '',
            confirmPassword: '',
          }}
          footerContent={
            <Link to="/" className="text-sm hover:underline">
              Remember your password? Sign In
            </Link>
          }
        >
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
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

export default ResetPasswordPage;