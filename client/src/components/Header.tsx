import useAuth from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import LogInDialog from "./LogInDialog.tsx";
import OnlineUsers from "./OnlineUsers.tsx";
import { Button } from "./ui/button.tsx";

function User() {
  const { getUsername } = useAuth();
  return (
    <section className="flex gap-2">
      <UserIcon />
      {getUsername()}
    </section>
  );
}

export function Header() {
  const { getUsername, removeUsername } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getUsername());

  return (
    <header className="flex items-center justify-between px-6 py-4 h-[50px]">
      <h1 className="text-4xl">Dashboard</h1>
      <section className="flex gap-10 items-center">
        <OnlineUsers />
        {isLoggedIn ? (
          <>
            <User />
            <Button
              variant="outline"
              onClick={async () => {
                await removeUsername();
                setIsLoggedIn(false);
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <LogInDialog setIsLoggedIn={setIsLoggedIn} />
        )}
      </section>
    </header>
  );
}
