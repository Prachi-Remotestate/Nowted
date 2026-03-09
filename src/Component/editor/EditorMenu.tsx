import { useState, useRef, useEffect } from "react";
import { CircleEllipsis, Star, Archive, Trash } from "lucide-react";
import { updateNote, deleteNote } from "../../api/Notesapi";
import { toast } from "react-toastify";
import ConfirmDialog from "../ConfirmDialog";
import { useNavigate, useParams } from "react-router-dom";
const EditorMenu = ({ note, setNote, triggerRefresh }: any) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { folderId: currentFolderId } = useParams();
  const navigate = useNavigate();
  const toggleFavorite = async () => {
    const newValue = !note.isFavorite;

    await updateNote(note.id, { isFavorite: newValue });

    setNote({ ...note, isFavorite: newValue });

    toast.success(newValue ? "Added to Favorites" : "Removed from Favorites");

    setMenu(false);
    triggerRefresh();
  };

  const toggleArchive = async () => {
    const newValue = !note.isArchived;

    await updateNote(note.id, { isArchived: newValue });

    setNote({ ...note, isArchived: newValue });

    toast.success(newValue ? "Note Archived" : "Note Unarchived");
    if (newValue) {
      navigate(`/folders/${currentFolderId}`);
    } else {
      navigate(`/archived`);
    }
    setMenu(false);
    triggerRefresh();
  };

  const removeNote = async () => {
    await deleteNote(note.id);

    setNote({ ...note, deletedAt: new Date() });

    toast.success("Note moved to Trash");

    setConfirmOpen(false);
    setMenu(false);

    triggerRefresh();
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setMenu((prev) => !prev)}
        className="p-2 rounded-md hover:bg-hover transition"
      >
        <CircleEllipsis size={24} />
      </button>

      {menu && (
        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg border border-theme bg-primary z-50">
          <div className="flex gap-1 px-5 py-2">
            <Star size={16} strokeWidth={1.8} />
            <button
              onClick={toggleFavorite}
              className="w-full text-left pl-2 text-sm hover:bg-hover transition cursor-pointer"
            >
              {note.isFavorite ? "Unfavorite" : "Favorite"}
            </button>
          </div>

          <div className="flex gap-1 px-5 py-2">
            <Archive size={16} strokeWidth={1.8} />
            <button
              onClick={toggleArchive}
              className="w-full text-left pl-2 text-sm hover:bg-hover transition cursor-pointer"
            >
              {note.isArchived ? "Unarchive" : "Archive"}
            </button>
          </div>

          <div className="border-b border-theme" />

          <div className="flex gap-1 px-5 py-2">
            <Trash size={16} strokeWidth={1.8} />
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full text-left pl-2 text-sm hover:bg-hover transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={removeNote}
        title="Delete Note"
        message="Are you sure you want to move this note to Trash?"
      />
    </div>
  );
};

export default EditorMenu;
