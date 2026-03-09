import { useNotes } from "../../context/ContextNotes";

interface Props {
  onClose: () => void;
}

const SearchInput = ({ onClose }: Props) => {
  const { searchTerm, setSearchTerm } = useNotes();

  return (
    <input
      autoFocus
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onBlur={() => {
        if (!searchTerm) onClose();
      }}
      placeholder="Search notes..."
      className="w-55 py-2.5 px-3 rounded-md text-sm outline-none mb-8 ml-8"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    />
  );
};

export default SearchInput;
