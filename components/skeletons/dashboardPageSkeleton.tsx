// dashboardPageSkeleton.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Mail, User as UserIcon, CalendarDays } from 'lucide-react';

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-6 w-1/2 mx-auto">
      <div className="text-center my-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto mt-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="size-5 mr-3 text-muted-foreground" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="size-5 mr-3 text-muted-foreground" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-64" />
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="size-5 mr-3 text-muted-foreground" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-72" />
              </div>
            </div>

            <div className="flex items-center">
              <CalendarDays className="size-5 mr-3 text-muted-foreground" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
