import React from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

// Shadcn UI Components
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Zod schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgotPasswordPage = () => {
  console.log('ForgotPasswordPage loaded');

  // Form submission handler
  const handleForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log('Password reset requested for email:', values.email);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For security, always show a generic success message
    // This prevents attackers from checking which emails are registered.
    toast.success("If an account exists with that email, a reset link has been sent.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm
          title="Forgot Your Password?"
          description="No problem. Enter your email below and we'll send you a link to reset it."
          formSchema={forgotPasswordSchema}
          onSubmit={handleForgotPassword}
          buttonText="Send Reset Link"
          defaultValues={{ email: '' }}
          footerContent={
            <>
              Remember your password?{' '}
              <Link to="/" className="font-semibold text-primary hover:underline">
                Sign In
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
        </AuthForm>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;