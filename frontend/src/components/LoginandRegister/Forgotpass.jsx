import { Link } from "react-router-dom";
function Forgotpass() {
    return ( 
        <AppWrapper>
        <div className="flex flex-col items-center p-4">
             {/* โลโก้ */}
      <div className="flex justify-center mb-4">
        <img
          src="/slideme.svg"
          alt="Logo"
          className="w-60 h-60 object-contain"
        />
      </div>
      {/* หัวข้อ */}
      <h1 className="mb-6 !text-[#33b44f] text-2xl font-extrabold text-center ">
        Forgot Password?
      </h1>

      <input
        type="text"
        placeholder="OTP"
        className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
      />

     <Link to="#" className="mb-4 w-[291px] h-[50px]">
      <div className="bg-[#48d065] text-white w-full h-full rounded-[20px] font-bold text-lg flex items-center justify-center hover:bg-[#43af56] transition">
       Sead OTP
       </div>
       </Link>
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

export default Forgotpass;