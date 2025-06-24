import "./ColorForm.css";

export default function ColorForm( { onAddColor, initialFormData }) {
  
  
    function handleSubmitColor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddColor(data);
    console.log(data);
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
            className="color-form__input"
            name="role"
            defaultValue={initialFormData.role}
          />
        </div>

        <div className="color-form__group">
          <label htmlFor="hex" className="color-form__label">
            Hex:
          </label>
          <div className="color-form__inline-inputs">
            <input
              type="text"
              id="hex"
              className="color-form__input"
              name="hex"
              defaultValue={initialFormData.hex}
            />
            <input type="color" className="color-form__color" />
          </div>
        </div>

        <div className="color-form__group">
          <label htmlFor="contrastText" className="color-form__label">
            Contrast Text:
          </label>
          <div className="color-form__inline-inputs">
            <input
              type="text"
              id="contrastText"
              className="color-form__input"
              name="contrastText"
              defaultValue={initialFormData.contrastText}
            />
            <input type="color" className="color-form__color" />
          </div>
        </div>
        <button className="color-form__button">Add Color</button>
      </form>
    </>
  );
}
