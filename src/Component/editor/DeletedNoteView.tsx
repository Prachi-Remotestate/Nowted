import { ClockFading } from "lucide-react";
import { restoreNote } from "../../api/Notesapi";
import type { NoteEditorProps } from "./Editor";

const DeletedNoteView = ({ note }: Partial<NoteEditorProps>) => {
  const handleRestore = async () => {
    try {
      if (note) {
        await restoreNote(note.id);
      }

      window.location.reload();
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-10">
      <div className="mb-6 opacity-70">
        <ClockFading size={48} strokeWidth={1.5} />
      </div>

      <h2 className="text-lg font-medium mb-2 text-primary">
        Restore "{note ? note.title : ""}"
      </h2>

      <p className="text-sm max-w-md text-secondary mb-6">
        Don’t want to lose this note? It’s not too late. Just click the
        “Restore” button and it will be added back to your list.
      </p>

      <button
        onClick={handleRestore}
        className="px-6 py-2 rounded-md bg-blue-400 hover:bg-blue-600 transition"
      >
        Restore
      </button>
    </div>
  );
};

export default DeletedNoteView;
