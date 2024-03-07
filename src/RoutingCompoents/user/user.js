
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../../Components/Home/Home";
import { NavigationPage } from "../../Components/NavigationPage/NavigationPage";
let UserComp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loger" element={<h1>owef</h1>} />
        <Route path="/navigation" element={<NavigationPage/>} />
      </Routes>
    </>
  )

}
export { UserComp }