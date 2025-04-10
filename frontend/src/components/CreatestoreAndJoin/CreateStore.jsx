import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function CreateStore() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppWrapper>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <div className="flex flex-col pl-4 text-white">
          <h1 className="text-white  ">Create Your Store</h1>
        </div>
      </div>

      <div className="mt-4 ml-4">
        <p className="text-lg">กรุณากรอกข้อมูลเพื่อสร้างร้านของคุณ</p>
        <div className="flex flex-col">
          <input
            className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-2"
            type="text"
            placeholder="ชื่อร้าน"
          />

          <input
            className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-4"
            type="text"
            placeholder="ที่อยู่ร้าน"
          />

          <input
            className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-4"
            type="text"
            placeholder="เบอร์โทรศัพท์ร้าน"
          />

          <input
            className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-4"
            type="text"
            placeholder="ชื่อผู้ดูแลร้าน"
          />

          <input
            className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-4"
            type="text"
            placeholder="เบอร์โทรศัพท์ผู้ดูแล"
          />

          <div className="relative w-[290px] h-[45px]">
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

          <div className="flex flex-col space-y-4">
            <div className="relative mt-4">
              <textarea
                className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[100px] rounded-[15px] p-4 !text-lg"
                id="floatingTextarea1"
              ></textarea>
              <label
                htmlFor="floatingTextarea1"
                className="absolute top-2 left-4 text-[#A09D9D] text-sm"
              >
                เกี่ยวกับร้าน
              </label>
            </div>

            <div className="relative">
              <textarea
                className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[100px] rounded-[15px] p-8 !text-lg"
                id="floatingTextarea2"
              ></textarea>
              <label
                htmlFor="floatingTextarea2"
                className="absolute top-2 left-4 text-[#A09D9D] text-sm"
              >
                บริการภายในร้าน
              </label>
            </div>
          </div>
        </div>

        <label htmlFor="car" className="flex items-center">
          ยานพาหนะ
        </label>
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

export default CreateStore;
