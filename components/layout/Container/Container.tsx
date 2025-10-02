import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Container.module.css";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  size = "full",
  className,
  children,
}: ContainerProps) {
  const sizeClass =
    size !== "sm"
      ? styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`]
      : "";

  return (
    <div className={cn(styles.container, sizeClass, className)}>{children}</div>
  );
}
