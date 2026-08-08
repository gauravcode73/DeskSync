import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockEmployees } from "@/lib/mockData";
import { Plus, Search, Mail, Phone, MapPin, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function HR() {
  const [activeTab, setActiveTab] = useState<"employees" | "requests">("employees");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leaveRequests = [
    { id: 1, employee: "Sarah Johnson", type: "Annual Leave", days: 5, status: "Pending", date: "2026-07-20" },
    { id: 2, employee: "Mike Chen", type: "Sick Leave", days: 2, status: "Approved", date: "2026-07-18" },
    { id: 3, employee: "Emma Davis", type: "Personal Leave", days: 3, status: "Pending", date: "2026-07-25" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Management</h1>
          <p className="text-gray-600 mt-1">Manage employees and leave requests</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("employees")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "employees"
              ? "border-purple-600 text-purple-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Employees
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "requests"
              ? "border-purple-600 text-purple-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Leave Requests
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder={`Search ${activeTab === "employees" ? "employees" : "requests"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employees Tab */}
      {activeTab === "employees" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <Card key={emp.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{emp.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{emp.role}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{emp.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{emp.name.toLowerCase().replace(" ", ".")}@company.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  {emp.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full" size="sm">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No employees found</p>
            </div>
          )}
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {leaveRequests.map((request) => (
            <Card key={request.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{request.employee}</h3>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-900">{request.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{request.days} days</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{request.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : request.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {request.status}
                  </span>

                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
