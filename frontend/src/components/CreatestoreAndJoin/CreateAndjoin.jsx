import { Link } from "react-router-dom";
function CreateAndjoin() {
    return (
      <AppWrapper>
        <div className=" flex flex-col items-center justify-center px-4 ">
          {/* โลโก้ */}
          <div className="flex justify-center mb-4">
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-60 h-60 object-contain"
            />
          </div>
    
          {/* หัวข้อ */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#33b44f] mb-8 text-center">
            คุณต้องการทำอะไร?
          </h1>
    
          {/* ปุ่ม */}
          <div className="space-y-4 w-full max-w-xs">
            <Link to="/Createstore" className="block">
              <div className="bg-[#48d065] text-white w-full h-[50px] rounded-[20px] font-semibold text-lg flex items-center justify-center hover:bg-[#43af56] transition duration-200 shadow-md">
                สร้างร้าน
              </div>
            </Link>
    
            <Link to="/Joinstore" className="block">
              <div className="bg-[#48d065] text-white w-full h-[50px] rounded-[20px] font-semibold text-lg flex items-center justify-center hover:bg-[#43af56] transition duration-200 shadow-md">
                เข้าร่วมร้าน
              </div>
            </Link>
          </div>
        </div>
        </AppWrapper>
      );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto relative">
      {children}
    </div>
  );
}

export default CreateAndjoin;