import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type Props = {
  width: number;
  height: number;
  className?: string;
  name: string;
};

const Icon = ({ className, height, width, name }: Props) => {
  return (
    <Image
      src={`/svgs/${name}.svg`}
      width={width}
      height={height}
      className={`${cn(className)}`}
      alt={name}
    />
  );
};

export default Icon;
