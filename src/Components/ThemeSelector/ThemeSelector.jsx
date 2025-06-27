import "./ThemeSelector.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function ThemeSelector({
  selectedTheme,
  themes,
  onSelectTheme,
  onAddTheme,
  onEditTheme,
  onDeleteTheme,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  //HANDLE FUNCTIONS
  const handleThemeChange = (event) => {
    //When user selects a theme from the dropdown, find the theme by its id
    const selected = themes.find((theme) => theme.id === event.target.value);
    //If found, call onSelectTheme to update the selected theme
    if (selected) onSelectTheme(selected);
  };

  const handleDeleteClick = () => {
    confirmDelete ? onDeleteTheme(selectedTheme.id) : setConfirmDelete(true);
  };

  const handleEditClick = () => {
    //Set input value to the current theme name
    setInputValue(selectedTheme.name);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    //Cancel any edit/add/delete states
    setIsEditing(false);
    setIsAdding(false);
    setConfirmDelete(false);
    setInputValue("");
  };

  const handleUpdateClick = () => {
     //Update theme name if input is not empty, then exit edit mode
    if (inputValue.trim()) {
      onEditTheme({ ...selectedTheme, name: inputValue.trim() });
      setIsEditing(false);
    }
  };

  const handleAddClick = () => {
    //Turn add mode on with empty input
    setIsAdding(true);
    setInputValue("");
  };

  const handleAddSubmit = () => {
    //If input is not empty, adds a new theme
    if (inputValue.trim()) {
      onAddTheme(inputValue.trim());
      //Turn off add mode, clear input and reset any delete confirmation
      setIsAdding(false);
      setInputValue("");
      setConfirmDelete(false);
    }
  };

  return (
    <div className="theme-selector">
      {/* If user is not adding nor editing, display dropdown */}
      {!isEditing && !isAdding ? (
        <>
          <div className="theme-selector__dropdown-group">
            <label htmlFor="theme-select" className="theme-selector__label">
              Choose a theme:
            </label>
            <select
              id="theme-select"
              value={selectedTheme.id}
              onChange={handleThemeChange}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="addTheme"
            onClick={handleAddClick}
            ariaLabel="Add a new theme"
          >
            Add
          </Button>

          {/* Only display edit and delete button if default theme is NOT selected! */}
          {selectedTheme.name !== "Default Theme" && (
            <>
              <Button
                variant="edit"
                onClick={handleEditClick}
                ariaLabel={`Edit theme ${selectedTheme.name}`}
              >
                Edit
              </Button>

              {/* Delete confirmation buttons */}
              {!confirmDelete ? (
                <Button
                  variant="delete"
                  onClick={handleDeleteClick}
                  ariaLabel={`Delete theme ${selectedTheme.name}`}
                >
                  Delete
                </Button>
              ) : (
                <>
                  <Button
                    variant="delete"
                    onClick={handleDeleteClick}
                    ariaLabel={`Confirm deletion of theme ${selectedTheme.name}`}
                  >
                    Yes, delete
                  </Button>
                  <Button
                    variant="cancel"
                    onClick={handleCancelClick}
                    ariaLabel={`Cancel delete of theme ${selectedTheme.name}`}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        //If user is adding or adding display a form with an input text field
        <form
          onSubmit={(event) => {
            event.preventDefault();
            //If user is editing, call handleUpdate and update theme name
            //If user is not editing, he's obviously adding.. so, call handleAddSubmit to add new theme
            isEditing ? handleUpdateClick() : handleAddSubmit();
          }}
        >
          <div className="theme-selector__input-group">
            <label htmlFor="theme-name" className="theme-selector__label">
              {isEditing ? "Rename Theme:" : "New Theme Name:"}
            </label>
            <input
              id="theme-name"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              required
              className="theme-selector__input"
            />
          </div>

          <Button type="submit" variant={isEditing ? "edit" : "addTheme"}>
            {isEditing ? "Update Theme" : "Add Theme"}
          </Button>
          <Button variant="cancel" onClick={handleCancelClick}>
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}
