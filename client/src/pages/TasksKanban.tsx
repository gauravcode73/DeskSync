import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, MessageSquare, Paperclip, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const mockTasks = {
  "to-do": [
    { id: 1, title: "Design new dashboard", assignee: "Sarah", priority: "High", dueDate: "2026-07-20", subtasks: 3, comments: 2, attachments: 1 },
    { id: 2, title: "Update API documentation", assignee: "Mike", priority: "Medium", dueDate: "2026-07-22", subtasks: 1, comments: 0, attachments: 0 },
  ],
  "in-progress": [
    { id: 3, title: "Implement user authentication", assignee: "Emma", priority: "High", dueDate: "2026-07-19", subtasks: 5, comments: 4, attachments: 2 },
    { id: 4, title: "Fix responsive layout issues", assignee: "James", priority: "Medium", dueDate: "2026-07-21", subtasks: 2, comments: 1, attachments: 0 },
  ],
  "review": [
    { id: 5, title: "Code review: PR #234", assignee: "Lisa", priority: "High", dueDate: "2026-07-18", subtasks: 0, comments: 3, attachments: 1 },
  ],
  "completed": [
    { id: 6, title: "Setup development environment", assignee: "Alex", priority: "Low", dueDate: "2026-07-15", subtasks: 4, comments: 2, attachments: 0 },
    { id: 7, title: "Create project documentation", assignee: "Sarah", priority: "Medium", dueDate: "2026-07-16", subtasks: 2, comments: 1, attachments: 3 },
  ],
};

const columnConfig = {
  "to-do": { title: "To Do", color: "bg-gray-100", icon: AlertCircle },
  "in-progress": { title: "In Progress", color: "bg-blue-100", icon: Clock },
  "review": { title: "Review", color: "bg-yellow-100", icon: MessageSquare },
  "completed": { title: "Completed", color: "bg-green-100", icon: CheckCircle2 },
};

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: string;
  dueDate: string;
  subtasks: number;
  comments: number;
  attachments: number;
}

export default function TasksKanban() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = Object.entries(mockTasks).reduce((acc, [column, tasks]) => {
    acc[column as keyof typeof mockTasks] = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return acc;
  }, {} as typeof mockTasks);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tasks</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto flex-1">
        {Object.entries(columnConfig).map(([columnId, config]) => {
          const IconComponent = config.icon;
          return (
            <div key={columnId} className="flex-shrink-0 w-80">
              {/* Column Header */}
              <div className={`${config.color} rounded-lg p-4 mb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-gray-700" />
                    <h2 className="font-semibold text-gray-900">{config.title}</h2>
                  </div>
                  <span className="bg-white px-2 py-1 rounded text-sm font-medium text-gray-700">
                    {filteredTasks[columnId as keyof typeof mockTasks].length}
                  </span>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {filteredTasks[columnId as keyof typeof mockTasks].map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedTask(task)}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                      </div>
                      <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                      <div className="flex gap-3 text-xs text-gray-500">
                        {task.subtasks > 0 && <span>✓ {task.subtasks} subtasks</span>}
                        {task.comments > 0 && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> {task.comments}
                          </span>
                        )}
                        {task.attachments > 0 && (
                          <span className="flex items-center gap-1">
                            <Paperclip className="w-3 h-3" /> {task.attachments}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add Task Button */}
              <Button variant="outline" className="w-full mt-4 text-gray-600">
                <Plus className="w-4 h-4 mr-2" />
                Add task
              </Button>
            </div>
          );
        })}
      </div>

      {/* Task Detail Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTask.title}</h3>
                <div className="flex gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority} Priority
                  </span>
                </div>
              </div>

              {/* Assignee & Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assigned to</p>
                  <p className="font-medium text-gray-900">{selectedTask.assignee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Due Date</p>
                  <p className="font-medium text-gray-900">{selectedTask.dueDate}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">
                  This is a detailed description of the task. It contains information about what needs to be done, any specific requirements, and context for the assignee.
                </p>
              </div>

              {/* Subtasks */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Subtasks ({selectedTask.subtasks})</h4>
                <div className="space-y-2">
                  {Array.from({ length: selectedTask.subtasks }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <input type="checkbox" className="w-4 h-4" defaultChecked={i === 0} />
                      <span className="text-sm text-gray-700">Subtask {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {selectedTask.attachments > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Attachments ({selectedTask.attachments})</h4>
                  <div className="space-y-2">
                    {Array.from({ length: selectedTask.attachments }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Document_{i + 1}.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Comments ({selectedTask.comments})</h4>
                <div className="space-y-3">
                  {Array.from({ length: selectedTask.comments }).map((_, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-900">Team Member {i + 1}</p>
                      <p className="text-sm text-gray-600 mt-1">This is a comment on the task. Team members can discuss and collaborate here.</p>
                      <p className="text-xs text-gray-500 mt-2">{i + 1} hours ago</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Input placeholder="Add a comment..." className="text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
