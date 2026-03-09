import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Component/Main";
import FilesList from "./Component/FilesList";
import Editor from "./Component/editor/Editor";
import { NotesProvider } from "./context/ContextNotes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const theme = (localStorage.getItem("theme") as "light" | "dark") || "dark";
  return (
    <NotesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Navigate to="/folders/default" />} />

            {/* Folder */}
            <Route path="folders/:folderId" element={<FilesList />}>
              <Route path="notes/:noteId" element={<Editor />} />
            </Route>

            {/* Favorites */}
            <Route path="favorites" element={<FilesList />}>
              <Route path="notes/:noteId" element={<Editor />} />
            </Route>

            {/* Archived */}
            <Route path="archived" element={<FilesList />}>
              <Route path="notes/:noteId" element={<Editor />} />
            </Route>

            {/* Trash */}
            <Route path="trash" element={<FilesList />}>
              <Route path="notes/:noteId" element={<Editor />} />
            </Route>
          </Route>
        </Routes>

        <ToastContainer
          key={theme}
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme={theme}
        />
      </BrowserRouter>
    </NotesProvider>
  );
};

export default App;
