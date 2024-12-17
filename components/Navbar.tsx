import Image from 'next/image';
import Link from 'next/link';
import logo from '../img/my-logo.png';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggler from '@/components/ThemeToggler';


const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='bg-pink-500 dark:bg-slate-700 text-white py-2 px-5 flex justify-between'>
      <div className="flex items-center gap-2">
      {children} {/* Add this line to render the hamburger menu */}
      <Link href='/'>
        <Image src={logo} alt='my logo' width={40} className='rounded'/>
      </Link>
      </div>

      <div className='flex items-center'>
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
              <AvatarImage src='https://tse4.mm.bing.net/th?id=OIG3.mhAWBplTAQPZSL8.M_JK&pid=ImgGn' alt='@shadcn' />
              <AvatarFallback className='text-black'>ME</AvatarFallback> {/* The Avatar Fallback in the Shadcn UI framework is a component designed to display alternative content when the primary avatar image fails to load. */}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/auth'>Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
