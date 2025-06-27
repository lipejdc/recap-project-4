//Variant pattern: Defines multiple visual/behavioral styles for a component controlled by a single 'variant' prop.

//Map of variant names to their corresponding CSS class names
const BUTTON_VARIANTS = {
  delete: "color-card__delete-button color-card__button",
  edit: "color-card__edit-button color-card__button",
  cancel: "color-card__cancel-button color-card__button",
  addColor: "color-form__add-button",
  addTheme: "color-card__add-theme-button color-card__button",
  copy: "copy-to-clipboard__copy-button color-card__button"
};

export default function Button({
  variant = "addColor",
  onClick,
  children,
  ariaLabel,
}) {
  //Look up classes based on the variant; take "add" if none apply
  const buttonClasses = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.add;

  return (
    <button onClick={onClick} className={buttonClasses} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
