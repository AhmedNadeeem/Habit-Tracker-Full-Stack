import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Auth from "./pages/AuthPage";
import Stats from "./pages/Stats";
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedPage>
                <Stats />
              </ProtectedPage>
            }
          />
          <Route
            path="/habits"
            element={
              <ProtectedPage>
                <Habits />
              </ProtectedPage>
            }
          />
          <Route path="/auth/register" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
