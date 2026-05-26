import type { ReactNode } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type DataTableColumn<TRow> = {
  key: keyof TRow & string;
  header: ReactNode;
  render?: (row: TRow) => ReactNode;
};

type Props<TRow> = {
  columns: DataTableColumn<TRow>[];
  data: TRow[];
  getRowKey?: (row: TRow, index: number) => string | number;
  emptyMessage?: ReactNode;
};

function renderCell(value: unknown): ReactNode {
  if (value === null || value === undefined) return null;
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }
  if (value instanceof Date) return value.toISOString();
  return JSON.stringify(value);
}

export function DataTable<TRow extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
  emptyMessage = 'No data',
}: Props<TRow>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow key={getRowKey ? getRowKey(row, index) : index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row) : renderCell(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
