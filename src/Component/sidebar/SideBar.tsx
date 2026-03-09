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
      className="flex flex-col bg-primary text-primary overflow-x-hidden no-scrollbar  h-screen"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      <div className="flex flex-col justify-between no-scrollbar h-full">
        <div>
          <SidebarHeader setIsSearching={setIsSearching} />

          {isSearching ? (
            <SearchInput onClose={() => setIsSearching(false)} />
          ) : (
            <NewNoteButton />
          )}

          <RecentsSection />

          <FoldersSection />
        </div>
        <div>
          <MoreSection />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
