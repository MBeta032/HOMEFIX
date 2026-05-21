interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function Button({ text, onClick, variant = "secondary" }: ButtonProps) {
  return (
    <button
      type="button"
      className={`home-button home-button-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;