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

const mainNavLinks = [
  { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
  { path: '/dashboard/mock-interview', icon: <MessageSquare className="w-5 h-5" />, label: 'Interview Sessions' },
  { path: '/dashboard/template-builder', icon: <Star className="w-5 h-5" />, label: 'Template builder' },
  { path: '/dashboard/feedback', icon: <FileText className="w-5 h-5" />, label: 'Feedback' },
  { path: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  { path: 'dashboard/init', icon: <Users className="w-5 h-5" />, label: 'Init' },
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white shadow-md transition-all duration-300 fixed h-full z-30",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">InterviewAce</h1>
              <p className="text-xs text-gray-500">Smart Prep Platform</p>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Navigation */}
        <div className="p-4">
          <div className="text-sm font-medium text-gray-500 mb-2">
            {isSidebarOpen && "Navigation"}
          </div>
          <nav className="space-y-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center gap-3 justify-start",
                    location.pathname === link.path
                      ? "bg-gray-100 text-primary"
                      : "hover:bg-gray-100"
                  )}
                >
                  {link.icon}
                  {isSidebarOpen && <span>{link.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Additional Pages */}
        <div className="p-4 border-t">
          <div className="text-sm font-medium text-gray-500 mb-2">
            {isSidebarOpen && "Additional Pages"}
          </div>
          <nav className="space-y-1">
            {additionalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center gap-3 justify-start",
                    location.pathname === link.path
                      ? "bg-gray-100 text-primary"
                      : "hover:bg-gray-100"
                  )}
                >
                  {link.icon}
                  {isSidebarOpen && <span>{link.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 p-8",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 