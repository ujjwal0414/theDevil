import { Navigate,Outlet } from "react-router-dom";
const PrivateRouter=()=>{
    let auth={token:true}
    return(
        <>
        {
            auth.token?<Outlet/>:<Navigate to={"/login"}/>
        }
        </>
    )
}
export {PrivateRouter}