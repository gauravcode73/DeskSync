import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockChatChannels, mockChatMessages } from "@/lib/mockData";
import { Plus, Send, Hash, Search, Paperclip, Download } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [selectedChannel, setSelectedChannel] = useState(mockChatChannels[0]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar - Channels */}
      <div className="w-64 bg-white border-r border-gray-200 rounded-lg p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Channels</h2>
          <Button size="sm" variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input placeholder="Search channels..." className="pl-9 h-9" />
        </div>

        {/* Channels List */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          {mockChatChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedChannel.id === channel.id
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Hash className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium truncate">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                    {channel.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate ml-6">{channel.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col">
        {/* Channel Header */}
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">#{selectedChannel.name}</h2>
          <p className="text-sm text-gray-600 mt-1">Team collaboration channel</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockChatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-gray-900">{msg.user}</span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-700 mt-1">{msg.message}</p>
                {msg.attachment && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{(msg as any).attachment.name}</p>
                        <p className="text-xs text-gray-500">{(msg as any).attachment.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder={`Message #${selectedChannel.name}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="outline" size="sm" title="Attach file">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">Attach files or press Enter to send</p>
        </div>
      </div>
    </div>
  );
}
