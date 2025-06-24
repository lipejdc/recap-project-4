import "./Color.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () =>
    confirmDelete ? onDeleteColor(color.id) : setConfirmDelete(true);

  const handleCancelClick = () => setConfirmDelete(false);

  // const handleEditClick = () => setIsEditing(true);

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
            <Button
              variant="cancel"
              onClick={handleCancelClick}
              ariaLabel={`Cancel delete of color ${color.role}`}
            >
              Cancel
            </Button>
          </>
        )}

        <Button
          variant="delete"
          onClick={handleDeleteClick}
          ariaLabel={`Delete color ${color.role}`}
        >
          Delete
        </Button>
        <Button
          variant="edit"
          // onClick={handleEditClick}
          ariaLabel={`Edit color ${color.role}`}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
