import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

interface AuthFormProps<T extends z.ZodType<any, any>> {
  title: string;
  description: string;
  formSchema: T;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  children: React.ReactNode;
  buttonText: string;
  footerContent: React.ReactNode;
  socialAuthContent?: React.ReactNode;
  defaultValues: z.infer<T>;
}

const AuthForm = <T extends z.ZodType<any, any>>({
  title,
  description,
  formSchema,
  onSubmit,
  children,
  buttonText,
  footerContent,
  socialAuthContent,
  defaultValues,
}: AuthFormProps<T>) => {
  console.log('AuthForm loaded');

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const handleFormSubmit = async (values: z.infer<T>) => {
    await onSubmit(values);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-4">{children}</div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                buttonText
              )}
            </Button>
          </form>
        </Form>
        {socialAuthContent && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            {socialAuthContent}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        {footerContent}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;