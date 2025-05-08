'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function UserTableSkeleton() {
  // Array para criar múltiplas linhas de skeleton
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-5 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-16" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-5 w-16 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[90px]" />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <div className="flex justify-end space-x-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
