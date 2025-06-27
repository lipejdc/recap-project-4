import fetchContrast from "./utils/contrastCheck";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";

function App() {
  //Finds and returns the default theme if it is not null or undefined, otherwise the index 0 of themes.
  const defaultTheme = initialThemes.find(theme => theme.name === "Default Theme") ?? initialThemes[0];
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    "selectedTheme",
    { defaultValue: defaultTheme }
  );

  //Runs only on initial load or when theme changes
  useEffect(() => {
    async function updateMissingContrast() {
      //Promise.all run all fetches in parallel
      const updatedColors = await Promise.all(
        //Goes through every color in the theme
        selectedTheme.colors.map(async (color) => {
          //If color doesn't have contrastResult, fetch in the API
          if (!color.contrastResult) {
            const contrast = await fetchContrast(color.hex, color.contrastText);
            return {
              //Keep all object properties and add contrastResult
              ...color,
              contrastResult: contrast?.overall ?? "Unknown",
            };
          }
          //If color already has contrastResult, return unchanged
          return color;
        })
      );
      //Copy properties of theme and replace colors with updated ones
      setSelectedTheme({ ...selectedTheme, colors: updatedColors });
    }

    updateMissingContrast();
  }, [selectedTheme]);

  //COLOR HANDLERS
  const handleAddColor = async (colorToAdd) => {
    const contrast = await fetchContrast(
      colorToAdd.hex,
      colorToAdd.contrastText
    );

    const newColor = {
      //Add new object with id and contrastResult to the start of the colors array , then the rest of the colors
      id: uid(),
      ...colorToAdd,
      contrastResult: contrast?.overall ?? "Unknown",
    };
    //Create updated theme with the new color added at the beginning of the colors array
    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: [newColor, ...selectedTheme.colors],
    };
    //Save updated theme with the new color
    setSelectedTheme(updatedSelectedTheme);

    //Replace the updated theme in the themes array, keep others unchanged
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedSelectedTheme.id ? updatedSelectedTheme : theme
      )
    );
  };

  const handleDeleteColor = (idToDelete) => {
    //Create a new theme with all colors except the one with the matching ID
    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: selectedTheme.colors.filter((color) => color.id !== idToDelete),
    };

    //Save updated theme without the new color
    setSelectedTheme(updatedSelectedTheme);
    
    //Remove the deleted theme from the themes array
    setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme.id !== updatedSelectedTheme.id)
    );
  };

  const handleEditColor = async (updatedColor) => {
    const contrast = await fetchContrast(
      updatedColor.hex,
      updatedColor.contrastText
    );
    //Replace the edited color in the colors array with the updated values and new contrast result
    const updatedColors = selectedTheme.colors.map((color) =>
      color.id === updatedColor.id
        ? { ...updatedColor, contrastResult: contrast?.overall ?? "Unknown" }
        : color
    );

    //Create a new selectedTheme object with the updated colors
    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: updatedColors,
    };
    //Save updated theme with the updated color
    setSelectedTheme(updatedSelectedTheme);

    //Replace the edited theme in the themes array with the updated version
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedSelectedTheme.id ? updatedSelectedTheme : theme
      )
    );
  };

  //THEME HANDLERS
  const handleSelectTheme = (theme) => {
    //Set the selected theme to the one the user chooses
    setSelectedTheme(theme);
  };

  const handleAddTheme = (themeName) => {
  const newTheme = {
    id: uid(),
    name: themeName,
    colors: [],
  };
  //Add new theme to the themes array
  setThemes((prev) => [...prev, newTheme]);

  //Set the new theme as the currently selected theme
  setSelectedTheme(newTheme);
};

  const handleEditTheme = (updatedTheme) => {
    //Replace the theme with the same ID with the updated theme
    setThemes((prev) =>
      prev.map((theme) => (theme.id === updatedTheme.id ? updatedTheme : theme))
    );
    //Set the updated theme as the currently selected theme
    setSelectedTheme(updatedTheme);
  };

  const handleDeleteTheme = (themeId) => {
  //Prevent deleting the Default Theme
  if (selectedTheme.name === "Default Theme") return;

  //Create a new array without the theme to delete
  const remainingThemes = themes.filter((theme) => theme.id !== themeId);
  
  //Update the themes state with the filtered list
  setThemes(remainingThemes);

  //Select the first remaining theme, or use first default theme
  const newSelectedTheme = remainingThemes[0] || initialThemes[0];

  //Set the new selected theme
  setSelectedTheme(newSelectedTheme);
};

  return (
    <>
      <h1 className="app__title">Theme Creator</h1>
      <ThemeSelector
        themes={themes}
        selectedTheme={selectedTheme}
        onAddTheme={handleAddTheme}
        onSelectTheme={handleSelectTheme}
        onEditTheme={handleEditTheme}
        onDeleteTheme={handleDeleteTheme}
      />
      <ColorForm onAddColor={handleAddColor} />

      {selectedTheme.colors?.length === 0 && (
        <p className="app__empty-message">No colors.. start by adding one!</p>
      )}
      <div className="app__color-container">
        {selectedTheme.colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        ))}
      </div>
    </>
  );
}

export default App;
