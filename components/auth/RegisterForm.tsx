"use client";

import BackButton from "@/components/BackButton";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { auth } from "@/app/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { createUserProfile } from "@/app/firebase/firestoreoperations";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirm Password is required",
  }),
});

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  //   if (data.password !== data.confirmPassword) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Passwords do not match",
  //     });
  //     return;
  //   }


  //   try {
  //     setIsLoading(true);
  //     await createUserWithEmailAndPassword(auth, data.email, data.password);
  //     toast({
  //       title: "Success",
  //       description: "Account created successfully!",
  //     });
  //     router.push("/");
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: (error as Error).message,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // const handleRegister = async (data: z.infer<typeof formSchema>) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  //     const user = userCredential.user;
  
  //     // Create user profile in Firestore
  //     const success = await createUserProfile(user.uid, {
  //       name: data.name,
  //       email: data.email,
  //       avatarUrl: '', // You can set a default avatar URL or leave it empty
  //     });
  
  //     if (success) {
  //       toast({
  //         title: "Success",
  //         description: "User profile created successfully",
  //       });
  //       // Redirect or perform other actions
  //     } else {
  //       throw new Error("Failed to create user profile");
  //     }
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: (error as Error).message,
  //     });
  //   }
  // };

  const handleRegister = async (data: z.infer<typeof formSchema>) => {
    if (data.password !== data.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const success = await createUserProfile(user.uid, {
        name: data.name,
        email: data.email,
        avatarUrl: '', // You can set a default avatar URL or leave it empty
      });

      if (success) {
        toast({
          title: "Success",
          description: "User profile created successfully",
        });
        router.push("/"); // Redirect to home or another page
      } else {
        throw new Error("Failed to create user profile");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-pink-200 dark:bg-slate-950 ">
      <CardHeader>
        <CardTitle className="dark:text-pink-300">Register</CardTitle>
        <CardDescription>Sign up by adding the info below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-pink-300">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-pink-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-pink-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-pink-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full dark:bg-pink-300">
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
