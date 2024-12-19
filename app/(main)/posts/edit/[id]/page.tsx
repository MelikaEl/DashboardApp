'use client';

import BackButton from '@/components/BackButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import posts from '@/data/posts';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost } from '@/app/firebase/posts';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  body: z.string().min(1, {
    message: 'Body is required',
  }),
  author: z.string().min(1, {
    message: 'Author is required',
  }),
  date: z.string().min(1, {
    message: 'Date is required',
  }),
});

interface PostEditPageProps {
  params: {
    id: string;
  };
}

const PostEditPage = ({ params }: PostEditPageProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const post = posts.find((post) => post.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      author: post?.author || '',
      date: post?.date || '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updatePost(params.id, data);
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
      router.push('/posts');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update post",
      });
    }
  };

  return (
    <>
      <BackButton text='Back To Posts' link='/posts' />
      <h3 className='text-2xl mb-4 dark:text-pink-300'>Edit Post</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-pink-200 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Body
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-pink-200 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Body'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-pink-200 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Author'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    className='bg-pink-200 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0'
                    placeholder='Enter Date'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full dark:bg-slate-800 dark:text-pink-300'>
            Update Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostEditPage;
