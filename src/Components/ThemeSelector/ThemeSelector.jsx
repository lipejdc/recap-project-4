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
  };

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
            onClick={handleAdd}
            ariaLabel="Add a new theme"
          >
            Add
          </Button>

          {/* Only display edit and delete button if default theme is NOT selected! */}
          {selectedTheme.name !== "Default Theme" && (
            <>
              <Button
                variant="edit"
                onClick={handleStartEdit}
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
                    onClick={handleCancel}
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
            //If user is not editing, call handleAddSubmit and add new theme
            isEditing ? handleUpdate() : handleAddSubmit();
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
          <Button variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}
