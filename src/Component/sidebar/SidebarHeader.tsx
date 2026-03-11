import { Pen, Search, SunMoon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  setIsSearching: (v: boolean) => void;
}

const SidebarHeader = ({ setIsSearching }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between pt-1 pb-3">
      <div className="flex items-center gap-2 pl-3">
        <h1 className="text-xl font-semibold tracking-tight font-logo">
          Nowted
        </h1>

        <Pen size={16} strokeWidth={1.8} className="mb-4" />
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="pl-9"
      >
        <SunMoon size={20} />
      </button>

      <Search
        size={18}
        className="cursor-pointer mr-4"
        onClick={() => setIsSearching(true)}
      />
    </div>
  );
};

export default SidebarHeader;
