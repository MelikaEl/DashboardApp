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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/firebase/firestoreoperations';

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
});

const PostCreatePage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      author: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const success = await createPost({
        title: data.title,
        body: data.body,
        author: data.author,
        post: data.body // Add the missing 'post' field
      });
      if (success) {
        toast({
          title: 'Success', 
          description: 'Post has been created successfully',
        });
        router.push('/posts');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create post',
      });
    }
  };

  return (
    <>
      <BackButton text='Back To Posts' link='/posts' />
      <h3 className='text-2xl mb-4 dark:text-pink-300'>Create Post</h3>
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

          <Button className='w-full dark:bg-slate-800 dark:text-pink-300'>
            Create Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostCreatePage;