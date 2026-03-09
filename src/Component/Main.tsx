import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "./sidebar/SideBar";
import Editor from "./editor/Editor";

const Main = () => {
  const [refreshNotes, setRefreshNotes] = useState(0);

  const triggerRefresh = () => {
    setRefreshNotes((prev) => prev + 1);
  };

  return (
    <div className="h-screen overflow-hidden flex bg-primary text-primary">
      {/* Sidebar */}
      <div
        className="relative z-10 overflow-y-scroll scrollbar-hide shrink-0 border-r"
        style={{
          width: "var(--sidebar-width)",
          borderColor: "var(--border-color)",
        }}
      >
        <SideBar />
      </div>

      {/* Files List */}
      <div
        className="relative z-0 shrink-0 border-r overflow-y-auto bg-primary opacity-100"
        style={{
          width: "var(--middle-width)",
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <Outlet context={{ refreshNotes }} />
      </div>

      {/* Editor */}
      <div className="relative z-0 flex-1 overflow-y-auto">
        <Editor triggerRefresh={triggerRefresh} />
      </div>
    </div>
  );
};

export default Main;
