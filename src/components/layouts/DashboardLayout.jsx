import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Star,
  FileText,
  Settings,
  Menu,
  X,
  Users,
  Calendar,
  LineChart,
  ClipboardList
} from 'lucide-react';
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider
} from "@/components/ui/sidebar";

const mainNavLinks = [
  { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
  { path: '/dashboard/mock-interview', icon: <MessageSquare className="w-5 h-5" />, label: 'Interview Sessions' },
  { path: '/dashboard/template-builder', icon: <Star className="w-5 h-5" />, label: 'Template builder' },
  { path: '/dashboard/feedback', icon: <FileText className="w-5 h-5" />, label: 'Feedback' },
  { path: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];

const additionalLinks = [
  { path: '/dashboard/admin', icon: <Users className="w-5 h-5" />, label: 'Admin' },
  { path: '/dashboard/interview-report', icon: <ClipboardList className="w-5 h-5" />, label: 'Interview Report' },
  { path: '/dashboard/progress', icon: <LineChart className="w-5 h-5" />, label: 'Progress' },
  { path: '/dashboard/schedule', icon: <Calendar className="w-5 h-5" />, label: 'Schedule' },
  { path: '/dashboard/interview-simulation', icon: <Users className="w-5 h-5" />, label: 'Interview Simulation' },
  { path: '/dashboard/learning-dashboard', icon: <Users className="w-5 h-5" />, label: 'Learning Dashboard' },
  { path: '/dashboard/coding-environment', icon: <Users className="w-5 h-5" />, label: 'Coding Environment' },
  { path: '/dashboard/resume-builder', icon: <Users className="w-5 h-5" />, label: 'Resume builder' },
  { path: '/dashboard/resume-uploader', icon: <Users className="w-5 h-5" />, label: 'Resume uploader' },
  { path: '/dashboard/offline-settings', icon: <Users className="w-5 h-5" />, label: 'Offline Settings' }
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="InterviewAce" />
                <AvatarFallback className="bg-blue-600 text-white text-sm">IA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">InterviewAce</span>
                <span className="text-xs text-muted-foreground">Smart Prep Platform</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {mainNavLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === link.path}
                    >
                      <Link to={link.path} className="flex items-center gap-3">
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Additional Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Additional Pages</SidebarGroupLabel>
              <SidebarMenu>
                {additionalLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === link.path}
                    >
                      <Link to={link.path} className="flex items-center gap-3">
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout; 