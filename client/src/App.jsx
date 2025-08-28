import { Routes, Route } from "react-router-dom" 
import Home from "./Pages/Home.jsx" 
import Dash from "./Pages/Dash.jsx"

function App() {
  return ( 
    <> 
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dash />} /> 
      </Routes> 
    </> 
  )

}

export default App
