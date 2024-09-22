import { cn } from '@/lib/utils';
import React from 'react';

interface ReusableLabelProps {
    title?: string
    value?: string,
    titleClass?: string,
    valueClass?: string,
}

const ReusableLabel = ({title, value, titleClass, valueClass}: ReusableLabelProps) => {
    return (
        <div className='flex items-center'>
           {title && <span className={cn(
                'text-[#3E4345]',
                titleClass
            )}>{title}</span>}
           {value && <span className={cn(
                'text-gray-500 text-sm',
                valueClass
            )}>: {value}</span>}
        </div>
    );
}

export default ReusableLabel;
