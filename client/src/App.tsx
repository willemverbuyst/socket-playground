import { useState } from "react";
import DashboardPage from "./components/DashboardPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import useAuth from "./hooks/useAuth.ts";

export default function App() {
  const { getUsername } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getUsername());

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          Dashboard
        </header>
        <Separator />
        <main className="overflow-auto">
          <div className="flex justify-center py-10">
            {isLoggedIn ? (
              <DashboardPage />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
