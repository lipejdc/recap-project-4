//TODO: 1. Align buttons on the right side of the dropdown
//TODO: 2. Style the add button and the update button for the theme selector 
//TODO: 3. Make the "choose a theme" text the same size as the text in the form
//TODO: 4. Style the input text when the user clicks to edit the theme
//TODO: 5. Add "Yes delete" and "Cancel" buttons when the user click on the delete button
//TODO: 6. Style both buttons above. You can use the same logic as in the Color.jsx


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

  const handleThemeChange = (e) => {
    const selected = themes.find((t) => t.id === e.target.value);
    if (selected) onSelectTheme(selected);
  };

  const handleDeleteClick = () => {
    confirmDelete ? onDeleteTheme(selectedTheme.id) : setConfirmDelete(true);
  }

  const handleStartEdit = () => {
    setInputValue(selectedTheme.name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setConfirmDelete(false);
    setInputValue("");
  };

  const handleUpdate = () => {
    if (inputValue.trim()) {
      onEditTheme({ ...selectedTheme, name: inputValue.trim() });
      setIsEditing(false);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setInputValue("");
  };

  const handleAddSubmit = () => {
    if (inputValue.trim()) {
      onAddTheme(inputValue.trim()); // now passes name to App
      setIsAdding(false);
      setInputValue("");
    }
  };

  return (
    <div className="theme-selector">
      {/* If user is not adding nor editing, display dropdown */}
      {!isEditing && !isAdding ? (
        <>
          <label htmlFor="theme-select">Choose a theme:</label>
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

          <Button onClick={handleAdd}>Add</Button>

          {/* Only display edit and delete button if default theme is NOT selected! */}
          {selectedTheme.name !== "Default Theme" && (
            <>
              <Button variant="edit" onClick={handleStartEdit}>
                Edit
              </Button>

              {/* Delete confirmation buttons */}
              {!confirmDelete ? (
                <Button variant="delete" onClick={handleDeleteClick}>
                  Delete
                </Button>
              ) : (
                <>
                  <Button variant="delete" onClick={handleDeleteClick}>
                    Yes, delete
                  </Button>
                  <Button variant="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </>
          )}
        </>
      //If user is adding or adding display a form with an input text field
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            //If user is editing, call handleUpdate and update theme name
            //If user is not editing, call handleAddSubmit and add new theme
            isEditing ? handleUpdate() : handleAddSubmit();
          }}
        >
          <label htmlFor="theme-name">
            {isEditing ? "Rename Theme:" : "New Theme Name:"}
          </label>
          <input
            id="theme-name"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <Button type="submit" variant={isEditing ? "update" : "add"}>
            {isEditing ? "Update" : "Add Theme"}
          </Button>
          <Button variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}
