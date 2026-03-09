import { useState, useRef, useEffect } from "react";
import { Folder, FolderOpen, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import FolderMenu from "./FolderMenu";
import { updateFolder, deleteFolder } from "../../api/Foldersapi";
import { toast } from "react-toastify";
import ConfirmDialog from "../ConfirmDialog";
const FolderItem = ({ folder, refreshFolders }: any) => {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = folderId === folder.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    if (!name.trim()) return;

    await updateFolder(folder.id, name.trim());

    setEditing(false);
    toast.success("Folder name Updated");
    refreshFolders();
  };

  const handleDelete = async () => {
    try {
      await deleteFolder(folder.id);

      toast.success("Folder Deleted");

      setConfirmOpen(false);
      setActiveMenu(false);

      await refreshFolders();

      if (folderId === folder.id) {
        navigate("/folders/default");
      }
    } catch (error) {
      console.error("Delete folder failed", error);
    }
  };

  return (
    <div
      className={`relative flex items-center justify-between py-2 px-2  text-sm cursor-pointer
      ${isActive ? "bg-active text-primary" : "text-secondary hover:bg-hover"}
      `}
      onClick={() => {
        if (editing) return;
        navigate(`/folders/${folder.id}`);
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        {isActive ? <FolderOpen size={18} /> : <Folder size={18} />}

        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
              if (e.key === "Escape") setEditing(false);
            }}
            onBlur={() => setEditing(false)}
            className="bg-transparent border border-primary rounded px-2 py-1 text-sm w-full outline-none"
          />
        ) : (
          <span className="truncate">{folder.name}</span>
        )}
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveMenu(!activeMenu);
        }}
      >
        <MoreVertical size={16} />
      </div>

      {activeMenu && (
        <div ref={menuRef}>
          <FolderMenu
            onEdit={() => {
              setEditing(true);
              setActiveMenu(false);
            }}
            onDelete={() => {
              setConfirmOpen(true);
              setActiveMenu(false);
            }}
          />
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Folder"
        message="Are you sure you want to delete this folder?"
      />
    </div>
  );
};

export default FolderItem;
