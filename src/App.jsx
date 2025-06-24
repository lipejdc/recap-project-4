import { initialColors } from "./lib/colors";
import { useState } from "react";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";

function App() {

  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (colorToAdd) => {
    setColors((prevColors) => {
      const newColorWithId = {id: uid(), ...colorToAdd};
      const updatedColors = [newColorWithId, ...prevColors];
      return updatedColors;
    })
  }

  return (
    <>
      <ColorForm onAddColor={handleAddColor}/>

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
