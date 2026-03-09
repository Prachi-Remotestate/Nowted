import { useEffect, useState } from "react";
import { updateNote } from "../../api/Notesapi";
import { toast } from "react-toastify";

const EditorContent = ({ note, setNote, triggerRefresh }: any) => {
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await updateNote(note.id, { content });
      setNote({ ...note, content });
      toast.success("Note Updated");
      triggerRefresh();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <div className="scrollbar-hide">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-200 bg-transparent outline-none overflow-y-auto no-scrollbar"
      />
    </div>
  );
};

export default EditorContent;
