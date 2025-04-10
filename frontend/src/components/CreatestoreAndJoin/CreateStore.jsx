import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function CreateStore() {
  const [showPassword, setShowPassword] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ model: "", license: "" });

  const addRowData = () => {
    if (task.model.trim() !== "" && task.license.trim() !== "") {
      setTasks([...tasks, task]);
      setTask({ model: "", license: "" });
    }
  };

  const deleteRowData = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <AppWrapper>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <div className="flex flex-col pl-4 text-white">
          <h1 className="text-white  ">Create Your Store</h1>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-lg text-center">
          กรุณากรอกข้อมูลเพื่อสร้างร้านของคุณ
        </p>
        <div className="flex flex-col items-center">
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

          <div className="relative ">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-[#E5E1E1] text-[#A09D9D] w-[290px] h-[45px] rounded-[30px] p-4 !text-lg mt-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              <p className="text-[#A09D9D] text-sm mt-2 ml-4">
                Your password must be 8-20 characters.
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="relative mt-2">
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

        <div className="w-full max-w-md mx-auto p-4 ">
          <label className="block mb-2 font-semibold">ยานพาหนะ</label>
          <div className="flex f items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="รุ่นรถ"
              value={task.model}
              onChange={(e) => setTask({ ...task, model: e.target.value })}
              className="bg-[#E5E1E1] text-[#A09D9D] px-4 py-2 rounded-full w-1/2"
            />
            <input
              type="text"
              value={task.license}
              placeholder="ทะเบียนรถ"
              onChange={(e) => setTask({ ...task, license: e.target.value })}
              className="bg-[#E5E1E1] text-[#A09D9D] px-4 py-2 rounded-full w-1/2"
            />
            <button
              className="bg-[#2CD64B] text-white px-4 py-2 !rounded-[15px]"
              onClick={addRowData}
            >
              เพิ่ม
            </button>
          </div>
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={task.model}
                readOnly
                className="bg-[#E5E1E1] text-[#A09D9D] px-4 py-2 rounded-full w-1/2"
              />
              <input
                type="text"
                value={task.license}
                readOnly
                className="bg-[#E5E1E1] text-[#A09D9D] px-4 py-2 rounded-full w-1/2"
              />
              <button
                className="bg-[#fff] text-[#2CD64B] border-[1px] border-[#2CD64B] px-4 py-2 !rounded-[15px]"
                onClick={() => deleteRowData(index)}
              >
                ลบ
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center mt-1">
          <div className="w-[320px] h-[200px] bg-[#E5E1E1] p-4 rounded-xl shadow ">
            <label className="block text-[#A09D9D] mb-2 ">ภาพร้าน</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#B9B6B6] file:text-white
                     hover:file:bg-green-600"
            />
          </div>
          <div className="w-[320px] h-[200px] bg-[#E5E1E1] p-4 rounded-xl mt-5 shadow ">
            <label className="block text-[#A09D9D] mb-2 ">
              QR-code payment
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#B9B6B6] file:text-white
                     hover:file:bg-green-600"
            />
          </div>
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

export default CreateStore;
