import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockTopWorkspaces, mockMeetingRooms } from "@/lib/mockData";
import { Plus, Search, Users, Clock, Phone } from "lucide-react";

export default function Workspace() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workspace</h1>
          <p className="text-gray-600 mt-1">Manage workspaces and meeting rooms</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Workspace
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button className="px-4 py-2 border-b-2 border-purple-600 text-purple-600 font-medium">
          Workspaces
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Meeting Rooms
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input placeholder="Search workspaces..." className="pl-10" />
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTopWorkspaces.map((workspace) => (
          <Card key={workspace.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workspace.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{workspace.members} members</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${workspace.activity === "High" ? "bg-green-100 text-green-700" : workspace.activity === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                {workspace.activity}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{workspace.members} active members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last active: {workspace.lastActive}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                View
              </Button>
              <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                Join
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Meeting Rooms Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Meeting Rooms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockMeetingRooms.map((room) => (
            <Card key={room.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Capacity: {room.capacity} people</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${room.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {room.available ? "Available" : "In Use"}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>Next meeting: {room.nextMeeting}</span>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                {room.available ? "Book Now" : "View Schedule"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
