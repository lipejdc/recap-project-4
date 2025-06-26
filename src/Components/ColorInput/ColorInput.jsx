import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [colorValue, setColorValue] = useState(defaultValue);
  const handleColorChange = (event) => setColorValue(event.target.value);

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={colorValue}
        onChange={handleColorChange}
        className="color-input__text"
        required
      />
      <input
        type="color"
        value={colorValue}
        onChange={handleColorChange}
        className="color-input__color"
        required
      />
    </>
  );
}
