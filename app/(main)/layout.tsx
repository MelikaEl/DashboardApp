import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Navbar>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 mr-2" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[300px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </Navbar>
      <div className='flex h-full'>
        <div className='hidden md:block w-[300px]'>
          <Sidebar />
        </div>
        <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
      </div>
  </>
  );
};

export default MainLayout;

/*
 <Navbar />
    <div className='flex h-full'>
      <div className='hidden md:block w-[300px] '>
        <Sidebar />
      </div>
      <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
    </div>
*/


/*
 return (
    <>
      <Navbar />

      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main>
          <SidebarTrigger className="lg:hidden"/>
          {children}
        </main>
      </SidebarProvider>
    </>
*/


/*
return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 flex">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger className="lg:hidden" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  </div>
  );
*/




/*
return (
    <>
      <Navbar />

      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
*/




/*
return (
    <>
      <Navbar />
      <div className='flex h-full'>
        <div className='hidden md:block w-[300px] '>
          <Sidebar />
        </div>
        <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
      </div>
    </>
  );
 */
