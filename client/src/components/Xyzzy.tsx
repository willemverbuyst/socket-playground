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
import { Checkbox } from "./ui/checkbox";

type XyzzyData = {
  fred: string;
  plugh: string;
  thud: string;
  qux: string;
  select: boolean;
};

const xyzzy: XyzzyData[] = [
  {
    fred: "INV001",
    plugh: "Paid",
    thud: "$250.00",
    qux: "Credit Card",
    select: false,
  },
  {
    fred: "INV002",
    plugh: "Pending",
    thud: "$150.00",
    qux: "PayPal",
    select: false,
  },
  {
    fred: "INV003",
    plugh: "Unpaid",
    thud: "$350.00",
    qux: "Bank Transfer",
    select: false,
  },
  {
    fred: "INV004",
    plugh: "Paid",
    thud: "$450.00",
    qux: "Credit Card",
    select: false,
  },
  {
    fred: "INV005",
    plugh: "Paid",
    thud: "$550.00",
    qux: "PayPal",
    select: false,
  },
  {
    fred: "INV006",
    plugh: "Pending",
    thud: "$200.00",
    qux: "Bank Transfer",
    select: false,
  },
  {
    fred: "INV007",
    plugh: "Unpaid",
    thud: "$300.00",
    qux: "Credit Card",
    select: false,
  },
];

export function Xyzzy() {
  const columnHelper = createColumnHelper<XyzzyData>();

  const columns = [
    columnHelper.accessor("select", {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
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
      header: () => "Thud",
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
