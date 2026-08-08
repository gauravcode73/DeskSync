export const mockKPIs = {
  employees: { value: 245, change: 12, trend: "up" },
  departments: { value: 8, change: 2, trend: "up" },
  tasks: { value: 1234, change: -5, trend: "down" },
  pendingApprovals: { value: 23, change: 8, trend: "up" },
  meetingsToday: { value: 12, change: 3, trend: "up" },
  storageUsed: { value: "245 GB", change: 15, trend: "up" },
};

export const mockTaskOverview = [
  { name: "Completed", value: 45, fill: "oklch(0.7 0.2 280)" },
  { name: "In Progress", value: 30, fill: "oklch(0.65 0.22 270)" },
  { name: "Pending", value: 20, fill: "oklch(0.6 0.2 260)" },
  { name: "Blocked", value: 5, fill: "oklch(0.55 0.18 250)" },
];

export const mockDepartmentPerformance = [
  { name: "Engineering", tasks: 120, completed: 95, employees: 45 },
  { name: "Design", tasks: 80, completed: 72, employees: 12 },
  { name: "Marketing", tasks: 60, completed: 48, employees: 8 },
  { name: "Sales", tasks: 100, completed: 85, employees: 20 },
  { name: "HR", tasks: 40, completed: 38, employees: 5 },
  { name: "Finance", tasks: 50, completed: 42, employees: 6 },
];

export const mockAttendanceData = [
  { date: "Mon", attendance: 92 },
  { date: "Tue", attendance: 95 },
  { date: "Wed", attendance: 88 },
  { date: "Thu", attendance: 96 },
  { date: "Fri", attendance: 85 },
];

export const mockRecentActivity = [
  { id: 1, user: "Sarah Johnson", action: "Created task", target: "Q4 Planning", time: "2 hours ago" },
  { id: 2, user: "Mike Chen", action: "Completed project", target: "Website Redesign", time: "4 hours ago" },
  { id: 3, user: "Emma Davis", action: "Approved request", target: "Budget Allocation", time: "1 day ago" },
  { id: 4, user: "James Wilson", action: "Started meeting", target: "Team Sync", time: "1 day ago" },
  { id: 5, user: "Lisa Anderson", action: "Uploaded file", target: "Q3 Report.pdf", time: "2 days ago" },
];

export const mockTopWorkspaces = [
  { id: 1, name: "Engineering Team", members: 45, activity: "High", lastActive: "2 hours ago" },
  { id: 2, name: "Marketing Campaign", members: 8, activity: "Medium", lastActive: "1 day ago" },
  { id: 3, name: "Product Launch", members: 23, activity: "High", lastActive: "30 mins ago" },
  { id: 4, name: "Design System", members: 12, activity: "Low", lastActive: "3 days ago" },
];

export const mockUpcomingMeetings = [
  { id: 1, title: "Team Standup", time: "10:00 AM", attendees: 8, room: "Conference A", status: "Scheduled" },
  { id: 2, title: "Client Presentation", time: "2:00 PM", attendees: 5, room: "Board Room", status: "Scheduled" },
  { id: 3, title: "1:1 with Manager", time: "3:30 PM", attendees: 2, room: "Office 204", status: "Scheduled" },
];

export const mockEmployeeDashboard = {
  attendance: { present: 245, absent: 8, onLeave: 12, workingRemote: 35 },
  myTasks: [
    { id: 1, title: "Review PR #234", status: "In Progress", dueDate: "Today", priority: "High" },
    { id: 2, title: "Update documentation", status: "To Do", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, title: "Design mockups", status: "In Progress", dueDate: "Friday", priority: "High" },
  ],
  upcomingMeetings: [
    { id: 1, title: "Team Sync", time: "10:00 AM", attendees: 8 },
    { id: 2, title: "1:1 with Manager", time: "2:00 PM", attendees: 2 },
  ],
  departmentUpdates: [
    { id: 1, title: "Q4 Goals Announced", date: "2 days ago", author: "Manager" },
    { id: 2, title: "New Team Member Onboarding", date: "1 week ago", author: "HR" },
  ],
  pendingRequests: [
    { id: 1, type: "Leave Request", status: "Pending", date: "3 days ago" },
    { id: 2, type: "Equipment Request", status: "Approved", date: "1 week ago" },
  ],
  recentFiles: [
    { id: 1, name: "Q3_Report.pdf", size: "2.4 MB", modified: "2 days ago" },
    { id: 2, name: "Design_System_v2.figma", size: "15 MB", modified: "1 week ago" },
  ],
  attendanceStats: { rate: 96, presentDays: 20, absenceDays: 1, leaveBalance: 12 },
};

export const mockTasks = [
  { id: 1, title: "Design landing page", assignee: "Sarah", priority: "High", dueDate: "2026-07-20", status: "In Progress" },
  { id: 2, title: "Fix login bug", assignee: "Mike", priority: "Critical", dueDate: "2026-07-18", status: "To Do" },
  { id: 3, title: "Write API docs", assignee: "John", priority: "Medium", dueDate: "2026-07-25", status: "In Progress" },
  { id: 4, title: "Review PR #234", assignee: "Emma", priority: "High", dueDate: "2026-07-19", status: "Review" },
  { id: 5, title: "Update dependencies", assignee: "James", priority: "Low", dueDate: "2026-07-30", status: "To Do" },
];

export const mockChatChannels = [
  { id: 1, name: "general", unread: 0, lastMessage: "See you at the meeting!" },
  { id: 2, name: "engineering", unread: 5, lastMessage: "PR review completed" },
  { id: 3, name: "design", unread: 2, lastMessage: "New mockups ready" },
  { id: 4, name: "random", unread: 0, lastMessage: "Coffee break time!" },
];

export const mockChatMessages = [
  { id: 1, user: "Sarah", avatar: "👩‍💼", message: "Hey team, just finished the design mockups!", time: "10:30 AM", attachment: { name: "Mockups_v2.figma", size: "2.4 MB" } },
  { id: 2, user: "Mike", avatar: "👨‍💻", message: "Great! I'll start integrating them today.", time: "10:32 AM" },
  { id: 3, user: "Sarah", avatar: "👩‍💼", message: "Perfect. Let me know if you need any clarifications.", time: "10:35 AM" },
  { id: 4, user: "Emma", avatar: "👩‍🔬", message: "Shared the latest test results", time: "11:00 AM", attachment: { name: "TestResults_Q3.xlsx", size: "1.8 MB" } },
];

export const mockDriveFiles = [
  { id: 1, name: "Q3_Report.pdf", owner: "Sarah Johnson", modified: "2 days ago", size: "2.4 MB", type: "PDF" },
  { id: 2, name: "Design_System_v2.figma", owner: "Mike Chen", modified: "1 week ago", size: "15 MB", type: "Figma" },
  { id: 3, name: "Budget_2026.xlsx", owner: "Emma Davis", modified: "3 days ago", size: "1.2 MB", type: "Excel" },
  { id: 4, name: "Meeting_Notes.docx", owner: "James Wilson", modified: "1 day ago", size: "0.8 MB", type: "Word" },
];

export const mockMeetingRooms = [
  { id: 1, name: "Conference Room A", capacity: 10, available: true, nextMeeting: "2:00 PM" },
  { id: 2, name: "Board Room", capacity: 20, available: false, nextMeeting: "Now" },
  { id: 3, name: "Meeting Room 1", capacity: 6, available: true, nextMeeting: "3:30 PM" },
  { id: 4, name: "Meeting Room 2", capacity: 6, available: true, nextMeeting: "Tomorrow" },
];

export const mockEmployees = [
  { id: 1, name: "Sarah Johnson", role: "Product Manager", department: "Product", status: "Active" },
  { id: 2, name: "Mike Chen", role: "Senior Engineer", department: "Engineering", status: "Active" },
  { id: 3, name: "Emma Davis", role: "Designer", department: "Design", status: "Active" },
  { id: 4, name: "James Wilson", role: "Marketing Manager", department: "Marketing", status: "Active" },
  { id: 5, name: "Lisa Anderson", role: "HR Manager", department: "HR", status: "Active" },
];

export const mockRoles = [
  { id: 1, name: "Organization Owner", permissions: 100, users: 1 },
  { id: 2, name: "Admin", permissions: 95, users: 2 },
  { id: 3, name: "HR Admin", permissions: 60, users: 1 },
  { id: 4, name: "Department Manager", permissions: 50, users: 5 },
  { id: 5, name: "Team Lead", permissions: 40, users: 8 },
  { id: 6, name: "Employee", permissions: 20, users: 228 },
  { id: 7, name: "Guest", permissions: 5, users: 0 },
];
