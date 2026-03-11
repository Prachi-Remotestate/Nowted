import { useState } from "react";

import SidebarHeader from "./SidebarHeader";
import SearchInput from "./SearchInput";
import NewNoteButton from "./NewNoteButton";
import RecentsSection from "./RecentsSection";
import FoldersSection from "./FolderSection";
import MoreSection from "./MoreSection";

const SideBar = () => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <aside
      className="flex flex-col bg-primary text-primary overflow-x-hidden no-scrollbar h-screen"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      <div className="max-h-7/20 pt-4">
        <SidebarHeader setIsSearching={setIsSearching} />

        {isSearching ? (
          <SearchInput onClose={() => setIsSearching(false)} />
        ) : (
          <NewNoteButton />
        )}

        <RecentsSection />
      </div>

      <div className="max-h-2/5 overflow-auto">
        <FoldersSection />
      </div>
      <div className="max-h-1/4">
        <MoreSection />
      </div>
    </aside>
  );
};

export default SideBar;
