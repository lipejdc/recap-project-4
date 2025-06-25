import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state"; 

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {defaultValue: initialColors});

  const handleAddColor = (colorToAdd) => {
    setColors((prevColors) => [{ id: uid(), ...colorToAdd }, ...prevColors]);
  };

  const handleDeleteColor = (idToDelete) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== idToDelete)
    );
  };

  const handleEditColor = (updatedColor) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  };

  return (
    <>
      <h1 className="app__title">Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.length === 0 && (
        <p className="app__empty-message">No colors.. start by adding one!</p>
      )}
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        );
      })}
    </>
  );
}

export default App;
