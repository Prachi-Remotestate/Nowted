import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Folder,
  FileText,
  CircleEllipsis,
  Star,
  Trash,
  Archive,
  ClockFading,
} from "lucide-react";

interface EditorProps {
  activeNoteId: string | null;
}

const Editor = ({ activeNoteId }: EditorProps) => {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  console.log(activeNoteId);
  const fetchNote = async (noteId: string) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://nowted-server.remotestate.com/notes/${noteId}`,
      );
      console.log(res.data);
      setNote(res.data?.note);
    } catch (error) {
      console.error("Error fetching note:", error);
      setNote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeNoteId) {
      fetchNote(activeNoteId);
      console.log(note);
    } else {
      setNote(null);
    }
  }, [activeNoteId]);

  const handleArchive = async () => {
    if (!note) return;

    try {
      await axios.patch(
        `https://nowted-server.remotestate.com/notes/${note.id}`,
        {
          isArchived: !note.isArchived,
        },
      );

      setNote({ ...note, isArchived: !note.isArchived });
      setMenu(false);
    } catch (error) {
      console.error("Archive update failed:", error);
    }
  };

  const handleFavorite = async () => {
    if (!note) return;

    try {
      await axios.patch(
        `https://nowted-server.remotestate.com/notes/${note.id}`,
        {
          isFavorite: !note.isFavorite,
        },
      );

      setNote({ ...note, isFavorite: !note.isFavorite });
      setMenu(false);
    } catch (error) {
      console.error("Favorite update failed:", error);
    }
  };
  const handleDelete = async () => {
    if (!note) return;

    try {
      await axios.delete(
        `https://nowted-server.remotestate.com/notes/${note.id}`,
      );

      await fetchNote(note.id);

      setMenu(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleRestore = async () => {
    if (!note) return;

    try {
      await axios.post(
        `https://nowted-server.remotestate.com/notes/${note.id}/restore`,
      );

      await fetchNote(note.id);
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  if (!activeNoteId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-10 text-secondary">
        <FileText size={48} strokeWidth={1.5} className="mb-6 opacity-60" />
        <h2 className="text-lg font-medium mb-2 text-primary">
          Select a note to view
        </h2>
        <p className="text-sm max-w-md">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-secondary">
        Loading note...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center text-secondary">
        Note not found.
      </div>
    );
  }

  if (note && note?.deletedAt) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-10">
        <div className="mb-6 opacity-70">
          <ClockFading size={48} strokeWidth={1.5} />
        </div>

        <h2 className="text-lg font-medium mb-2 text-primary">
          Restore "{note.title}"
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
  }
  return (
    <div className="h-full flex flex-col px-12 py-10 overflow-y-auto text-primary">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{note.title}</h1>
        <div className="relative">
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="p-2 rounded-md hover:bg-hover transition"
          >
            <CircleEllipsis size={18} />
          </button>

          {menu && (
            <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg border border-theme bg-primary z-50">
              <div className="flex gap-1   px-5 py-2  ">
                <Star size={16} strokeWidth={1.8} />
                <button
                  onClick={() => handleFavorite()}
                  className="w-full text-center text-sm hover:bg-hover transition"
                >
                  {note.isFavorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>

              <div className="flex gap-1 px-5 py-2">
                <Archive size={16} strokeWidth={1.8} />
                <button
                  onClick={() => handleArchive()}
                  className="w-full text-left pl-2  text-sm hover:bg-hover transition"
                >
                  {note.isArchived ? "Unarchive" : "Archive"}
                </button>
              </div>
              <div className="border-b border-theme" />
              <div className="flex gap-1 px-5 py-2">
                <Trash size={16} strokeWidth={1.8} />
                <button
                  onClick={() => handleDelete()}
                  className="w-full text-left pl-2  text-sm text-primary hover:bg-hover transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 text-sm">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-secondary" />
          <span className="pr-8 text-secondary">Date</span>
          <span className="text-primary underline">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="border-b border-theme " />
        <div className="flex items-center gap-3 pb-6">
          <Folder size={16} className="text-secondary" />
          <span className="pr-6 text-secondary">folder</span>
          <span className="text-primary underline">{note.folder?.name}</span>
        </div>
      </div>

      <div className="space-y-5 text-sm leading-relaxed text-primary">
        {note.content}
      </div>
    </div>
  );
};

export default Editor;
