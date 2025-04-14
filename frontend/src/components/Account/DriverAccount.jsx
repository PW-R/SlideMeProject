import { Link } from "react-router-dom";

function DriverAccount() {
  return (
    <div className="w-[387px]  bg-white relative">
      {/* หัวบน */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-xl font-semibold">บัญชี</h1>
      </div>

      {/* เนื้อหา */}
      <div className="pt-[130px] px-6">
        {/* ส่วนโปรไฟล์ */}
        <div className="flex items-center gap-4">
          <img
            src="/profile-icon.png"
            alt="profile"
            className="w-16 h-16 rounded-full bg-gray-200"
          />
          <div>
            <p className="text-[#0dc964] text-sm font-medium">สวัสดี ขอให้วันนี้เป็นวันที่ดี</p>
            <h2 className="text-black font-bold text-lg">สมใจ สมดีนคร</h2>
          </div>
        </div>

        {/* เมนู */}
        <div className="mt-6 space-y-3">
          <Link to="/EditDriverAccount" className="block border-b py-2">ข้อมูลส่วนตัว</Link>
          <Link to="/StoreAccount" className="block border-b py-2">ข้อมูลร้าน</Link>
          <Link to="/RoleEmployee" className="block border-b py-2">ระบบพนักงาน</Link>
          <Link to="/RequestJoin" className="block border-b py-2">คำขอสมัครพนักงาน</Link>
          <Link to="/" className="block border-b py-2">ออกจากระบบ</Link>
        </div>
      </div>

      
    </div>
  );
}

export default DriverAccount;
