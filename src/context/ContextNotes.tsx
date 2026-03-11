import { createContext, useContext, useState } from "react";

export interface FolderType {
  id: string;
  name: string;
}

interface NotesContextType {
  folders: FolderType[];
  setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  return (
    <NotesContext.Provider
      value={{
        folders,
        setFolders,
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
