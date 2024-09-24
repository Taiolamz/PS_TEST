import { cn } from '@/lib/utils';
import React from 'react';

interface CardContainerProps {
    children: React.ReactNode,
    className?: string
}

const CardContainer = ({children, className}:CardContainerProps) => {
    return (
        <div className={cn(
            'bg-white rounded-md p-5',
            className
        )}>
            {children}
        </div>
    );
}

export default CardContainer;
