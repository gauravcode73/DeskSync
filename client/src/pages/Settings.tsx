import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockRoles, mockEmployees } from "@/lib/mockData";
import { Settings as SettingsIcon, Users, Lock, Bell, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"general" | "roles" | "members" | "security">("general");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage organization and account settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
        {[
          { id: "general", label: "General", icon: SettingsIcon },
          { id: "roles", label: "Roles & Permissions", icon: Lock },
          { id: "members", label: "Members", icon: Users },
          { id: "security", label: "Security", icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-purple-600 text-purple-600 font-medium"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6 max-w-2xl">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Profile</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName" className="text-gray-700 font-medium">
                  Organization Name
                </Label>
                <Input id="orgName" defaultValue="DeskSync Inc" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="orgEmail" className="text-gray-700 font-medium">
                  Organization Email
                </Label>
                <Input id="orgEmail" type="email" defaultValue="admin@desksync.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="orgWebsite" className="text-gray-700 font-medium">
                  Website
                </Label>
                <Input id="orgWebsite" defaultValue="https://desksync.com" className="mt-2" />
              </div>
              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
            <p className="text-sm text-red-800 mb-4">
              Deleting your organization is permanent and cannot be undone.
            </p>
            <Button variant="destructive">Delete Organization</Button>
          </Card>
        </div>
      )}

      {/* Roles & Permissions */}
      {activeTab === "roles" && (
        <div className="space-y-4">
          {mockRoles.map((role) => (
            <Card key={role.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>Permissions: {role.permissions}</span>
                    <span>Users: {role.users}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Members */}
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>

          {mockEmployees.map((emp) => (
            <Card key={emp.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                  <p className="text-sm text-gray-600">{emp.role} • {emp.department}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="space-y-6 max-w-2xl">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-gray-700 font-medium">
                  Current Password
                </Label>
                <Input id="currentPassword" type="password" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-gray-700 font-medium">
                  New Password
                </Label>
                <Input id="newPassword" type="password" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <Input id="confirmPassword" type="password" className="mt-2" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <p className="text-gray-600 mb-4">
              Add an extra layer of security to your account
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {[
                { device: "Chrome on Windows", location: "New York, USA", lastActive: "Now" },
                { device: "Safari on macOS", location: "San Francisco, USA", lastActive: "2 hours ago" },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.device}</p>
                    <p className="text-sm text-gray-600">{session.location} • {session.lastActive}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Sign Out
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
