import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockUpcomingMeetings, mockMeetingRooms } from "@/lib/mockData";
import { Plus, Search, Calendar, Users, Phone, Video } from "lucide-react";
import { useState } from "react";

export default function Meetings() {
  const [activeTab, setActiveTab] = useState<"scheduled" | "rooms">("scheduled");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeetings = mockUpcomingMeetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRooms = mockMeetingRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-600 mt-1">Schedule and manage meetings</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "scheduled"
              ? "border-purple-600 text-purple-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Scheduled Meetings
        </button>
        <button
          onClick={() => setActiveTab("rooms")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "rooms"
              ? "border-purple-600 text-purple-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Meeting Rooms
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder={`Search ${activeTab === "scheduled" ? "meetings" : "rooms"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Scheduled Meetings */}
      {activeTab === "scheduled" && (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{meeting.room}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{meeting.attendees} attendees</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {meeting.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Video className="w-4 h-4 mr-2" />
                    Join
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredMeetings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No meetings found</p>
              <p className="text-gray-500 text-sm mt-1">Schedule a new meeting to get started</p>
            </div>
          )}
        </div>
      )}

      {/* Meeting Rooms */}
      {activeTab === "rooms" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Capacity: {room.capacity} people</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${room.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {room.available ? "Available" : "In Use"}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Next: {room.nextMeeting}</span>
                </div>

                {/* Availability Indicator */}
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-medium mb-2">Today's Schedule</p>
                  <div className="flex gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-sm ${
                          i < 3 ? "bg-green-400" : i < 5 ? "bg-red-400" : "bg-green-400"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                {room.available ? "Book Now" : "View Schedule"}
              </Button>
            </Card>
          ))}

          {filteredRooms.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <Phone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No rooms found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
