import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ variant = 'default', children, className, style }: BadgeProps) {
  const variantClass = styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`];

  return (
    <span className={cn(styles.badge, variantClass, className)} style={style}>
      {children}
    </span>
  );
}
