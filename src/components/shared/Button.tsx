import type { ButtonProps } from "../../interfaces/Interfacecomponents"

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

