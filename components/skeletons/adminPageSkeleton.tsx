import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserTableSkeleton } from '@/components/skeletons/userTableSkeleton';

export function AdminPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center my-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto mt-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="pt-6">
          <UserTableSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
