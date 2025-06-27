//TODO: 1. Add Hex and Contrast Text validation (only valid colors can be entered, no dummy text)!

import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  //State to store the current color chosen by the user
  const [colorValue, setColorValue] = useState(defaultValue);
  const handleColorChange = (event) => setColorValue(event.target.value);

  return (
    <>
    {/* id prop for input id and name attributes to link labels and form data correctly */}
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
