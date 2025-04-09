function HomeCustomize() {
    return (
        <div >
        
            <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
            <h1 className="text-white text-center">HOME</h1>
            </div>
          
          <div className="flex flex-col mt-4">

            <div className="form-check form-switch ">
              <label className="form-check-label" for="switchCheckDefault">Store status: </label>
              <input className="form-check-input-ml-4" for="switchCheckDefault" type="checkbox" role="switch" id="switchCheckDefault" />
            </div>

            <div className="w-auto h-[220px] border-none bg-gray-500 mt-4">
            <p>store img</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] mt-4 ml-4">
            <i class="bi bi-shop"></i>
            <p>เกี่ยวกับเรา</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] mt-4 ml-4">
            <i class="bi bi-shop"></i>
            <p>บริการของเรา</p>
            </div>

            <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] mt-4 ml-4">
            <i class="bi bi-geo-alt-fill"></i>
            <p>ที่อยู่ร้าน</p>
            </div>

            </div>
        </div>
       
    )
}

export default HomeCustomize
