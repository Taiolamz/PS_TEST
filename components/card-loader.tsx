import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function CardSkeletonLoader() {
    return (
        <div className="py-20 rounded-b-[10px] w-full grid place-content-center text-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}
