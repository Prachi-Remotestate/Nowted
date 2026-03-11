import { useEffect, useState, useRef } from "react";

import {
  useNavigate,
  useParams,
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useNotes } from "../context/ContextNotes";

import { getNotes } from "../api/Notesapi";

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  preview: string;
}
export let triggerNotesRefresh: () => void;

const FilesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { refreshNotes } = useOutletContext<{ refreshNotes: number }>();
  const navigate = useNavigate();
  const location = useLocation();
  const requestIdRef = useRef(0);
  const { folders } = useNotes();
  const { folderId, noteId } = useParams();

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const listRef = useRef<HTMLDivElement>(null);
  const isFolder = location.pathname.startsWith("/folders");
  const isFavorites = location.pathname.startsWith("/favorites");
  const isArchived = location.pathname.startsWith("/archived");
  const isTrash = location.pathname.startsWith("/trash");

  const fetchNotes = async (pageNumber: number, reset = false) => {
    const requestId = ++requestIdRef.current;
    try {
      console.log({ loading });
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params: any = {
        page: pageNumber,
        limit: 10,
        deleted: false,
      };

      if (isTrash) params.deleted = true;

      if (isFolder && !debouncedSearch && folderId) {
        params.folderId = folderId;
      }

      if (isFavorites) params.favorite = true;

      if (isArchived) params.archived = true;

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const data = await getNotes(params);

      if (requestId !== requestIdRef.current) return;
      const newNotes = data?.notes || [];

      if (reset) {
        setNotes(newNotes);
      } else {
        setNotes((prev) => [...prev, ...newNotes]);
      }

      setHasMore(newNotes.length === 10);
    } catch (error: any) {
      if (error.name === "CanceledError" || error.name === "AbortError") {
        return;
      }

      console.error("Error fetching notes:", error);

      if (reset) setNotes([]);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
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

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const basePath = location.pathname.split("/notes")[0];
  useEffect(() => {
    if (debouncedSearch.trim()) {
      setFolderName("Search Results");
    } else if (isFolder && folderId) {
      const folder = folders.find((f) => f.id === folderId);
      setFolderName(folder?.name || "");
    } else if (isFavorites) {
      setFolderName("Favorites");
    } else if (isArchived) {
      setFolderName("Archived");
    } else if (isTrash) {
      setFolderName("Trash");
    }
  }, [folderId, folders, basePath]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setNotes([]);
    setPage(1);
    setHasMore(true);

    fetchNotes(1, true);
  }, [basePath, debouncedSearch, refreshNotes]);

  return (
    <div className="h-full flex flex-col text-primary ">
      <div className="px-6 pt-3 border-theme">
        <h2 className="text-lg font-semibold tracking-tight overflow-scroll scrollbar-hide">
          {debouncedSearch.trim()
            ? "Search Results"
            : folderName || "Select a Folder"}
        </h2>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-scroll scrollbar-hide px-4 py-4 space-y-3"
      >
        {loading && (
          <div className="text-sm text-secondary">Loading notes...</div>
        )}

        {!loading && !loadingMore && notes.length === 0 && (
          <div className="flex items-center justify-center h-full text-sm text-secondary">
            No notes found.
          </div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate(`notes/${note.id}`)}
            className={`border-theme rounded-md  p-4 cursor-pointer transition-all
            ${
              noteId === note.id
                ? "border  bg-active text-primary"
                : "bg-secondary  border-secondary "
            }`}
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
        {loadingMore && (
          <div className="flex justify-center py-4 text-xs text-secondary">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesList;
