import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Users, Video, Clock, MapPin, Download, Play } from "lucide-react";

const mockMeetingRooms = [
  { id: 1, name: "Conference Room A", capacity: 10, floor: 2, nextMeeting: "10:00 AM - Team Standup", status: "Available" },
  { id: 2, name: "Board Room", capacity: 20, floor: 3, nextMeeting: "2:00 PM - Client Meeting", status: "Booked" },
  { id: 3, name: "Meeting Room 101", capacity: 6, floor: 1, nextMeeting: "3:30 PM - 1:1 with Manager", status: "Available" },
  { id: 4, name: "Video Conference Room", capacity: 15, floor: 2, nextMeeting: "Available all day", status: "Available" },
];

const mockScheduledMeetings = [
  { id: 1, title: "Team Standup", time: "10:00 AM", duration: 30, room: "Conference Room A", attendees: 8, status: "Scheduled" },
  { id: 2, title: "Client Presentation", time: "2:00 PM", duration: 60, room: "Board Room", attendees: 5, status: "In Progress" },
  { id: 3, title: "1:1 with Manager", time: "3:30 PM", duration: 30, room: "Meeting Room 101", attendees: 2, status: "Scheduled" },
  { id: 4, title: "Design Review", time: "4:00 PM", duration: 45, room: "Conference Room A", attendees: 12, status: "Scheduled" },
];

const mockRecordings = [
  { id: 1, title: "Q3 Planning Session", date: "2026-07-15", duration: "1h 23m", size: "245 MB", views: 34 },
  { id: 2, title: "Product Demo", date: "2026-07-14", duration: "45m", size: "156 MB", views: 67 },
  { id: 3, title: "Team Retrospective", date: "2026-07-12", duration: "1h 15m", size: "198 MB", views: 45 },
  { id: 4, title: "Investor Presentation", date: "2026-07-10", duration: "2h 10m", size: "412 MB", views: 89 },
];

export default function MeetingsAdvanced() {
  const [activeTab, setActiveTab] = useState<"rooms" | "scheduled" | "recordings" | "booking">("rooms");
  const [selectedRoom, setSelectedRoom] = useState<typeof mockMeetingRooms[0] | null>(null);
  const [bookingForm, setBookingForm] = useState({
    title: "",
    room: "",
    date: "",
    startTime: "",
    duration: "",
    attendees: "",
  });

  const handleBooking = () => {
    console.log("Booking:", bookingForm);
    setBookingForm({ title: "", room: "", date: "", startTime: "", duration: "", attendees: "" });
    setActiveTab("scheduled");
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Meetings</h1>
        <div className="flex gap-2 border-b border-gray-200">
          {["rooms", "scheduled", "recordings", "booking"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "rooms" && "Meeting Rooms"}
              {tab === "scheduled" && "Scheduled"}
              {tab === "recordings" && "Recordings"}
              {tab === "booking" && "Book Meeting"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Meeting Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMeetingRooms.map((room) => (
              <Card
                key={room.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-600">Floor {room.floor}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Capacity: {room.capacity} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{room.nextMeeting}</span>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Scheduled Meetings Tab */}
        {activeTab === "scheduled" && (
          <div className="space-y-4">
            {mockScheduledMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{meeting.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time} ({meeting.duration}m)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{meeting.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{meeting.attendees} attendees</span>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            meeting.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Video className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Recordings Tab */}
        {activeTab === "recordings" && (
          <div className="space-y-4">
            {mockRecordings.map((recording) => (
              <Card key={recording.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{recording.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-gray-900">{recording.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="font-medium text-gray-900">{recording.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Size</p>
                        <p className="font-medium text-gray-900">{recording.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Views</p>
                        <p className="font-medium text-gray-900">{recording.views} views</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Booking Tab */}
        {activeTab === "booking" && (
          <Card className="p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
                <Input
                  placeholder="e.g., Team Standup"
                  value={bookingForm.title}
                  onChange={(e) => setBookingForm({ ...bookingForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Choose a room...</option>
                  {mockMeetingRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} (Capacity: {room.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Input type="date" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <Input type="time" value={bookingForm.startTime} onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <Input type="number" placeholder="30" value={bookingForm.duration} onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Attendees</label>
                  <Input type="number" placeholder="5" value={bookingForm.attendees} onChange={(e) => setBookingForm({ ...bookingForm, attendees: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleBooking} className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Meeting
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("scheduled")}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
