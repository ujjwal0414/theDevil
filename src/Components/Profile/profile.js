let Profile=()=>{
    return(
        <>
        <div className={`w-[100%] ${window.innerWidth < 650 ? "top-0" : ""} absolute md:bottom-10 z-40 flex justify-center `}>
         <div className="bg-white p-2 w-[100%] md:w-[30%] min-h-[10vh]">
          <div className="ppicANdInfo flex justify-center items-center">
            <div className="md:w-[5vw] md:h-[5vw]">
            <img src="" alt="ppic" className="md:w-[5vw] md:h-[5vw] rounded-full border-2 border-slate-500"/>

            </div>
            <div className="">
                <div>ujex@gmail.com</div>
                <div>89997978</div>
            </div>
          </div>
          <div></div>


         </div>
        </div>
        </>
    )
}
export {Profile}