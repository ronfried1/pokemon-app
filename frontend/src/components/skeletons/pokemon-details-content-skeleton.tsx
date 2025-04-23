import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LoadingSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col">
        <div className="relative bg-card p-4 md:p-8 flex justify-center items-center min-h-[250px] md:min-h-[350px]">
          <div className="absolute top-4 right-4 z-10">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <Skeleton className="h-[180px] w-[180px] md:h-[250px] md:w-[250px] rounded-full" />
        </div>
        <div className="p-4 md:p-6 bg-card">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-20 w-full mb-6 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted p-4 md:p-6">
        <Tabs defaultValue="movements">
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-8">
            <TabsTrigger
              value="statistics"
              disabled
              className="flex-1 rounded-lg"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="movements"
              disabled
              className="flex-1 rounded-lg"
            >
              Movements
            </TabsTrigger>
            <TabsTrigger
              value="evolution"
              disabled
              className="flex-1 rounded-lg"
            >
              Evolution
            </TabsTrigger>
          </TabsList>
          <TabsContent value="movements">
            <div>
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full rounded-md" />
                  ))}
              </div>
              <div className="flex justify-center mt-4">
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
