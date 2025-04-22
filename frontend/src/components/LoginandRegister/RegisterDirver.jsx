import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterDirver() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    if (file) setLicenseImage(file);
  };

  const handleRegister = async () => {
    if (!username || !password || !birthdate || !licenseImage) {
      return alert("กรุณากรอกข้อมูลให้ครบ");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("birthdate", birthdate);
    formData.append("licenseImage", licenseImage);
    formData.append("phone", phone);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const res = await fetch("http://localhost:3000/api/login-driver/register-driver", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ สมัครเรียบร้อยแล้ว!");
        navigate("/LoginDriver"); // หรือเปลี่ยนตามหน้า login ที่ใช้จริง
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("เกิดข้อผิดพลาดในการสมัคร");
    }
  };

  return (
    <AppWrapper>
      <div style={{ overflow: "hidden" }} className="pb-32">
        <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[190px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
          <Link to="/DriverAccount">
            <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
          </Link>
          <div className="flex flex-col pr-35 text-white">
            <h3 className="text-xl">Let’s</h3>
            <h1>
              Create <br /> Your <br /> Account
            </h1>
          </div>
        </div>

        <div className="pt-[200px] flex flex-col items-center gap-4">
          {/* รูปโปรไฟล์ */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-gray-200 shadow overflow-hidden">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : "/default-profile.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-[#0DC964] file:text-white
                         hover:file:bg-green-600"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
          />

          {/* Birthdate */}
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
          />

          {/* Password */}
          <div className="relative w-[320px]">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* ใบขับขี่ */}
          <div className="w-[320px] h-[200px] bg-[#6aea93] p-4 rounded-xl shadow">
            <label className="block text-white mb-2">แนบใบขับขี่</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLicenseChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#0DC964] file:text-white
                hover:file:bg-green-600"
            />
          </div>

          {/* ปุ่มสมัคร */}
          <button
            onClick={handleRegister}
            className="w-[320px] bg-[#48d065] text-white h-[50px] rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#5fba70] transition"
          >
            Create Account
          </button>
        </div>
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
