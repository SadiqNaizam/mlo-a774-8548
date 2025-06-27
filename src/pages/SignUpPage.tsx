import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define the validation schema for the sign-up form
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set the error on the confirmPassword field
});

const SignUpPage = () => {
  console.log('SignUpPage loaded');
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real app, you would send this data to your API
    console.log('Form submitted with values:', values);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("Account created successfully!");
        navigate('/dashboard'); // Redirect to dashboard on success
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm
          title="Create an Account"
          description="Enter your details below to join the SwiftLogin Portal."
          formSchema={formSchema}
          onSubmit={onSubmit}
          buttonText="Sign Up"
          defaultValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          footerContent={
            <>
              Already have an account?&nbsp;
              <Link to="/" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </>
          }
        >
          {/* Form fields are passed as children to AuthForm */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm Password</FormLabel>
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

export default SignUpPage;