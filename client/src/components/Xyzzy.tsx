import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type XyzzyData = {
  fred: string;
  plugh: string;
  thud: string;
  qux: string;
};

const xyzzy: XyzzyData[] = [
  {
    fred: "INV001",
    plugh: "Paid",
    thud: "$250.00",
    qux: "Credit Card",
  },
  {
    fred: "INV002",
    plugh: "Pending",
    thud: "$150.00",
    qux: "PayPal",
  },
  {
    fred: "INV003",
    plugh: "Unpaid",
    thud: "$350.00",
    qux: "Bank Transfer",
  },
  {
    fred: "INV004",
    plugh: "Paid",
    thud: "$450.00",
    qux: "Credit Card",
  },
  {
    fred: "INV005",
    plugh: "Paid",
    thud: "$550.00",
    qux: "PayPal",
  },
  {
    fred: "INV006",
    plugh: "Pending",
    thud: "$200.00",
    qux: "Bank Transfer",
  },
  {
    fred: "INV007",
    plugh: "Unpaid",
    thud: "$300.00",
    qux: "Credit Card",
  },
];

export function Xyzzy() {
  const columnHelper = createColumnHelper<XyzzyData>();

  const columns = [
    columnHelper.accessor("fred", {
      header: () => "Fred",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("plugh", {
      cell: (info) => info.getValue(),
      header: () => "Plugh",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("thud", {
      cell: (info) => info.getValue(),
      header: () => "Fred",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("qux", {
      cell: (info) => info.getValue(),
      header: () => "Qux",
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    columns,
    data: xyzzy,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-[400px] flex-auto self-stretch">
      <CardHeader>
        <CardTitle className="text-center uppercase font-thin">Xyzzy</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {xyzzy.map((fred) => (
              <TableRow key={fred.fred}>
                <TableCell className="font-medium">{fred.fred}</TableCell>
                <TableCell>{fred.plugh}</TableCell>
                <TableCell>{fred.qux}</TableCell>
                <TableCell className="text-right">{fred.thud}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
