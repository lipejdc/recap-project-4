import "./ColorForm.css";
import Button from "../Button/Button";
import ColorInput from "../ColorInput/ColorInput";

const defaultFormValues = {
  role: "some color",
  hex: "#123456",
  contrastText: "#ffffff",
};

export default function ColorForm({ onAddColor, defaultValues = defaultFormValues, onSave, isEditing }) {
  const handleSubmitColor = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSave ? onSave(data) : onAddColor(data);
  };

  return (
    <>
      <form className={`color-form ${isEditing ? "color-form--edit" : ""}`} onSubmit={handleSubmitColor}>
        <div className="color-form__group">
          <label htmlFor="role" className="color-form__label">
            Role:
          </label>
          <input
            type="text"
            id="role"
            className="color-form__role-input"
            name="role"
            defaultValue={defaultValues.role}
          />
        </div>

        <div className="color-form__group">
          <label htmlFor="hex" className="color-form__label">
            Hex:
          </label>
          <div className="color-form__inline-inputs">
            <ColorInput id="hex" defaultValue={defaultValues.hex} />
          </div>
        </div>

        <div className="color-form__group">
          <label htmlFor="contrastText" className="color-form__label">
            Contrast Text:
          </label>
          <div className="color-form__inline-inputs">
            <ColorInput
              id="contrastText"
              defaultValue={defaultValues.contrastText}
            />
          </div>
        </div>
        <Button>{onSave ? "Update Color" : "Add Color"}</Button>
      </form>
    </>
  );
}
