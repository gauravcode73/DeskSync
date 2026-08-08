import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardShell from "./components/DashboardShell";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Chat from "./pages/Chat";
import Tasks from "./pages/Tasks";
import Drive from "./pages/Drive";
import Meetings from "./pages/Meetings";
import HR from "./pages/HR";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import TasksKanban from "./pages/TasksKanban";
import MeetingsAdvanced from "./pages/MeetingsAdvanced";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard">
        <DashboardShell>
          <Home />
        </DashboardShell>
      </Route>
      <Route path="/workspace">
        <DashboardShell>
          <Workspace />
        </DashboardShell>
      </Route>
      <Route path="/chat">
        <DashboardShell>
          <Chat />
        </DashboardShell>
      </Route>
      <Route path="/tasks">
        <DashboardShell>
          <Tasks />
        </DashboardShell>
      </Route>
      <Route path="/tasks-kanban">
        <DashboardShell>
          <TasksKanban />
        </DashboardShell>
      </Route>
      <Route path="/drive">
        <DashboardShell>
          <Drive />
        </DashboardShell>
      </Route>
      <Route path="/meetings">
        <DashboardShell>
          <Meetings />
        </DashboardShell>
      </Route>
      <Route path="/meetings-advanced">
        <DashboardShell>
          <MeetingsAdvanced />
        </DashboardShell>
      </Route>
      <Route path="/hr">
        <DashboardShell>
          <HR />
        </DashboardShell>
      </Route>
      <Route path="/analytics">
        <DashboardShell>
          <Analytics />
        </DashboardShell>
      </Route>
      <Route path="/settings">
        <DashboardShell>
          <Settings />
        </DashboardShell>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
