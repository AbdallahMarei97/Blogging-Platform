"use client";

import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<TData> {
  id: string;
  className?: string;
  header: string;
  cell?: (item: TData) => ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
}: {
  data: TData[];
  columns: Column<TData>[];
}) {
  return (
    <Table>
      {!data?.length && <TableCaption>No posts Available</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className={cn(column.className, "text-center")}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={cn(column.className, "text-center")}
              >
                {column.cell?.(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
