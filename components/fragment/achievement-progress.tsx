import React from 'react';
import ReusableProgress from './progress/reusable-progress';

/*
    ========= Usage ============== 
  <AchievementProgress
        title="Revenue"
        progress_value={65}
        color="yellow"
        target="1,000,000,000,000 $"
        targetColor="#6B51DF"
    />
    <AchievementProgress
        title="Platinum Customer Acquisition"
        progress_value={40}
        color="red"
        target="15"
        targetColor="#6B51DF"
    /> 
*/

interface AchievementProgressProps {
    title: string,
    progress_value: number,
    color: 'red' | 'green' | 'yellow' | 'purple' | 'brown' | 'default',
    target?: string,
    targetColor?: string,
}

const AchievementProgress = ({ title, progress_value, color, target, targetColor }: AchievementProgressProps) => {
    return (
        <div>
            <span className='text-[#5A5B5F] text-sm'>{title}</span>
            <ReusableProgress
                value={progress_value}
                color={color}
                valuePosition='float-right'
                borderRadius={2}
                height={16}
                hasBackground={false}
            />
            <div className='mt-1 bg-[#FCF0FF] text-[10px] font-semibold'
                style={{
                    color: targetColor
                }}
            >{target}</div>
        </div>
    );
}

export default AchievementProgress;
