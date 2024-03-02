
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../../Components/Home/Home";
let UserComp=()=>{
    return(
      <>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/loger" element={<h1>owef</h1>}/>

      </Routes>
      </>
    )
    
  } 
  export {UserComp}