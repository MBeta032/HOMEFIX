import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success";
  className?: string;
  onClick?: () => void;
}