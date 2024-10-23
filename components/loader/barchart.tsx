import { CardContainer } from "../fragment";
import { Skeleton } from "../ui/skeleton";


export default function BarChartSkeleton() {
    return (
        <CardContainer className="space-y-4 w-full max-w-6xl mx-auto my-6">
            {/* Chart Title Skeleton */}

            <div className="relative h-64 flex items-end justify-around px-4">
                {/* Bar skeletons with random heights touching the base */}
                <div className="flex flex-col items-center space-y-2">

                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-16 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-10 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-8 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-28 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-8 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-16 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-24 rounded-none" /> {/* First bar */}
                    <Skeleton className="w-4 h-32 rounded-none" /> {/* Second bar */}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-36 rounded-none" />
                    <Skeleton className="w-4 h-20 rounded-none" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-20 rounded-none" />
                    <Skeleton className="w-4 h-24 rounded-none" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-30 rounded-none" />
                    <Skeleton className="w-4 h-32 rounded-none" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="w-4 h-12 rounded-none" />
                    <Skeleton className="w-4 h-8 rounded-none" />
                </div>
            </div>

            {/* Achievement Average Skeleton */}
            <Skeleton className="h-4 w-full mx-auto rounded-none" />
        </CardContainer>
    );
}
