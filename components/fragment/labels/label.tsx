import { Dictionary } from '@/@types/dictionary';
import { cn } from '@/lib/utils';
import React from 'react';

interface ReusableLabelProps {
    title?: string
    value?: string | any,
    titleClass?: string,
    valueClass?: string,
    style?: Dictionary
}

const ReusableLabel = ({ title, value, titleClass, valueClass, style }: ReusableLabelProps) => {
    return (
        <div className='flex items-center'>
            {title && <span className={cn(
                'text-[#3E4345]',
                titleClass
            )}>{title}</span>}
            {value && <span className={cn(
                'text-gray-500 text-sm',
                valueClass
            )} style={style}>: {value}</span>}
        </div>
    );
}

export default ReusableLabel;
