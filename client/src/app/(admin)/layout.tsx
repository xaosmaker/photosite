import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
//TODO: make a navbar for the logged in admin
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="bg-muted relative flex min-h-svh w-full flex-col items-center justify-center gap-5">
        <SidebarTrigger className="absolute top-0 left-0" />
        <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
