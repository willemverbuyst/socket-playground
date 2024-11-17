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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const garply = [
  {
    fuga: "FHV001",
    status: "Done",
    number: 250,
  },
  {
    fuga: "FHV002",
    status: "Active",
    number: 150,
  },
  {
    fuga: "FHV003",
    status: "Requested",
    number: 350,
  },
  {
    fuga: "FHV004",
    status: "Requested",
    number: 450,
  },
  {
    fuga: "FHV005",
    status: "Active",
    number: 550,
  },
];

export function Garply() {
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
            {garply.map((g) => (
              <TableRow key={g.fuga}>
                <TableCell className="font-medium">{g.fuga}</TableCell>
                <TableCell>{g.status}</TableCell>
                <TableCell className="text-right">{g.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {garply.reduce((a, b) => a + b.number, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
