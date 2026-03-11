import { useSearchParams } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const SearchInput = ({ onClose }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  return (
    <div className="w-full flex justify-center">
      <input
        autoFocus
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => {
          if (!searchTerm) onClose();
        }}
        placeholder="Search notes..."
        className="w-4/5 py-1.5 rounded-md text-sm outline-none pb-4"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    </div>
  );
};

export default SearchInput;
