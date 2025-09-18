import { BrowserRouter, Routse, Route } from "react-router-dom"
import './App.css'
import Layout from "./Layout"
import Dashboard from "./pages/Dashboard"
import Habits from "./pages/Habits"
import HabitsStats from "./pages/HabitsStats"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Router element={Dashboard} />
          <Router path="/login" element={Login} />
          <Router path="/register" element={Register} />
          <Router path="/habits" element={Habits} />
          <Router path="/habits/stats" element={HabitsStats} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
