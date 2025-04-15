function HomeCustomize() {
    return (
        <div >
        <div style={{ overflow: "hidden" }} className="pb-32">
        <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">HOME</h1>
         </div>
          
          <div className="pt-[150px] flex flex-col items-center ">

            <div className="form-check form-switch ">
              <label className="form-check-label" for="switchCheckDefault">Store status: </label>
              <input className="form-check-input" for="switchCheckDefault" type="checkbox" role="switch" id="switchCheckDefault" />
            </div>

            <div className="w-full h-[220px] border-none bg-gray-500 mt-4">
            <p>store img</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4">
            <i class="bi bi-shop"></i>
            <p>เกี่ยวกับเรา</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4">
            <i class="bi bi-shop"></i>
            <p>บริการของเรา</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4">
            <i class="bi bi-geo-alt-fill"></i>
            <p>ที่อยู่ร้าน</p>
            </div>

            </div>
        </div>
        </div>
    )
}

export default HomeCustomize
