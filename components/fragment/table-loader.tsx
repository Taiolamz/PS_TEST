import React from "react";
import { Skeleton } from "../ui/skeleton";

interface TableLoaderProps {
  rows: number;
  columns: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ rows, columns }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table border={1} className="min-w-full bg-muted border">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index} className="py-2.5 px-4 border">
                <Skeleton className="bg-[var(--primary-accent-color)] h-1.5 rounded-sm" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex} className="p-3 border">
                  <Skeleton className="bg-[var(--primary-accent-color)] h-1.5 rounded-sm " />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
