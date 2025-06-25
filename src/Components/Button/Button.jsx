//Variant pattern: A way to define multiple visual or behavioral variations of a component using a single variant prop 

// Define styling variants and map them to their corresponding class names
const BUTTON_VARIANTS = {
  delete: "color-card__delete-button color-card__button",
  edit: "color-card__edit-button color-card__button",
  cancel: "color-card__cancel-button color-card__button",
  add: "color-form__add-button",
};

export default function Button({
  variant = "add",
  onClick,
  children,
  ariaLabel,
}) {
  // Look up classes based on the variant; fallback to "add" if invalid
  const buttonClasses = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.add;

  return (
    <button onClick={onClick} className={buttonClasses} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
