import { Pencil, Trash2 } from "lucide-react";

interface FolderMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const FolderMenu = ({ onEdit, onDelete }: FolderMenuProps) => {
  return (
    <div className="absolute right-2 top-9 bg-primary border border-theme rounded-md shadow-md z-20">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-hover w-full cursor-pointer"
        onClick={onEdit}
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-hover w-full cursor-pointer"
        onClick={onDelete}
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default FolderMenu;
