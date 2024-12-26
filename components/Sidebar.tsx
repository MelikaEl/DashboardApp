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
} from "@/components/ui/command";
import { LayoutDashboard, Newspaper, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-pink-200 dark:bg-slate-800 rounded-none h-full">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="h-[calc(100vh-4rem)]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4 " />
            <Link href="/" className="text-pink-500 dark:text-pink-300">
              Dashboard
            </Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/posts" className="text-pink-500 dark:text-pink-300">
              Posts
            </Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/profile" className="text-pink-500 dark:text-pink-300">Profile</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
