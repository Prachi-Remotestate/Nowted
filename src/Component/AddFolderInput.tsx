import { useState } from "react";
import axios from "axios";

interface AddFolderInputProps {
  onCreated: () => void;
  onCancel: () => void;
}

const AddFolderInput = ({ onCreated, onCancel }: AddFolderInputProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onCancel();
      return;
    }

    if (e.key !== "Enter") return;

    if (!name.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://nowted-server.remotestate.com/folders",
        { name: name.trim() },
      );
      console.log(res.data);

      onCreated();
      setName("");
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <input
      autoFocus
      value={name}
      disabled={loading}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={onCancel}
      placeholder="New folder name"
      className="w-full bg-transparent border border-primary rounded px-3 py-2 text-sm outline-none"
    />
  );
};

export default AddFolderInput;
