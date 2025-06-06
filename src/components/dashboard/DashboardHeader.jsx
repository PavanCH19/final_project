import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600">Ready to ace your next interview?</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Today</p>
        <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
} 