import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Component/Main";
import { NotesProvider } from "./hooks/ContextNotes";

const App = () => {
  return (
    <NotesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/folders/:folderId/:folderName?" element={<Main />} />
          <Route path="/folders/:folderId/notes/:noteId" element={<Main />} />
          <Route path="/notes/:noteId" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  );
};

export default App;
