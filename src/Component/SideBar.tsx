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
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes, NotesViewType } from "../hooks/ContextNotes";
import AddFolderInput from "./AddFolderInput";
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
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const { folderId, noteId } = useParams();
  const navigate = useNavigate();
  const { setViewType, setActiveFolderId, folders, setFolders } = useNotes();

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

  const updateFolderName = async (id: string, name: string) => {
    try {
      await axios.patch(`https://nowted-server.remotestate.com/folders/${id}`, {
        name,
      });

      setFolders((prev) =>
        prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
      );
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  };
  const deleteFolder = async (folderId: string) => {
    await axios.delete(
      `https://nowted-server.remotestate.com/folders/${folderId}`,
    );
  };
  const handleDeleteFolder = async (id: string) => {
    try {
      await deleteFolder(id);

      setFolders((prev) => prev.filter((f) => f.id !== id));

      if (folderId === id) {
        setActiveFolderId(null);
        setViewType(NotesViewType.Folder);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  return (
    <aside
      className="  flex flex-col bg-primary text-primary"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      <div className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-2 pl-3">
          <h1 className="text-xl font-semibold tracking-tight font-logo">
            Nowted
          </h1>

          <Pen
            size={16}
            strokeWidth={1.8}
            className="text-primary  transition-colors cursor-pointer"
          />
        </div>

        <Search
          size={18}
          strokeWidth={1.8}
          className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4"
        />
      </div>

      <button
        className="w-full py-2.5 rounded-md text-sm font-medium transition mb-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        + New Note
      </button>

      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-wider mb-4 text-secondary pl-4">
          Recents
        </h2>

        <div className="flex flex-col gap-1 pl-3 text-secondary hover:text-primary">
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
                className={`flex items-center gap-3 px-1 py-2 rounded-md text-sm text-left transition-colors
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

      <section className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs uppercase tracking-wider text-secondary pl-4">
            Folders
          </h2>

          <FolderPlus
            size={18}
            strokeWidth={1.8}
            className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4"
            onClick={() => setIsCreatingFolder(true)}
          />
        </div>

        <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide h-55 pr-1 pl-5">
          {folders.length === 0 && (
            <span className="text-xs text-secondary opacity-60">
              No folders
            </span>
          )}

          {folders.map((folder) => {
            const isActive = folderId === folder.id;

            return (
              <div
                key={folder.id}
                className={`relative group flex items-center justify-between  py-2 rounded-md text-sm transition-colors cursor-pointer
      ${isActive ? "bg-accent text-primary" : "text-secondary hover:bg-hover"}
    `}
                onClick={() => {
                  if (editingFolderId) return;
                  setViewType(NotesViewType.Folder);
                  navigate(
                    `/folders/${folder.id}/${encodeURIComponent(folder.name)}`,
                  );
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {isActive ? (
                    <FolderOpen size={18} strokeWidth={1.8} />
                  ) : (
                    <Folder size={18} strokeWidth={1.8} />
                  )}

                  {editingFolderId === folder.id ? (
                    <input
                      autoFocus
                      value={editingName}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Escape") {
                          setEditingFolderId(null);
                          return;
                        }

                        if (e.key === "Enter") {
                          if (!editingName.trim()) return;
                          await updateFolderName(folder.id, editingName.trim());
                          if (folderId === folder.id) {
                            navigate(
                              `/folders/${folder.id}/${editingName.trim()}`,
                              { replace: true },
                            );
                          }
                          setEditingFolderId(null);
                        }
                      }}
                      onBlur={() => setEditingFolderId(null)}
                      className="bg-transparent border border-primary rounded px-2 py-1 text-sm w-full outline-none"
                    />
                  ) : (
                    <span className="truncate">{folder.name}</span>
                  )}
                </div>

                <div
                  className="ml-2 text-secondary hover:text-primary transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(
                      activeMenuId === folder.id ? null : folder.id,
                    );
                  }}
                >
                  <MoreVertical size={16} />
                </div>

                {activeMenuId === folder.id && (
                  <div
                    className="absolute right-2 top-9 bg-primary border border-theme rounded-md shadow-md z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-hover w-full"
                      onClick={() => {
                        setEditingFolderId(folder.id);
                        setEditingName(folder.name);
                        setActiveMenuId(null);
                      }}
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-hover w-full"
                      onClick={() => {
                        handleDeleteFolder(folder.id);
                      }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {isCreatingFolder && (
            <AddFolderInput
              onCreated={async () => {
                setIsCreatingFolder(false);
                await fetchFolders();
              }}
              onCancel={() => setIsCreatingFolder(false)}
            />
          )}
        </div>
      </section>

      <div className="pt-6 mt-auto">
        <h2 className="text-xs uppercase tracking-wider mb-3 text-secondary pl-4">
          More
        </h2>

        <div className="flex flex-col gap-1 pl-5">
          <button
            className="flex items-center gap-3  py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition"
            onClick={() => {
              setActiveFolderId(null);
              setViewType(NotesViewType.Favorites);
            }}
          >
            <Star size={16} strokeWidth={1.8} />
            Favorites
          </button>

          <button
            className="flex items-center gap-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition"
            onClick={() => {
              setActiveFolderId(null);
              setViewType(NotesViewType.Trash);
            }}
          >
            <Trash size={16} strokeWidth={1.8} />
            Trash
          </button>

          <button
            className="flex items-center gap-3  py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition"
            onClick={() => {
              setActiveFolderId(null);
              setViewType(NotesViewType.Archived);
            }}
          >
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
