import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

function App() {
  return (
    <Routes>
      {/* Homepage with layout */}
      <Route path="/" element={
        <Layout>
          <Homepage />
        </Layout>
      } />

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
