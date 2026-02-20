import React from "react";
import pencil from "../assets/pencil.svg";
import search from "../assets/search.png";
import Folder from "../assets/folder.png";
type RecentNote = {
  id: number;
  title: string;
  active?: boolean;
};

type Folder = {
  id: number;
  name: string;
};

const SideBar = () => {
  const recents: RecentNote[] = [
    { id: 1, title: "Reflection on the Month of June", active: true },
    { id: 2, title: "Project proposal" },
    { id: 3, title: "Travel itinerary" },
  ];

  const folders: Folder[] = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Work" },
    { id: 3, name: "Travel" },
    { id: 4, name: "Events" },
    { id: 5, name: "Finances" },
    { id: 6, name: "Ideas" },
    { id: 7, name: "Learning" },
  ];

  return (
    <aside className="flex flex-col h-full w-full px-4 pt-4 pb-9 bg-BackgroundPrimary text-textColor">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="font-kaushan text-xl leading-none">Nowted</h1>
          <img src={pencil} alt="edit" className="w-3.5 h-3.5" />
        </div>

        <button>
          <img src={search} alt="search" className="w-4 h-4" />
        </button>
      </div>

      <button className="w-full bg-BackgroundSecondary py-2 rounded-md mb-6 text-sm hover:opacity-90 transition">
        + New Note
      </button>

      <section className="mb-6">
        <h2 className="text-xs opacity-60 mb-3">Recents</h2>

        <div className="flex flex-col gap-2">
          {recents.map((note) => (
            <button
              key={note.id}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition
              whitespace-nowrap overflow-hidden text-ellipsis
              ${
                note.active
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-BackgroundSecondary"
              }`}
            >
              {note.title}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col mb-6">
        <h2 className="text-xs opacity-60 mb-3">Folders</h2>

        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className="flex items-center gap-2 text-sm px-2 py-1.5 rounded-md w-full text-left hover:bg-BackgroundSecondary transition"
            >
              <img src={Folder} /> {folder.name}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs opacity-60 mb-3">More</h2>

        <div className="flex flex-col gap-2">
          <button className="text-sm text-left px-2 py-1.5 rounded-md hover:bg-BackgroundSecondary transition">
            ⭐ Favorites
          </button>

          <button className="text-sm text-left px-2 py-1.5 rounded-md hover:bg-BackgroundSecondary transition">
            🗑 Trash
          </button>

          <button className="text-sm text-left px-2 py-1.5 rounded-md hover:bg-BackgroundSecondary transition">
            📦 Archived Notes
          </button>
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
