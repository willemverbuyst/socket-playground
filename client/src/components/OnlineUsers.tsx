import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import { List, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

function OnlineUsersIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <List />
        </TooltipTrigger>
        <TooltipContent>
          <p>Display a list of the users that are online</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function OnlineUsers() {
  const { getUsername } = useAuth();
  const [users, setUsers] = useState([getUsername()]);

  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/stream");

    sse.onmessage = (e) => {
      const onlineUsers = JSON.parse(e.data)?.onlineUsers;
      if (onlineUsers) {
        setUsers(onlineUsers);
      } else {
        console.warn("Something wrong with the onlineUsers");
      }
    };
    sse.onerror = (error) => {
      console.log("ERROR", error);

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <OnlineUsersIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Online users</DrawerTitle>
          <DrawerDescription>
            This is a list of the users that have logged in and can see the
            extra features.
          </DrawerDescription>
        </DrawerHeader>
        <ul>
          {users.map((username, index) => (
            <li key={index} className="flex gap-4 p-4">
              <span>
                <UserCircle className="text-green-700" />
              </span>
              <span>{username}</span>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
