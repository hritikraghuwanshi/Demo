import type * as React from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  isDark?: boolean;
  className?: string;
}

function Table<T>({
  columns,
  data,
  getRowKey,
  isDark = false,
  className = "",
}: TableProps<T>): React.ReactElement {
  return (
    <div className={`overflow-x-auto ${className}`.trim()}>
      <table className="w-full">
        <thead className={isDark ? "bg-slate-800/50" : "bg-slate-50"}>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {data.map((row) => (
            <tr
              key={getRowKey(row)}
              className={
                isDark
                  ? "hover:bg-slate-800/30 transition-colors"
                  : "hover:bg-slate-50 transition-colors"
              }
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 text-sm">
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
