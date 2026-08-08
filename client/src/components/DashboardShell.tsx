import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import AIAssistant from "./AIAssistant";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  CheckSquare,
  HardDrive,
  Video,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  useEffect(() => {
    const handleOpenAI = () => setAiAssistantOpen(true);
    window.addEventListener('openAIAssistant', handleOpenAI as EventListener);
    return () => window.removeEventListener('openAIAssistant', handleOpenAI as EventListener);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Briefcase, label: "Workspace", path: "/workspace" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: HardDrive, label: "Drive", path: "/drive" },
    { icon: Video, label: "Meetings", path: "/meetings" },
    { icon: Users, label: "HR", path: "/hr" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="font-bold text-gray-900">DeskSync</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* AI Assistant & User Profile */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAiAssistantOpen(true)}
            className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            title="Open AI Assistant"
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Ask AI</span>}
          </Button>
          {sidebarOpen && (
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-600 truncate">{user?.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />
    </div>
  );
}
