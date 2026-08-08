import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockDepartmentPerformance, mockAttendanceData } from "@/lib/mockData";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const productivityData = [
    { week: "Week 1", productivity: 85, efficiency: 78 },
    { week: "Week 2", productivity: 88, efficiency: 82 },
    { week: "Week 3", productivity: 92, efficiency: 85 },
    { week: "Week 4", productivity: 89, efficiency: 83 },
  ];

  const departmentMetrics = [
    { name: "Engineering", tasks: 120, completed: 95, pending: 25 },
    { name: "Design", tasks: 80, completed: 72, pending: 8 },
    { name: "Marketing", tasks: 60, completed: 48, pending: 12 },
    { name: "Sales", tasks: 100, completed: 85, pending: 15 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Organization insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: "1,234", change: "+12%" },
          { label: "Completion Rate", value: "87%", change: "+5%" },
          { label: "Team Productivity", value: "89%", change: "+3%" },
          { label: "Avg Response Time", value: "2.4h", change: "-8%" },
        ].map((kpi, i) => (
          <Card key={i} className="p-4">
            <p className="text-sm text-gray-600 mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="text-sm text-green-600 font-medium">{kpi.change}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="productivity" stroke="oklch(0.7 0.2 280)" strokeWidth={2} />
              <Line type="monotone" dataKey="efficiency" stroke="oklch(0.65 0.22 270)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Department Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="oklch(0.7 0.2 280)" />
              <Bar dataKey="pending" fill="oklch(0.6 0.2 260)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Attendance & Task Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="oklch(0.7 0.2 280)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Task Completion by Department */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Rate</h3>
          <div className="space-y-4">
            {departmentMetrics.map((dept) => {
              const completionRate = Math.round((dept.completed / dept.tasks) * 100);
              return (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Tasks</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Completed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Pending</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Completion %</th>
              </tr>
            </thead>
            <tbody>
              {departmentMetrics.map((dept) => (
                <tr key={dept.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{dept.name}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.tasks}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.completed}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.pending}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {Math.round((dept.completed / dept.tasks) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
