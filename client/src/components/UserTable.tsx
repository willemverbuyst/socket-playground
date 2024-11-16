import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UserTable() {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-center uppercase font-thin">
          A list of online users
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((username, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
