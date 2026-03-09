import { FileText } from "lucide-react";

const EmptyEditor = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-10 text-secondary">
      <FileText size={48} strokeWidth={1.5} className="mb-6 opacity-60" />

      <h2 className="text-lg font-medium mb-2 text-primary">
        Select a note to view
      </h2>

      <p className="text-sm max-w-md">
        Choose a note from the list on the left to view its contents, or create
        a new note to add to your collection.
      </p>
    </div>
  );
};

export default EmptyEditor;
