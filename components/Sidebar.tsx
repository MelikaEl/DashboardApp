import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className='bg-pink-200 dark:bg-slate-800 rounded-none h-full'>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList  className="h-[calc(100vh-4rem)]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem>
            <LayoutDashboard className='mr-2 h-4 w-4 ' />
            <Link href='/' className='text-pink-500 dark:text-pink-300'>Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className='mr-2 h-4 w-4' />
            <Link href='/posts' className='text-pink-500 dark:text-pink-300'>Posts</Link>
          </CommandItem>
          <CommandItem>
            <Folders className='mr-2 h-4 w-4' />
            <Link href='#' className='text-pink-500 dark:text-pink-300'>Categories</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings'>
          <CommandItem>
            <User className='mr-2 h-4 w-4' />
            <span className='text-pink-500 dark:text-pink-300'>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span className='text-pink-500 dark:text-pink-300'>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className='mr-2 h-4 w-4' />
            <span className='text-pink-500 dark:text-pink-300'>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
