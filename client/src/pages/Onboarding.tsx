import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { ArrowRight, Building2, Users } from "lucide-react";

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<"choice" | "create" | "join">("choice");
  const [orgName, setOrgName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgName.trim()) {
      toast.error("Please enter an organization name");
      return;
    }

    setLoading(true);
    try {
      toast.success(`Organization "${orgName}" created successfully!`);
      localStorage.setItem(
        "desksync-org",
        JSON.stringify({
          id: "org-" + Date.now(),
          name: orgName,
          role: "owner",
          createdAt: new Date().toISOString(),
        })
      );
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinOrg = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }

    setLoading(true);
    try {
      toast.success("Successfully joined organization!");
      localStorage.setItem(
        "desksync-org",
        JSON.stringify({
          id: "org-" + Date.now(),
          name: "Demo Organization",
          role: "employee",
          joinedAt: new Date().toISOString(),
        })
      );
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Invalid invite code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">DC</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">DeskSync</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name || "User"}!</h1>
          <p className="text-lg text-gray-600">Let's set up your organization</p>
        </div>

        {/* Choice Step */}
        {step === "choice" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create Organization */}
            <Card className="p-8 shadow-lg border-purple-100 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setStep("create")}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Organization</h2>
                  <p className="text-gray-600 mb-4">
                    Start a new organization and become the owner. You can invite team members later.
                  </p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Create New Organization
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Join Organization */}
            <Card className="p-8 shadow-lg border-purple-100 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setStep("join")}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Organization</h2>
                  <p className="text-gray-600 mb-4">
                    Have an invite code? Join an existing organization as a team member.
                  </p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Join with Invite Code
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Create Organization Step */}
        {step === "create" && (
          <Card className="p-8 shadow-lg border-purple-100">
            <div className="mb-6">
              <button
                onClick={() => setStep("choice")}
                className="text-purple-600 hover:text-purple-700 font-medium mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Create Organization</h2>
              <p className="text-gray-600 mt-2">
                Enter your organization name to get started. You will be set as the owner.
              </p>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div>
                <Label htmlFor="orgName" className="text-gray-700 font-medium">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="e.g., Acme Corporation"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="mt-2 border-purple-100 focus:ring-purple-500"
                  disabled={loading}
                />
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">You will be:</span> Organization Owner with full administrative access
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2"
                disabled={loading}
              >
                {loading ? "Creating Organization..." : "Create Organization"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>
        )}

        {/* Join Organization Step */}
        {step === "join" && (
          <Card className="p-8 shadow-lg border-purple-100">
            <div className="mb-6">
              <button
                onClick={() => setStep("choice")}
                className="text-purple-600 hover:text-purple-700 font-medium mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Join Organization</h2>
              <p className="text-gray-600 mt-2">
                Enter the invite code provided by your organization administrator.
              </p>
            </div>

            <form onSubmit={handleJoinOrg} className="space-y-4">
              <div>
                <Label htmlFor="inviteCode" className="text-gray-700 font-medium">
                  Invite Code
                </Label>
                <Input
                  id="inviteCode"
                  type="text"
                  placeholder="e.g., INVITE-ABC123XYZ"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="mt-2 border-purple-100 focus:ring-purple-500 font-mono"
                  disabled={loading}
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">You will be:</span> Team Member with access to assigned workspaces and tasks
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                disabled={loading}
              >
                {loading ? "Joining Organization..." : "Join Organization"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
