import "./ColorForm.css";
import Button from "../Button/Button";
import ColorInput from "../ColorInput/ColorInput";


const defaultFormValues = {
  role: "some color",
  hex: "#123456",
  contrastText: "#ffffff",
};

export default function ColorForm({ onAddColor, defaultValues = defaultFormValues, onUpdate, isEditing }) {
  
  const handleSubmitColor = (event) => {
    event.preventDefault();
    //This collects all form input values in an object
    const formData = new FormData(event.target);
    //Convert the data into key-value pairs
    const data = Object.fromEntries(formData);
    //Are we editing? Call onUpdate, otherwise call onAddColor
    onUpdate ? onUpdate(data) : onAddColor(data);
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
            required
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
        <Button>{onUpdate ? "Update Color" : "Add Color"}</Button>
      </form>
    </>
  );
}
