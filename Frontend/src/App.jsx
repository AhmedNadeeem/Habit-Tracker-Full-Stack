import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Dashboard from "./pages/Dashboard"
import Habits from "./pages/Habits"
import Auth from "./pages/AuthPage"
import Stats from "./pages/Stats"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/auth/:type" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
