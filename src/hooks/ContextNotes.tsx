import { createContext, useContext, useState } from "react";

export const NotesViewType = {
  Folder: "FOLDER",
  Favorites: "FAVORITES",
  Archived: "ARCHIVED",
  Trash: "TRASH",
} as const;

export type NotesViewType = (typeof NotesViewType)[keyof typeof NotesViewType];

export interface FolderType {
  id: string;
  name: string;
}

interface NotesContextType {
  viewType: NotesViewType;
  setViewType: React.Dispatch<React.SetStateAction<NotesViewType>>;

  folders: FolderType[];
  setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewType, setViewType] = useState<NotesViewType>(NotesViewType.Folder);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <NotesContext.Provider
      value={{
        viewType,
        setViewType,
        folders,
        setFolders,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used inside NotesProvider");
  }
  return context;
};
