import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./CommonComponents/NavBar/Navbar";
import { NotFound } from "./NotFound";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { PrivateRouter } from "./PrivateRoute/PrivateRoute";
function App() {
  return (
    <>
   
    <Routes>
    <Route path="*" element={<NotFound/>}/>
      <Route element={<PrivateRouter/>}>
      <Route path="/" element={<Home/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
     </>
  );
}

export default App;
