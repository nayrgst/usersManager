import { Skeleton } from '@/components/ui/skeleton';

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-5">
          <div className="flex items-center mb-4 md:mb-0">
            <Skeleton className="h-6 w-6 mr-2" />
            <Skeleton className="h-6 w-56" />
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto text-center px-4">
            <Skeleton className="h-12 w-[500px] max-w-full mx-auto mb-6" />
            <Skeleton className="h-6 w-[400px] max-w-full mx-auto mb-8" />
            <div className="flex justify-center gap-4 flex-wrap">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-36" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary text-center">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mx-auto mb-12" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-lg shadow-xl bg-sidebar">
                  <Skeleton className="h-6 w-48 mx-auto mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
