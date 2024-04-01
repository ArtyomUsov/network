import { Route, Routes } from "react-router-dom";
import Main from "../client/pages/Main";
import NotFoundPage from "../client/pages/NotFoundPage";
import Auth from "../client/pages/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/api/">
          <Route path="auth" element={<Auth />} />
          <Route path="user" element={<Main />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
