interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "small" | "medium" | "large";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  size = "medium",
}: ButtonProps) => {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass =
    size === "small"
      ? "px-2 py-1 text-xs"
      : size === "large"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-sm";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${disabledClass} ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
};
