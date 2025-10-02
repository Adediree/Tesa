import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface CardSectionProps {
  children: React.ReactNode;
  noPadding?: boolean;
  className?: string;
}

function CardRoot({ children, hoverable = false, onClick, className, style }: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        hoverable && styles.cardHoverable,
        onClick && styles.cardClickable,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, noPadding = false, className }: CardSectionProps) {
  return (
    <div className={cn(styles.header, noPadding && styles.noPadding, className)}>
      {children}
    </div>
  );
}

function CardBody({ children, noPadding = false, className }: CardSectionProps) {
  return (
    <div className={cn(styles.body, noPadding && styles.noPadding, className)}>
      {children}
    </div>
  );
}

function CardFooter({ children, noPadding = false, className }: CardSectionProps) {
  return (
    <div className={cn(styles.footer, noPadding && styles.noPadding, className)}>
      {children}
    </div>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
