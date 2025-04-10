import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterDirver() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AppWrapper>
      <div className="flex flex-col items-center w-full gap-4 ">
        {/* ส่วนหัวhead */}
        <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[200px] w-full flex items-end pb-2 rounded-b-3xl z-[3000]">
          <div className="flex flex-col pl-10 text-white">
            <h3 className="text-xl">Let’s</h3>
            <h1>
              Create <br /> Your <br /> Account
            </h1>
          </div>
        </div>

        {/* ส่วนกรอกข้อมูล */}
        <input
          type="text"
          placeholder="Username"
          className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
        />

        <input
          type="date"
          className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
        />

        {/* Input: Password */}
        <div className="relative w-[320px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Input: Upload Image */}
        <div className="w-[320px] h-[200px] bg-[#6aea93] p-4 rounded-xl shadow">
          <label className="block text-white mb-2">แนบใบขับขี่</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#0DC964] file:text-white
                     hover:file:bg-green-600"
          />
        </div>

        {/* ปุ่ม Login */}
        <Link to="/HomeCustomize" className="w-[320px]">
          <div className="bg-[#48d065] text-white h-[50px] rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#5fba70] transition">
            CreateAccount
          </div>
        </Link>
      </div>
    </AppWrapper>
  );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto relative bg-white">
      {children}
    </div>
  );
}

export default RegisterDirver;
