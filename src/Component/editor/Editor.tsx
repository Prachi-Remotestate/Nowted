import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../../api/Notesapi";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import EmptyEditor from "./EmptyEditor";
import DeletedNoteView from "./DeletedNoteView";

const Editor = ({ triggerRefresh }: any) => {
  const { noteId } = useParams();

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchNote = async (id: string) => {
    try {
      setLoading(true);
      setNote(null);

      const res = await getNote(id);
      setNote(res.data.note);
    } catch {
      setNote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (noteId) fetchNote(noteId);
  }, [noteId]);

  if (!noteId) return <EmptyEditor />;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        Loading note...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center">
        Note not found
      </div>
    );
  }

  if (note.deletedAt) {
    return <DeletedNoteView note={note} setNote={setNote} />;
  }

  return (
    <div className="h-full flex flex-col px-12 py-10 overflow-y-hidden">
      <EditorHeader
        note={note}
        setNote={setNote}
        triggerRefresh={triggerRefresh}
      />
      <EditorContent
        note={note}
        setNote={setNote}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
};

export default Editor;
