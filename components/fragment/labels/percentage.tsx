import { cn } from '@/lib/utils';
import React from 'react';

interface PercentageLabelProps {
    value: number,
    label?: string,
    color?: 'red' | 'green' | 'yellow' | 'purple' | 'brown' | 'default',
    valueClass?: string,
    labelClass?: string,
}

const COLORS = {
    red: '#EC1410CC',
    green: '#07A287',
    yellow: '#FFC043E5',
    purple: '#7E10E5',
    brown: '#835101CC',
    blue: '#0452C8',
    default: "var('--primary-color')",
}

const PercentageLabel = ({label, value, color, labelClass, valueClass}: PercentageLabelProps) => {
    return (
        <div className="flex gap-2 items-end">
            <h1 className={cn(
                "text-yellow-400 text-2xl",
                valueClass
            )}
            style={{color: color ? COLORS[color] : ''}}
            >{`${value}%`}</h1>
            {label && <span className={cn(
                "font-semibold text-sm text-gray-400",
                labelClass
            )}>{label}</span>}
        </div>
    );
}

export default PercentageLabel;
