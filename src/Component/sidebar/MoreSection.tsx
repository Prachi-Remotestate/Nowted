import { Star, Archive, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const MoreSection = () => {
  const base = "flex items-center gap-3 py-2 px-2 rounded-md transition";

  const active = "bg-active text-primary";
  const inactive = "text-secondary";

  return (
    <div className="pt-6 ">
      <h2 className="text-xs uppercase mb-3 text-secondary pl-2">More</h2>

      <div className="flex flex-col gap-1 pl-2">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Star size={16} />
          Favorites
        </NavLink>

        <NavLink
          to="/trash"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Trash size={16} />
          Trash
        </NavLink>

        <NavLink
          to="/archived"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Archive size={16} />
          Archived Notes
        </NavLink>
      </div>
    </div>
  );
};

export default MoreSection;
