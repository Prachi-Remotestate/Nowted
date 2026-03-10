import { useEffect, useRef, useState } from "react";
import { updateNote } from "../../api/Notesapi";
import { toast } from "react-toastify";
import type { NoteEditorProps } from "./Editor";
const EditorContent = ({ note, setNote, triggerRefresh }: NoteEditorProps) => {
  const [content, setContent] = useState(note.content);
  const isFirstRender = useRef(true);
  const keyCount = useRef(0);
  useEffect(() => {
    setContent(note.content);
  }, [note.id]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(async () => {
      await updateNote(note.id, { content });

      setNote((prev: any) => ({ ...prev, content }));
      toast.success("note updated");
      triggerRefresh();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <div className="scrollbar-hide">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={() => {
          keyCount.current += 1;

          if (keyCount.current >= 10) {
            updateNote(note.id, { content });
            keyCount.current = 0;
          }
        }}
        className="w-full min-h-200 bg-transparent outline-none overflow-y-auto no-scrollbar"
      />
    </div>
  );
};

export default EditorContent;
