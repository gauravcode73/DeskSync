import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockKPIs, mockTaskOverview, mockDepartmentPerformance, mockAttendanceData, mockRecentActivity, mockTopWorkspaces, mockUpcomingMeetings, mockEmployeeDashboard } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight, Users, CheckSquare, Calendar, FileText, Settings, LogOut, Zap } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  const org = JSON.parse(localStorage.getItem("desksync-org") || "{}");
  const isAdmin = org.role === "owner" || org.role === "admin";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">{org.name || "Organization"}</div>
              <div className="text-xs text-gray-500">{user?.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isAdmin ? "Admin Dashboard" : "Employee Dashboard"}
          </h1>
          <p className="text-gray-600">
            {isAdmin ? "Organization overview and analytics" : "Your tasks, meetings, and updates"}
          </p>
        </div>

        {/* Admin Dashboard */}
        {isAdmin && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: "Employees", ...mockKPIs.employees },
                { label: "Departments", ...mockKPIs.departments },
                { label: "Tasks", ...mockKPIs.tasks },
                { label: "Pending Approvals", ...mockKPIs.pendingApprovals },
                { label: "Meetings Today", ...mockKPIs.meetingsToday },
                { label: "Storage Used", ...mockKPIs.storageUsed },
              ].map((kpi, i) => (
                <Card key={i} className="p-4">
                  <div className="text-sm text-gray-600 mb-2">{kpi.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {Math.abs(kpi.change)}%
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Task Overview */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={mockTaskOverview} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                      {mockTaskOverview.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Department Performance */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockDepartmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="oklch(0.7 0.2 280)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Attendance & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Overview */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={mockAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="oklch(0.7 0.2 280)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">{activity.target}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Top Workspaces & Meetings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Workspaces */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Active Workspaces</h3>
                <div className="space-y-3">
                  {mockTopWorkspaces.map((workspace) => (
                    <div key={workspace.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{workspace.name}</p>
                        <p className="text-sm text-gray-600">{workspace.members} members</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${workspace.activity === "High" ? "text-green-600" : workspace.activity === "Medium" ? "text-yellow-600" : "text-gray-600"}`}>
                          {workspace.activity}
                        </div>
                        <p className="text-xs text-gray-500">{workspace.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Meetings */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
                <div className="space-y-3">
                  {mockUpcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{meeting.title}</p>
                        <p className="text-sm text-gray-600">{meeting.time} • {meeting.room}</p>
                        <p className="text-xs text-gray-500 mt-1">{meeting.attendees} attendees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Employee Dashboard */}
        {!isAdmin && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[
                { icon: CheckSquare, label: "Create Task", action: () => {} },
                { icon: FileText, label: "Create Request", action: () => {} },
                { icon: Calendar, label: "Join Meeting", action: () => {} },
                { icon: FileText, label: "Upload File", action: () => {} },
                { icon: Zap, label: "Ask AI", action: () => window.dispatchEvent(new CustomEvent('openAIAssistant')) },
                { icon: Calendar, label: "My Calendar", action: () => {} },
              ].map((action, i) => (
                <Button key={i} variant="outline" className="flex flex-col items-center justify-center h-24 gap-2" onClick={action.action}>
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* My Tasks */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
                  <div className="space-y-2">
                    {mockEmployeeDashboard.myTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-600">{task.dueDate}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${task.priority === "High" ? "bg-red-100 text-red-700" : task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {task.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Upcoming Meetings */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
                  <div className="space-y-3">
                    {mockEmployeeDashboard.upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{meeting.title}</p>
                          <p className="text-sm text-gray-600">{meeting.time}</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Join</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Attendance */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Attendance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="text-2xl font-bold text-green-600">{mockEmployeeDashboard.attendanceStats.rate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Leave Balance</span>
                      <span className="font-semibold">{mockEmployeeDashboard.attendanceStats.leaveBalance} days</span>
                    </div>
                  </div>
                </Card>

                {/* Department Updates */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Updates</h3>
                  <div className="space-y-3">
                    {mockEmployeeDashboard.departmentUpdates.map((update) => (
                      <div key={update.id} className="pb-3 border-b border-gray-100 last:border-0">
                        <p className="font-medium text-gray-900 text-sm">{update.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Pending Requests */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests</h3>
                  <div className="space-y-3">
                    {[
                      { id: 1, type: "Leave Request", status: "Pending", date: "2026-07-20" },
                      { id: 2, type: "Expense Report", status: "Pending", date: "2026-07-18" },
                    ].map((req) => (
                      <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{req.type}</p>
                          <p className="text-xs text-gray-500 mt-1">{req.date}</p>
                        </div>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">{req.status}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Files */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h3>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Q3 Report.pdf", modified: "2 hours ago" },
                      { id: 2, name: "Meeting Notes.docx", modified: "1 day ago" },
                      { id: 3, name: "Budget 2026.xlsx", modified: "3 days ago" },
                    ].map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{file.modified}</p>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
