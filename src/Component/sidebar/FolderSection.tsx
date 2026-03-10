import { useEffect, useState } from "react";
import { getFolders } from "../../api/Foldersapi";
import { FolderPlus } from "lucide-react";
import FolderItem from "./FolderItem";
import AddFolderInput from "../AddFolderInput";
import { useNotes } from "../../context/ContextNotes";

const FoldersSection = () => {
  const { folders, setFolders } = useNotes();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const fetchFolders = async () => {
    const data = await getFolders();
    setFolders(data);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <section className="flex flex-col  mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs uppercase text-secondary pl-2">Folders</h2>

        <FolderPlus
          size={18}
          className="cursor-pointer mr-2 text-secondary"
          onClick={() => setIsCreatingFolder(true)}
        />
      </div>

      <div className="flex flex-col gap-1 overflow-y-scroll overflow-x-hidden scrollbar-hide max-h-[30vh]">
        {folders.map((folder: any) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            refreshFolders={fetchFolders}
          />
        ))}

        {isCreatingFolder && (
          <AddFolderInput
            onCreated={() => {
              setIsCreatingFolder(false);
              fetchFolders();
            }}
            onCancel={() => setIsCreatingFolder(false)}
          />
        )}
      </div>
    </section>
  );
};

export default FoldersSection;
