import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm( { onAddColor }) {
  
    const defaultFormValues = {
    role: "some color",
    hex: "#123456",
    contrastText: "#ffffff",
  };
  
    function handleSubmitColor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddColor(data);
  }

  return (
    <>
      <h1 className="color-form__title">Theme Creator</h1>
      <form className="color-form" onSubmit={handleSubmitColor}>
        <div className="color-form__group">
          <label htmlFor="role" className="color-form__label">
            Role:
          </label>
          <input
            type="text"
            id="role"
            className="color-form__role-input"
            name="role"
            defaultValue={defaultFormValues.role}
          />
        </div>

        <div className="color-form__group">
          <label htmlFor="hex" className="color-form__label">
            Hex:
          </label>
          <div className="color-form__inline-inputs">
            <ColorInput id="hex" defaultValue={defaultFormValues.hex} />
          </div>
        </div>

        <div className="color-form__group">
          <label htmlFor="contrastText" className="color-form__label">
            Contrast Text:
          </label>
          <div className="color-form__inline-inputs">
            <ColorInput
              id="contrastText"
              defaultValue={defaultFormValues.contrastText}
            />
          </div>
        </div>
        <button className="color-form__button">Add Color</button>
      </form>
    </>
  );
}
