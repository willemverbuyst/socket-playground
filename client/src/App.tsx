import { useState } from "react";
import DashboardPage from "./components/DashboardPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import useAuth from "./hooks/useAuth.ts";

export default function App() {
  const { getUsername } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getUsername());

  return (
    <main className="w-screen min-h-screen p-20 flex flex-col items-center gap-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SocketIO
      </h1>
      {isLoggedIn ? (
        <DashboardPage />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
      <Toaster />
    </main>
  );
}
