import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Garply = { id: string; fuga: string; foo: string; bar: number };

export function Garply() {
  const [garplies, setGarplies] = useState<Garply[]>([]);

  useEffect(() => {
    const sse = new EventSource("http://localhost:8086/stream");

    sse.onmessage = (e) => {
      const garplies = JSON.parse(e.data)?.data;

      if (garplies) {
        setGarplies(garplies);
      } else {
        console.warn("Something wrong with the garplies");
      }
    };
    sse.onerror = (error) => {
      console.error("ERROR", error);

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <Card className="w-[150px] flex-auto">
      <CardHeader>
        <CardTitle className="text-center uppercase font-thin">
          Garply
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Latest 5 garply</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Fuga</TableHead>
              <TableHead>Foo</TableHead>
              <TableHead className="text-right">Bar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {garplies.map((g) => (
              <TableRow key={g.id}>
                <TableCell className="font-medium">{g.fuga}</TableCell>
                <TableCell>{g.foo}</TableCell>
                <TableCell className="text-right">{g.bar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {garplies.reduce((a, b) => a + b.bar, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
