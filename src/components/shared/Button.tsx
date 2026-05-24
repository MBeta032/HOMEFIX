import type { ButtonProps } from "../../interfaces/Interfacecomponents"

function Button({
  text,
  children,
  type = "button",
  onClick,
  variant = "secondary",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`home-button home-button-${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {children ?? text}
    </button>
  )
}

export default Button