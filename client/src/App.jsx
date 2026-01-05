import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import SubmitIdea from "./pages/SubmitIdea";
import Ideas from "./pages/Ideas";
import IdeaDetail from "./pages/IdeaDetail";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Homepage with layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Idea submission + explore */}
      <Route
        path="/submit-idea"
        element={
          <Layout>
            <SubmitIdea />
          </Layout>
        }
      />
      <Route
        path="/ideas"
        element={
          <Layout>
            <Ideas />
          </Layout>
        }
      />
      <Route
        path="/ideas/:id"
        element={
          <Layout>
            <IdeaDetail />
          </Layout>
        }
      />

      {/* Aliases for existing homepage links */}
      <Route path="/submit" element={<Navigate to="/submit-idea" replace />} />
      <Route path="/explore" element={<Navigate to="/ideas" replace />} />
    </Routes>
  );
}

export default App;
