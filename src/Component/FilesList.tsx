import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotes, NotesViewType } from "../hooks/ContextNotes";
import { useParams } from "react-router-dom";

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  preview: string;
}

const FilesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();
  const { viewType } = useNotes();
  const { folderId, noteId } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const params: any = {
          archived: false,
          favorite: false,
          deleted: false,
          page: 1,
          limit: 10,
        };

        if (viewType === NotesViewType.Folder) {
          if (!folderId) return;
          params.folderId = folderId;
        }

        if (viewType === NotesViewType.Favorites) {
          params.favorite = true;
        }

        if (viewType === NotesViewType.Archived) {
          params.archived = true;
        }

        const res = await axios.get(
          "https://nowted-server.remotestate.com/notes",
          { params },
        );

        if (Array.isArray(res.data?.notes)) {
          setNotes(res.data.notes);

          if (res.data.notes.length > 0) {
            setFolderName(
              viewType === NotesViewType.Folder
                ? res.data.notes[0].folder?.name || ""
                : viewType === NotesViewType.Favorites
                  ? "Favorites"
                  : "Archived",
            );
          } else {
            setFolderName(
              viewType === NotesViewType.Folder
                ? ""
                : viewType === NotesViewType.Favorites
                  ? "Favorites"
                  : "Archived",
            );
          }
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [viewType, folderId]);

  return (
    <div className="h-full flex flex-col text-primary">
      {/* Header */}
      <div className="px-6 py-5 border-theme">
        <h2 className="text-lg font-semibold tracking-tight">
          {folderName || "Select a Folder"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-scroll scrollbar-hide px-4 py-4 space-y-3">
        {loading && (
          <div className="text-sm text-secondary">Loading notes...</div>
        )}

        {!loading && notes.length === 0 && (
          <div className="flex items-center justify-center h-full text-sm text-secondary">
            No notes found.
          </div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() =>
              navigate(
                viewType === NotesViewType.Folder
                  ? `/folders/${folderId}/notes/${note.id}`
                  : `/notes/${note.id}`,
              )
            }
            className={`border-theme rounded-lg p-4 cursor-pointer transition-all
    ${
      noteId === note.id
        ? "bg-hover border border-primary"
        : "bg-primary bg-opacity-60 hover:bg-hover"
    }
  `}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium truncate">{note.title}</h3>
            </div>

            <div className="flex gap-3">
              <p className="text-xs text-secondary mb-1">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <p className="text-xs text-secondary line-clamp-2">
                {note.preview}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
