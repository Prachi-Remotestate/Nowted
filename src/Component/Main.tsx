import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "./Editor";
import FilesList from "./FilesList";
import SideBar from "./SideBar";

const Main = () => {
  const { folderId, noteId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (folderId) {
      setActiveFolderId(folderId);
    }
  }, [folderId]);

  return (
    <div className="h-screen overflow-hidden flex bg-primary text-primary">
      <div
        className="relative z-10 overflow-y-scroll scrollbar-hide shrink-0 border-r"
        style={{
          width: "var(--sidebar-width)",
          borderColor: "var(--border-color)",
        }}
      >
        <SideBar
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div
        className="relative z-0 shrink-0 border-r overflow-y-auto bg-secondary"
        style={{
          width: "var(--middle-width)",
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <FilesList searchTerm={searchTerm} />
      </div>

      <div className="relative z-0 flex-1 overflow-y-auto">
        <Editor activeNoteId={noteId || null} />
      </div>
    </div>
  );
};

export default Main;
