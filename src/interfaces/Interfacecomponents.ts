import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success";
  className?: string
  onClick?: () => void
}

export interface DashboardTopbarProps {
  name: string
}

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void;
  placeholder?: string
  buttonText?:string
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
}

export interface RatingStarsProps {
  value: number
  onChange: (value: number) => void
}








