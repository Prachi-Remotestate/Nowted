import { useTheme } from "../hooks/useTheme";
import { Pen } from "lucide-react";
import { Search } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { Folder } from "lucide-react";
import { FileText } from "lucide-react";
import { Star } from "lucide-react";
import { Archive } from "lucide-react";
import { Trash } from "lucide-react";
import { FolderOpen } from "lucide-react";
const SideBar = () => {
  const { theme, setTheme } = useTheme();

  const recents = [
    { id: 1, title: "Reflection on the Month of June", active: true },
    { id: 2, title: "Project proposal" },
    { id: 3, title: "Travel itinerary" },
  ];

  const folders = [
    "Personal",
    "Work",
    "Travel",
    "Events",
    "Finances",
    "Ideas",
    "Learning",
  ];

  return (
    <aside
      className="h-full flex flex-col bg-primary text-primary"
      style={{
        padding: "var(--sidebar-padding-y) var(--sidebar-padding-x)",
      }}
    >
      <div className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-2 pl-3 ">
          <h1 className="text-xl font-semibold tracking-tight font-logo">
            Nowted
          </h1>

          <Pen
            size={16}
            strokeWidth={1.8}
            className="text-secondary hover:text-primary transition-colors cursor-pointer"
          />
        </div>

        <Search
          size={18}
          strokeWidth={1.8}
          className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4  "
        />
      </div>

      <button
        className="w-full py-2.5 rounded-md text-sm font-medium transition mb-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        + New Note
      </button>

      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-wider mb-4 text-secondary pl-4">
          Recents
        </h2>

        <div className="flex flex-col gap-1 pl-5">
          {recents.map((note) => (
            <button
              key={note.id}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition"
              style={{
                backgroundColor: note.active ? "var(--accent)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!note.active)
                  e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                if (!note.active)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FileText
                size={16}
                strokeWidth={1.8}
                className="text-secondary hover:text-primary transition-colors cursor-pointer"
              />
              <span className="truncate">{note.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs uppercase tracking-wider text-secondary pl-4">
            Folders
          </h2>
          <FolderPlus
            size={18}
            strokeWidth={1.8}
            className="text-secondary hover:text-primary transition-colors cursor-pointer mr-4"
          />
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto max-h-[200px] pr-1 pl-5">
          {folders.map((folder, index) => (
            <button
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Folder
                size={18}
                strokeWidth={1.8}
                className="text-secondary hover:text-primary transition-colors cursor-pointer"
              />
              {folder}
            </button>
          ))}
        </div>
      </section>
      <div className="pt-6 ">
        {" "}
        <h2 className="text-xs uppercase tracking-wider mb-3 text-secondary pl-4">
          {" "}
          More{" "}
        </h2>
        <div className="flex flex-col gap-1 pl-5">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Star size={16} strokeWidth={1.8} />
            Favorites
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Trash size={16} strokeWidth={1.8} />
            Trash
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-hover hover:text-primary transition">
            <Archive size={16} strokeWidth={1.8} />
            Archived Notes
          </button>
        </div>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-xs opacity-60 hover:opacity-100 transition"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </aside>
  );
};

export default SideBar;
