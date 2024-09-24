import { cn } from '@/lib/utils';
import React from 'react';

interface CardContainerProps {
    children: React.ReactNode,
    className?: string,
    title?: string | React.ReactNode
    subTitle?: string | React.ReactNode,
    titleRightContent?: string | React.ReactNode,
    titleClass?: string,
    subTitleClass?: string,
    titleRightContentClass?: string,
    titleRightClass?: string
}

const CardContainer = ({ children, className, title, subTitle, titleRightContent, titleClass, subTitleClass, titleRightClass, titleRightContentClass }: CardContainerProps) => {
    return (
        <div className={cn(
            'bg-white rounded-md p-5',
            className
        )}>
            {title &&
                <div className={cn(
                    "flex items-center justify-between",
                )}>
                    <div className="flex flex-col">
                        <h1 className={cn(
                            titleClass
                        )}>{title}</h1>
                        <span className={cn(
                            "mt-1 text-sm text-gray-500 font-light",
                            subTitleClass
                        )}>{subTitle}</span>
                    </div>
                    {titleRightContent && <div className={cn(
                        "flex flex-col items-end",
                        titleRightContentClass
                    )}>
                        <span className={cn(
                            "text-xs text-gray-400 font-light",
                            titleRightClass
                        )}>{titleRightContent}</span>
                    </div>}
                </div>
            }
            {children}
        </div>
    );
}

export default CardContainer;
