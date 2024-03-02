let setToLocalStorage=(id,isGoogleSigned)=>{
    
    if(!isGoogleSigned){
        localStorage.setItem("id",id);
    }
    else{
        localStorage.setItem("id",id);
    }
}
let delLocalStorage=()=>{
    //
}
export {setToLocalStorage,delLocalStorage}