import { useEffect, useState } from "react";
import { getRecentNotes } from "../../api/Notesapi";
import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { RecentNote } from "../../types/types";
import type { previewRes } from "../../types/apitype";
const RecentsSection = () => {
  const [recents, setRecents] = useState<previewRes[]>([]);
  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    const fetchRecents = async () => {
      const data = await getRecentNotes();
      setRecents(data);
    };

    fetchRecents();
  }, []);

  return (
    <section className="pt-3 pr-3">
      <h2 className="text-xs uppercase mb-4 text-secondary pl-2">Recents</h2>

      <div className="flex flex-col gap-1 ">
        {recents.map((note: RecentNote) => {
          const isActive = noteId === note.id;

          return (
            <button
              key={note.id}
              onClick={() =>
                navigate(`/folders/${note.folderId}/notes/${note.id}`)
              }
              className={`flex items-center gap-3 px-2 py-2  text-sm
              ${isActive ? "bg-active text-primary" : "text-secondary hover:bg-hover"}
              `}
            >
              <div>
                <FileText size={16} />
              </div>

              <span className="truncate">{note.title || "Untitled"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default RecentsSection;
