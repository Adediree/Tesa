import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Typography.module.css';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyLarge'
  | 'bodySmall'
  | 'label'
  | 'caption';

type TypographyColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

type TypographyAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  truncate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const variantElementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodyLarge: 'p',
  bodySmall: 'p',
  label: 'span',
  caption: 'span',
};

export function Typography({
  variant = 'body',
  color = 'default',
  align = 'left',
  truncate = false,
  as,
  className,
  style,
  children,
}: TypographyProps) {
  const Component = as || variantElementMap[variant];

  const variantClass = styles[variant];
  const colorClass = color !== 'default' ? styles[color] : '';
  const alignClass = styles[align];
  const truncateClass = truncate ? styles.truncate : '';

  return (
    <Component
      className={cn(styles.typography, variantClass, colorClass, alignClass, truncateClass, className)}
      style={style}
    >
      {children}
    </Component>
  );
}
