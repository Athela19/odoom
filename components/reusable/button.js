export default function Button({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-background font-semibold px-4 py-2 rounded-lg border-2 border-primary
        hover:bg-background hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-background 
        ${className}`}
    >
      {children}
    </button>
  );
}
