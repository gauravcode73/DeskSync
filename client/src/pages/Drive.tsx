import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockDriveFiles } from "@/lib/mockData";
import { Plus, Upload, Search, FileText, MoreVertical, Download, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Drive() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = mockDriveFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStorage = 500; // GB
  const usedStorage = 245; // GB
  const usagePercent = (usedStorage / totalStorage) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drive</h1>
          <p className="text-gray-600 mt-1">Manage files and documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Storage Overview */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage</h3>

            {/* Storage Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-full transition-all"
                  style={{ width: `${usagePercent}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {usedStorage} GB of {totalStorage} GB used
              </p>
            </div>

            {/* Storage Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Documents</span>
                <span className="font-medium text-gray-900">120 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Images</span>
                <span className="font-medium text-gray-900">80 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Videos</span>
                <span className="font-medium text-gray-900">45 GB</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4" size="sm">
              Upgrade Storage
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Recent Files
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Content - Files */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Files List */}
          <Card className="overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredFiles.map((file) => (
                <div key={file.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.owner}</span>
                        <span>•</span>
                        <span>{file.modified}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {file.type}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No files found</p>
              <p className="text-gray-500 text-sm mt-1">Try uploading or creating a new file</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
