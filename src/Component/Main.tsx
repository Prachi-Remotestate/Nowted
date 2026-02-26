import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "./Editor";
import FilesList from "./FilesList";
import SideBar from "./SideBar";

const Main = () => {
  const { folderId, noteId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (folderId) {
      setActiveFolderId(folderId);
    }
  }, [folderId]);

  return (
    <div className="h-screen flex overflow-hidden bg-primary text-primary">
      <div
        className="shrink-0 border-r"
        style={{
          width: "var(--sidebar-width)",
          borderColor: "var(--border-color)",
        }}
      >
        <SideBar />
      </div>

      <div
        className="shrink-0 border-r overflow-y-auto bg-secondary"
        style={{
          width: "var(--middle-width)",
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <FilesList
          activeFolderId={activeFolderId}
          activeNoteId={noteId || null}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-10">
        <Editor activeNoteId={noteId || null} />
      </div>
    </div>
  );
};

export default Main;
