import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import { NotesProvider } from "./hooks/ContextNotes";

const App = () => {
  return (
    <NotesProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/folders/:folderId" element={<Main />} />
        <Route path="/folders/:folderId/notes/:noteId" element={<Main />} />
        <Route path="/notes/:noteId" element={<Main />} />
      </Routes>
    </NotesProvider>
  );
};

export default App;
