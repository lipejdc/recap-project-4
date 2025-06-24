import { initialColors } from "./lib/colors";
import { useState } from "react";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (colorToAdd) => {
    setColors((prevColors) => [{ id: uid(), ...colorToAdd }, ...prevColors]);
  };

  const handleDeleteColor = (idToDelete) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== idToDelete)
    );
  };

  return (
    <>
    <h1 className="app__title">Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.length === 0 && <p className="app__empty-message">No colors.. start by adding one!</p>}
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        );
      })}
    </>
  );
}

export default App;
