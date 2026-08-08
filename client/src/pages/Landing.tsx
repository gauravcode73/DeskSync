import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { ArrowRight, Check } from "lucide-react";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="font-bold text-lg text-gray-900">DeskSync</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#modules" className="text-gray-600 hover:text-gray-900 transition-colors">
              Modules
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button onClick={handleSignUp} className="bg-purple-600 hover:bg-purple-700">
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 animate-slide-in-down">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Beautifully.</span> <br />
                  Together.
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  A complete enterprise collaboration platform designed to bring your team closer, boost productivity, and streamline your workflow — all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleSignUp}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">1,000+</span> teams trust DeskSync
                </p>
              </div>
            </div>

            {/* Right - 3D Scene */}
            <div className="perspective-1000 h-96 lg:h-full min-h-96 relative">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Floating Browser Tab */}
                <div
                  className="absolute animate-float"
                  style={{
                    transform: "rotateX(15deg) rotateZ(-5deg) translateZ(100px)",
                    animation: "float 6s ease-in-out infinite",
                  }}
                >
                  <div className="bg-white rounded-lg shadow-2xl border border-purple-100 overflow-hidden w-72 h-48">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-8 flex items-center px-3 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-white text-xs font-semibold ml-auto">desksync.app</span>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="space-y-2">
                        <div className="h-3 bg-purple-100 rounded w-3/4"></div>
                        <div className="h-3 bg-purple-100 rounded w-1/2"></div>
                        <div className="h-3 bg-purple-100 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monitor */}
                <div
                  className="absolute"
                  style={{
                    transform: "rotateX(5deg) rotateY(-10deg)",
                  }}
                >
                  <div className="w-80 h-56 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl border-4 border-gray-900 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold text-sm mb-2">Dashboard</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-12 h-12 bg-purple-500/40 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Monitor Stand */}
                  <div className="flex justify-center mt-2">
                    <div className="w-24 h-4 bg-gray-800 rounded-b-lg"></div>
                  </div>
                </div>

                {/* Keyboard */}
                <div
                  className="absolute"
                  style={{
                    transform: "rotateX(20deg) rotateY(15deg) translateZ(-50px)",
                    bottom: "-40px",
                    left: "-80px",
                  }}
                >
                  <div className="w-64 h-20 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-2 flex gap-1 flex-wrap items-start content-start">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gray-700 rounded border border-gray-600"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Mouse */}
                <div
                  className="absolute"
                  style={{
                    transform: "rotateX(10deg) rotateY(-20deg) rotateZ(30deg)",
                    bottom: "-20px",
                    right: "-60px",
                  }}
                >
                  <div className="w-12 h-20 bg-gray-800 rounded-full shadow-lg border border-gray-700 relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div
                  className="absolute animate-float"
                  style={{
                    top: "20px",
                    right: "40px",
                    animation: "float 8s ease-in-out infinite",
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-300 rounded-full shadow-lg opacity-60"></div>
                </div>

                <div
                  className="absolute animate-float"
                  style={{
                    bottom: "60px",
                    left: "20px",
                    animation: "float 7s ease-in-out infinite",
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-300 rounded-lg shadow-lg opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your organization, from team collaboration to advanced analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Team Collaboration",
                desc: "Real-time chat, video meetings, and file sharing",
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                desc: "Comprehensive insights into team performance",
              },
              {
                icon: "✅",
                title: "Task Management",
                desc: "Kanban boards and task tracking",
              },
              {
                icon: "📁",
                title: "File Storage",
                desc: "Secure cloud storage with version control",
              },
              {
                icon: "🔐",
                title: "Role-Based Access",
                desc: "Granular permissions and security controls",
              },
              {
                icon: "🤖",
                title: "AI Assistant",
                desc: "Intelligent automation and insights",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-purple-100 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Core Modules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Dashboard & Analytics",
              "Workspace Hub",
              "Chat & Messaging",
              "Tasks & Projects",
              "Drive & Files",
              "Meetings & Rooms",
              "HR Management",
              "Settings & Admin",
            ].map((module, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center gap-4"
              >
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-lg font-medium text-gray-900">{module}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using DeskSync to collaborate better and work smarter.
          </p>
          <Button
            onClick={handleSignUp}
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 DeskSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
