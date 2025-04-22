import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg(""); // clear old error
    try {
      const res = await fetch("http://localhost:3000/api/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/UserHome");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <AppWrapper>
      <div className="flex flex-col items-center p-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/slideme.svg" alt="Logo" className="w-60 h-60 object-contain" />
        </div>

        {/* Heading */}
        <h1 className="mb-6 !text-[#33b44f] text-2xl font-extrabold text-center">
          Login!
        </h1>

        {/* Input: Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 placeholder-gray-400 px-4 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
        />

        {/* Input: Password */}
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

        {/* Error message */}
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center w-[320px] mb-6 text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="accent-[#33b44f] mr-2" />
            Remember me
          </label>
          <Link to="/Forgotpass" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mb-4 w-[291px] h-[50px] bg-[#48d065] text-white rounded-[20px] font-bold text-lg flex items-center justify-center hover:bg-[#43af56] transition"
        >
          Login
        </button>

        {/* Sign Up Button */}
        <Link to="/RegisterUser" className="mb-4 w-[291px] h-[50px]">
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
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto relative bg-white">
      {children}
    </div>
  );
}

export default LoginUser;
