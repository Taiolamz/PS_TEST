import React from 'react';
import PercentageLabel from './labels/percentage';
import ReusableProgress from './progress/reusable-progress';
import { getProgressColorByValue } from '@/utils/helpers';

interface SingleExcutiveProgress {
    name: string,
    position: string,
    progress: number,
    onClick: () => void
}

const SingleExcutiveProgress = ({name, position, progress, onClick}: SingleExcutiveProgress) => {
    return (
        <div className="mb-4">
        <div className="mb-3 flex justify-between items-start">
            <div className="flex flex-col ">
                <h3 className="text-gray-500">{name}</h3>
                <span className="text-gray-400 text-sm font-light">{position}</span>
                <span className="mt-1 underline !text-[var(--primary-color)] text-xs cursor-pointer"
                    onClick={onClick}
                >Click here to see details</span>
            </div>
            <PercentageLabel value={progress} color={getProgressColorByValue(progress)}/>
        </div>
        <ReusableProgress color={getProgressColorByValue(progress)} value={progress} height={6} borderRadius={8}/>
    </div>
    );
}

export default SingleExcutiveProgress;