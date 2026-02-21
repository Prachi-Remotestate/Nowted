import FilesList from "./FilesList";
import SideBar from "./SideBar";

const Main = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-primary text-primary">
      <div
        className="shrink-0 border-r"
        style={{
          width: "var(--sidebar-width)",
          borderColor: "var(--border-color)",
        }}
      >
        <SideBar />
      </div>

      <div
        className="shrink-0 border-r overflow-y-auto  bg-secondary"
        style={{
          width: "var(--middle-width)",
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <FilesList />
      </div>

      <div className="flex-1 overflow-y-auto p-10">Whyy</div>
    </div>
  );
};

export default Main;
