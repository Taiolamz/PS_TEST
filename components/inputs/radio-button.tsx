import { cn } from '@/lib/utils';
import React from 'react';

interface RadioButtonLabelProps {
    id?: string | number,
    isActive: boolean,
    label?: string,
    onClick?: () => void
}

const RadioButtonLabel = ({isActive, label, onClick}: RadioButtonLabelProps) => {
    return (
        <div className='flex items-center gap-2 cursor-pointer'
            onClick={onClick}
        >
            <span className={cn(
                "grid place-content-center w-4 h-4 rounded-full border p-1",
                isActive && "border-[var(--primary-color)]"
            )}>
                <span className={cn(
                    'block w-2.5 h-2.5 bg-gray-300 rounded-full',
                    isActive && "bg-[var(--primary-color)]"
                )}></span>
            </span>
            <span className={cn(
                'text-sm text-gray-400',
                isActive && "text-gray-600"
            )}>{label}</span>
        </div>
    );
}

export default RadioButtonLabel;
