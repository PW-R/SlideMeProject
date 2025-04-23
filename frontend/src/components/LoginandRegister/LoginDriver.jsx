// ✅ loginDriver.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginDriver() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/login-driver/login-driver",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      // ✅ เก็บข้อมูล
      sessionStorage.setItem("role", data.user.role);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // ✅ เงื่อนไขตาม role และการอนุมัติ
      if (data.user.role === "driver") {
        if (!data.user.isApproved) {
          if (data.user.hasJoinRequest) {
            navigate("/JoinStore"); // กำลังรออนุมัติ
          } else {
            navigate("/CreateAndjoin"); // ยังไม่เคยขอ join ร้าน
          }
          return;
        }

        // ✅ ผ่านการอนุมัติแล้ว
        if (data.user.storeId) {
          navigate("/HomeCustomize");
        } else {
          navigate("/CreateAndjoin");
        }
      } else if (data.user.role === "manager") {
        navigate("/HomeCustomize");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <AppWrapper>
      <div className="flex flex-col items-center p-4">
        <div className="flex justify-center mb-4">
          <img
            src="/slideme.svg"
            alt="Logo"
            className="w-60 h-60 object-contain"
          />
        </div>

        <h1 className="mb-6 !text-[#33b44f] text-2xl font-extrabold text-center ">
          Login!
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
        />

        <div className="relative w-[320px] mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="mb-4 w-[291px] h-[50px] bg-[#48d065] text-white !rounded-[20px] font-bold text-lg hover:bg-[#43af56] transition"
        >
          Login
        </button>

        <Link to="/RegisterDriver" className="mb-4 w-[291px] h-[50px]">
          <div className="bg-[#48d065] text-white w-full h-full rounded-[20px] font-bold text-lg flex items-center justify-center hover:bg-[#2ea144] transition">
            Sign In
          </div>
        </Link>
      </div>
    </AppWrapper>
  );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-gray-300 shadow-xl overflow-auto relative">
      {children}
    </div>
  );
}

export default LoginDriver;
