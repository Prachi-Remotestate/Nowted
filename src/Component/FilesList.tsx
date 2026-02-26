import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  preview: string;
}

interface FilesListProps {
  activeFolderId: string | null;
  activeNoteId: string | null;
}
const FilesList = ({ activeFolderId, activeNoteId }: FilesListProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();
  console.log(activeFolderId);
  const fetchNotes = async (folderId: string) => {
    try {
      setLoading(true);
      const url = `https://nowted-server.remotestate.com/notes?archived=false&favorite=false&deleted=false&folderId=${folderId}&page=1&limit=10`;

      const res = await axios.get(url);
      console.log(res);
      if (Array.isArray(res.data?.notes)) {
        setNotes(res.data.notes);
        console.log(res.data.notes[0].folder.name);
        setFolderName(res.data.notes[0].folder.name);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFolderId) {
      fetchNotes(activeFolderId);
    } else {
      setNotes([]);
    }
  }, [activeFolderId]);

  return (
    <div className="h-full flex flex-col text-primary">
      {/* Header */}
      <div className="px-6 py-5 border-theme">
        <h2 className="text-lg font-semibold tracking-tight">
          {activeFolderId ? folderName : "Select a Folder"}
        </h2>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loading && (
          <div className="text-sm text-secondary">Loading notes...</div>
        )}

        {!loading && notes.length === 0 && (
          <div className="flex items-center justify-center h-full text-sm text-secondary">
            No notes found.
          </div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() =>
              navigate(`/folders/${activeFolderId}/notes/${note.id}`)
            }
            className={`border-theme rounded-lg p-4 cursor-pointer transition-all
    ${
      activeNoteId === note.id
        ? "bg-hover border border-primary"
        : "bg-primary bg-opacity-60 hover:bg-hover"
    }
  `}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium truncate">{note.title}</h3>
            </div>

            <div className="flex gap-3">
              <p className="text-xs text-secondary mb-1">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <p className="text-xs text-secondary line-clamp-2">
                {note.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
