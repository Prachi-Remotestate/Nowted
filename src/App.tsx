import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Component/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/folders/:folderId" element={<Main />} />
        <Route path="/folders/:folderId/notes/:noteId" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
