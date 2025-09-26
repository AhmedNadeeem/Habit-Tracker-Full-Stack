import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Dashboard from "./pages/Dashboard"
import Habits from "./pages/Habits"
import HabitsStats from "./pages/HabitsStats"
import RegisterLogin from "./pages/RegisterLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/login" element={<RegisterLogin />} />
          <Route path="/register" element={<RegisterLogin />} />
          <Route path="/habits/stats" element={<HabitsStats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
