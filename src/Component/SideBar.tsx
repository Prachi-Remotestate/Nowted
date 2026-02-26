import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../hooks/useTheme";
import {
  Pen,
  Search,
  FolderPlus,
  Folder,
  FolderOpen,
  FileText,
  Star,
  Archive,
  Trash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  folderId: string;
  isFavorite?: boolean;
  isArchived?: boolean;
}

const SideBar = () => {
  const { theme, setTheme } = useTheme();
  const [recents, setRecents] = useState<Note[]>([]);
  const { folderId, noteId } = useParams();
  const navigate = useNavigate();

  interface FolderType {
    id: string;
    name: string;
  }

  const [folders, setFolders] = useState<FolderType[]>([]);

  const fetchRecents = async () => {
    try {
      const res = await axios.get(
        "https://nowted-server.remotestate.com/notes/recent",
      );

      if (Array.isArray(res.data?.recentNotes)) {
        setRecents(res.data.recentNotes);
      } else {
        setRecents([]);
      }
    } catch (error) {
      console.error("Error fetching recents:", error);
      setRecents([]);
    }
  };

  const fetchFolders = async () => {
    try {
      const res = await axios.get(
        "https://nowted-server.remotestate.com/folders",
      );

      if (Array.isArray(res.data?.folders)) {
        setFolders(res.data.folders);
      } else {
        setFolders([]);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      setFolders([]);
    }
  };
  useEffect(() => {
    fetchRecents();
    fetchFolders();
  }, []);

  return (
    <aside
      className="h-full flex flex-col bg-primary text-primary"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-2 pl-3">
          <h1 className="text-xl font-semibold tracking-tight font-logo">
            Nowted
          </h1>

          <Pen
            size={16}
            strokeWidth={1.8}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
          />
        </div>

        <Search
          size={18}
          strokeWidth={1.8}
          className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4"
        />
      </div>

      {/* New Note Button */}
      <button
        className="w-full py-2.5 rounded-md text-sm font-medium transition mb-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        + New Note
      </button>

      {/* RECENTS SECTION */}
      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-wider mb-4 text-secondary pl-4">
          Recents
        </h2>

        <div className="flex flex-col gap-1 pl-5 text-secondary hover:text-primary">
          {recents.length === 0 && (
            <span className="text-xs text-secondary opacity-60">
              No recent notes
            </span>
          )}

          {recents.map((note) => {
            const isActive = noteId === note.id;

            return (
              <button
                key={note.id}
                onClick={() =>
                  navigate(`/folders/${note.folderId}/notes/${note.id}`)
                }
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors
        ${isActive ? "bg-amber-800 text-primary" : "text-secondary hover:bg-hover"}
      `}
              >
                <FileText
                  size={16}
                  strokeWidth={1.8}
                  className={`transition-colors ${
                    isActive ? "text-primary" : "text-secondary"
                  }`}
                />

                <span className="truncate">{note.title || "Untitled"}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FOLDERS SECTION */}
      <section className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs uppercase tracking-wider text-secondary pl-4">
            Folders
          </h2>

          <FolderPlus
            size={18}
            strokeWidth={1.8}
            className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4"
          />
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto  pr-1 pl-5">
          {folders.length === 0 && (
            <span className="text-xs text-secondary opacity-60">
              No folders
            </span>
          )}

          {folders.map((folder) => {
            const isActive = folderId === folder.id;

            return (
              <button
                key={folder.id}
                onClick={() => navigate(`/folders/${folder.id}`)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors
            ${
              isActive
                ? "bg-accent text-primary"
                : "text-secondary hover:bg-hover"
            }
          `}
              >
                {isActive ? (
                  <FolderOpen
                    size={18}
                    strokeWidth={1.8}
                    className="transition-colors"
                  />
                ) : (
                  <Folder
                    size={18}
                    strokeWidth={1.8}
                    className="transition-colors"
                  />
                )}

                {folder.name}
              </button>
            );
          })}
        </div>
      </section>

      <div className="pt-6">
        <h2 className="text-xs uppercase tracking-wider mb-3 text-secondary pl-4">
          More
        </h2>

        <div className="flex flex-col gap-1 pl-5">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Star size={16} strokeWidth={1.8} />
            Favorites
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Trash size={16} strokeWidth={1.8} />
            Trash
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Archive size={16} strokeWidth={1.8} />
            Archived Notes
          </button>
        </div>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-xs opacity-60 hover:opacity-100 transition mt-auto pt-6"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </aside>
  );
};

export default SideBar;
