import { Link } from "react-router-dom";

function DriverorUser() {
  return (
    <AppWrapper>
      <div className="flex flex-col justify-center items-center gap-6 mt-20" >
        {/* โลโก้ */}
        <div className="flex justify-center mb-4">
          <img
            src="/slideme.svg"
            alt="Logo"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* หัวข้อ */}
        <h3 className="!text-[#18C338] text-xl font-semibold">
          Are You User or Driver?
        </h3>

        {/* ปุ่ม: User */}
        <Link to="/LoginUser" className="w-[300px]">
          <div className="w-full h-[52px] rounded-[15px] bg-[#2CD64B] text-white font-semibold text-xl shadow-md hover:bg-[#24b23e] transition duration-200 flex items-center justify-center">
            User
          </div>
        </Link>

        {/* ปุ่ม: Driver */}
        <Link to="/LoginDriver" className="w-[300px]">
          <div className="w-full h-[52px] rounded-[15px] bg-[#2CD64B] text-white font-semibold text-xl shadow-md hover:bg-[#24b23e] transition duration-200 flex items-center justify-center">
            Driver
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

export default DriverorUser;
