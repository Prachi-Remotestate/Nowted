import { useState, useRef, useEffect } from "react";
import { Calendar, Folder } from "lucide-react";
import EditorMenu from "./EditorMenu";
import { updateNote } from "../../api/Notesapi";
import { useNotes } from "../../context/ContextNotes";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditorHeader = ({ note, setNote, triggerRefresh }: any) => {
  const [title, setTitle] = useState(note.title);
  const { folders } = useNotes();

  const [folderMenu, setFolderMenu] = useState(false);
  const { folderId: currentFolderId } = useParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleTitleChange = async (value: string) => {
    setTitle(value);

    await updateNote(note.id, { title: value });

    setNote({ ...note, title: value });
    toast.success("Title Updated");
    triggerRefresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFolderMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const moveNote = async (newFolderId: string) => {
    try {
      if (newFolderId === note.folder?.id) {
        setFolderMenu(false);
        return;
      }

      await updateNote(note.id, { folderId: newFolderId });

      setFolderMenu(false);

      setNote(null);

      triggerRefresh();

      toast.success(` Note moved successfully`);
      navigate(`/folders/${currentFolderId}`);
    } catch (error) {
      toast.error("failed to move");
      console.error("Move note failed:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-2xl font-semibold tracking-tight bg-transparent outline-none w-full"
          placeholder="Untitled"
        />

        <EditorMenu
          note={note}
          setNote={setNote}
          triggerRefresh={triggerRefresh}
        />
      </div>

      <div className="flex flex-col gap-5 text-sm mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-secondary" />
          <span className="text-secondary">Date</span>
          <span className="underline">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="border-b border-theme" />
        <div className="flex items-center gap-2 pb-6">
          <Folder size={16} className="text-secondary" />

          <span className=" text-secondary">Folder</span>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setFolderMenu((prev) => !prev)}
              className="underline truncate cursor-pointer"
            >
              {note.folder?.name || "No Folder"}
            </button>

            {folderMenu && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg border border-theme bg-primary z-50">
                {folders.map((folder: any) => (
                  <button
                    key={folder.id}
                    onClick={() => moveNote(folder.id)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-hover ${
                      folder.id === note.folder?.id ? "bg-hover" : ""
                    }`}
                  >
                    {folder.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorHeader;
