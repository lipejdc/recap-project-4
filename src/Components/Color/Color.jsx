import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () =>
    confirmDelete ? onDeleteColor(color.id) : setConfirmDelete(true);

  const handleCancelClick = () => setConfirmDelete(false);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card__highlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <div className="color-card__actions">
        {confirmDelete && (
          <>
            <span className="color-card__highlight" role="alert">
              Really delete?
            </span>
            <button
              onClick={handleCancelClick}
              aria-label="Cancel delete"
              className="color-card__cancel-button"
            >
              Cancel
            </button>
          </>
        )}

        <button onClick={handleDeleteClick} className="color-card__delete-button">Delete</button>
      </div>
    </div>
  );
}
