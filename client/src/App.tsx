import { useState } from "react";
import DashboardPage from "./components/DashboardPage.tsx";
import LogInDialog from "./components/LogInDialog.tsx";
import { Button } from "./components/ui/button.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import useAuth from "./hooks/useAuth.ts";

export default function App() {
  const { getUsername, removeUsername } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getUsername());

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px]">
          <h1 className="text-4xl">Dashboard</h1>
          {isLoggedIn ? (
            <Button
              variant="outline"
              onClick={async () => {
                await removeUsername();
                setIsLoggedIn(false);
              }}
            >
              Log out
            </Button>
          ) : (
            <LogInDialog setIsLoggedIn={setIsLoggedIn} />
          )}
        </header>
        <Separator />
        <main className="overflow-auto">
          <div className="flex justify-center py-10">
            <DashboardPage />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
