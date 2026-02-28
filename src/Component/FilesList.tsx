import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotes, NotesViewType } from "../hooks/ContextNotes";
import { useParams } from "react-router-dom";
import { useRef } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { folders, viewType } = useNotes();
  const { folderId, noteId } = useParams();

  const listRef = useRef<HTMLDivElement>(null);
  const fetchNotes = async (pageNumber: number, reset = false) => {
    try {
      setLoading(true);

      const params: any = {
        page: pageNumber,
        limit: 10,
      };

      if (viewType === NotesViewType.Trash) {
        params.deleted = true;
      } else {
        params.deleted = false;
      }

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

      const newNotes = res.data?.notes || [];

      if (reset) {
        setNotes(newNotes);
      } else {
        setNotes((prev) => [...prev, ...newNotes]);
      }

      setHasMore(newNotes.length === 10);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (reset) setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNotes([]);
    setPage(1);
    setHasMore(true);

    fetchNotes(1, true);
  }, [viewType, folderId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 40) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const current = listRef.current;
    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;

    fetchNotes(page);
  }, [page]);

  useEffect(() => {
    if (viewType === NotesViewType.Folder && folderId) {
      const folder = folders.find((f) => f.id === folderId);
      setFolderName(folder?.name || "");
    } else if (viewType === NotesViewType.Favorites) {
      setFolderName("Favorites");
    } else if (viewType === NotesViewType.Archived) {
      setFolderName("Archived");
    } else if (viewType === NotesViewType.Trash) {
      setFolderName("Trash");
    }
  }, [folderId, folders, viewType]);

  return (
    <div className="h-full flex flex-col text-primary">
      <div className="px-6 py-5 border-theme">
        <h2 className="text-lg font-semibold tracking-tight">
          {folderName || "Select a Folder"}
        </h2>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-scroll scrollbar-hide px-4 py-4 space-y-3"
      >
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
