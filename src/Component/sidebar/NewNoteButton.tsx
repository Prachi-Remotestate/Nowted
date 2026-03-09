import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNote } from "../../api/Notesapi";
import { toast } from "react-toastify";

const NewNoteButton = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const isCreatingRef = useRef(false);

  const handleCreateNote = async () => {
    if (!folderId || isCreatingRef.current) return;

    isCreatingRef.current = true;

    try {
      const res = await createNote(folderId);

      if (res?.id) {
        navigate(`/folders/${folderId}/notes/${res.id}`);
        toast.success("New note created");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setTimeout(() => {
        isCreatingRef.current = false;
      }, 500);
    }
  };

  return (
    <button
      className={`w-55 py-2.5 rounded-md text-sm font-medium transition mb-8 ml-8 ${
        !folderId ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      }`}
      style={{ backgroundColor: "var(--bg-secondary)" }}
      onClick={handleCreateNote}
    >
      + New Note
    </button>
  );
};

export default NewNoteButton;
