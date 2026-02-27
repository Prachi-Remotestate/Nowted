import { createContext, useContext, useState } from "react";

export const NotesViewType = {
  Folder: "FOLDER",
  Favorites: "FAVORITES",
  Archived: "ARCHIVED",
} as const;

export type NotesViewType = (typeof NotesViewType)[keyof typeof NotesViewType];

interface NotesContextType {
  viewType: NotesViewType;
  setViewType: React.Dispatch<React.SetStateAction<NotesViewType>>;
  activeFolderId: string | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<string | null>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewType, setViewType] = useState<NotesViewType>(NotesViewType.Folder);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  return (
    <NotesContext.Provider
      value={{
        viewType,
        setViewType,
        activeFolderId,
        setActiveFolderId,
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
