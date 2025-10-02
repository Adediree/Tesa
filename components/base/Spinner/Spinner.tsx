import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Spinner.module.css';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  const sizeClass = styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`];

  if (label) {
    return (
      <div className={styles.container}>
        <div className={cn(styles.spinner, sizeClass, className)} role="status" aria-label={label} />
        <span>{label}</span>
      </div>
    );
  }

  return <div className={cn(styles.spinner, sizeClass, className)} role="status" aria-label="Loading" />;
}
