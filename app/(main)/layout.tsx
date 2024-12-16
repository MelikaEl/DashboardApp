import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
  );
};

export default MainLayout;


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
