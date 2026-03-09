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
      className="flex flex-col bg-primary text-primary overflow-x-hidden"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      <SidebarHeader setIsSearching={setIsSearching} />

      {isSearching ? (
        <SearchInput onClose={() => setIsSearching(false)} />
      ) : (
        <NewNoteButton />
      )}

      <RecentsSection />

      <FoldersSection />

      <MoreSection />
    </aside>
  );
};

export default SideBar;
