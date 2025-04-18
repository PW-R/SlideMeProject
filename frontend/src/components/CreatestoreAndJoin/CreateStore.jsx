import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function CreateStore() {
  const [showPassword, setShowPassword] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ model: "", license: "" });
  const [storeInfo, setStoreInfo] = useState({
    images: [],
    promptpay: null,
  });
  

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

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setStoreInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const deleteImage = (index) => {
    setStoreInfo((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStoreInfo((prev) => ({
        ...prev,
        [type]: imageUrl,
      }));
    }
  };

  return (
    <AppWrapper>
      <div style={{ overflow: "hidden" }} className="pb-32">
        <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
          <Link to="/CreateAndjoin">
            <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
          </Link>
          <h1 className="text-white">สร้างร้าน</h1>
        </div>

        <div className="pt-[130px] px-4 space-y-4">
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

          <div>
            {/* ส่วนอัปโหลดรูปภาพร้าน */}
            <label className="block mb-1">รูปภาพร้าน:</label>
            <label
              htmlFor="storeImages"
              className="inline-block cursor-pointer text-center border !border-green-400 text-green-600 px-4 py-2 rounded-lg w-full text-sm hover:bg-green-50 transition"
            >
              เพิ่มรูปภาพ
            </label>
            <input
              id="storeImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImagesChange}
              className="hidden"
            />

            {/* แสดงภาพที่อัปโหลดแล้ว */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {storeInfo.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`ร้าน-${idx}`}
                    className="w-full h-32 object-cover rounded shadow"
                  />
                  <button
                    onClick={() => deleteImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white px-2 text-xs rounded-full"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
  <label className="block mb-1">QR Code PromptPay:</label>

  {/* ปุ่มเลือก QR */}
  <label
    htmlFor="qrPromptpay"
    className="inline-block cursor-pointer text-center border border-green-400 text-green-600 px-4 py-2 rounded-lg w-full text-sm hover:bg-green-50 transition"
  >
    เพิ่มรูปภาพ QR
  </label>

  <input
    id="qrPromptpay"
    type="file"
    accept="image/*"
    onChange={(e) => handleFileChange(e, "promptpay")}
    className="hidden"
  />

  {/* Preview QR ถ้าอัปโหลดแล้ว */}
  {storeInfo.promptpay && (
    <img
      src={storeInfo.promptpay}
      alt="QR Code"
      className="mt-2 rounded shadow w-full max-w-xs"
    />
  )}
</div>


          <Link to="/HomeCustomize" className="mb-4 w-[291px] h-[50px] mt-5">
            <div className="bg-[#48d065] text-white w-[320px] h-[45px] rounded-[20px] font-bold text-lg flex !items-center justify-center hover:bg-[#43af56] transition ">
              สร้างร้าน
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

export default CreateStore;
