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
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedTheme, setSelectedTheme] = useLocalStorageState(
    "selectedTheme",
    { defaultValue: initialThemes[0] }
  );

  //On initial load, fetch contrastResult for all colors and add it to each object
  useEffect(() => {
    async function updateMissingContrast() {
      const updatedColors = await Promise.all(
        selectedTheme.colors.map(async (color) => {
          if (!color.contrastResult) {
            const contrast = await fetchContrast(color.hex, color.contrastText);
            return {
              ...color,
              contrastResult: contrast?.overall ?? "Unknown",
            };
          }
          return color;
        })
      );
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
      //contrast.overall stores the result of the comparison. If it is null or undefined, return "Unknown"
      contrastResult: contrast?.overall ?? "Unknown",
    };
    //Update the selected theme with the new color added
    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: [newColor, ...selectedTheme.colors],
    };
    setSelectedTheme(updatedSelectedTheme);

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedSelectedTheme.id ? updatedSelectedTheme : theme
      )
    );
  };

  const handleDeleteColor = (idToDelete) => {
    // Get all properties from the selected theme and remove the color that matches the id provided
    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: selectedTheme.colors.filter((color) => color.id !== idToDelete),
    };

    // Update the selected theme state
    setSelectedTheme(updatedSelectedTheme);

    setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme.id !== updatedSelectedTheme.id)
    );
  };

  const handleEditColor = async (updatedColor) => {
    const contrast = await fetchContrast(
      updatedColor.hex,
      updatedColor.contrastText
    );

    const updatedColors = selectedTheme.colors.map((color) =>
      color.id === updatedColor.id
        ? { ...updatedColor, contrastResult: contrast?.overall ?? "Unknown" }
        : color
    );

    const updatedSelectedTheme = {
      ...selectedTheme,
      colors: updatedColors,
    };
    setSelectedTheme(updatedSelectedTheme);

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedSelectedTheme.id ? updatedSelectedTheme : theme
      )
    );
  };

  //THEME HANDLERS
  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const handleAddTheme = (themeName) => {
  const newTheme = {
    id: uid(),
    name: themeName,
    colors: [],
  };

  setThemes((prev) => [...prev, newTheme]);
  setSelectedTheme(newTheme);
};

  const handleEditTheme = (updatedTheme) => {
    setThemes((prev) =>
      prev.map((theme) => (theme.id === updatedTheme.id ? updatedTheme : theme))
    );
    setSelectedTheme(updatedTheme);
  };

  const handleDeleteTheme = (themeId) => {
  //Prevent deleting the Default Theme
  if (selectedTheme.name === "Default Theme") return;

  const remainingThemes = themes.filter((theme) => theme.id !== themeId);
  setThemes(remainingThemes);

  //Fallback: select the first remaining theme or default to the first initial theme
  const newSelectedTheme = remainingThemes[0] || initialThemes[0];
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
