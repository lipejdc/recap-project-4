import { initialColors } from "./lib/colors";
import fetchContrast from "./utils/contrastCheck";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
// import { useEffect } from "react";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

// On initial load, fetch contrastResult for all colors and add it to each object
//   useEffect(() => {
//   async function updateMissingContrast() {
//     const updatedColors = await Promise.all(
//       colors.map(async (color) => {
//         if (!color.contrastResult) {
//           const contrast = await fetchContrast(color.hex, color.contrastText);
//           return {
//             ...color,
//             contrastResult: contrast?.overall ?? "Unknown",
//           };
//         }
//         return color;
//       })
//     );
//     setColors(updatedColors);
//   }

//   updateMissingContrast();
// }, []);

  const handleAddColor = async (colorToAdd) => {
    const contrast = await fetchContrast(
      colorToAdd.hex,
      colorToAdd.contrastText
    );
    setColors((prevColors) => [
      //Add new object with id and contrastResult to the start of the colors array , then the rest of the colors
      {
        id: uid(),
        ...colorToAdd,
        //contrast.overall stores the result of the comparison. If it is null or undefined, return "Unknown"
        contrastResult: contrast?.overall ?? "Unknown",
      },
      ...prevColors,
    ]);
  };

  const handleDeleteColor = (idToDelete) => {
    //We create a new array without the color that matches the given idToDelete
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== idToDelete)
    );
  };

  const handleEditColor = async (updatedColor) => {
    const contrast = await fetchContrast(
      updatedColor.hex,
      updatedColor.contrastText
    );

    setColors((prevColors) =>
       //We update only the color with the matching ID of updatedColor.id, leave others unchanged
      prevColors.map((color) =>
        color.id === updatedColor.id
          ? //contrast.overall stores the result of the comparison. If it is null or undefined, return "Unknown"
            { ...updatedColor, contrastResult: contrast?.overall ?? "Unknown" }
          : color
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
