import { useState } from "react";
import { Link } from "react-router-dom";

function StoreAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: "TurboFix Shop",
    phone: "096-235-8888",
    owner: "ท้องพร บางสวาส",
    address: "56/4 พัฒนาการ 18 ประเวศ คลองตัน กรุงเทพฯ 15564",
    about: "Fix & Drive ร้านซ่อมรถยนต์ในเชียงใหม่...",
    services: ["บริการตรวจสภาพรถ", "บริการล้อคสไลด์"],
    cars: [
      { model: "ISUZU NPR 150 - SALES TRUCK", plate: "ฒง 5667" },
      { model: "TOYOTA REVO SMART CAB 2.4 ENTRY", plate: "ฒบ 2778" },
    ],
    images: [], // เปลี่ยนจาก image เป็น images
    promptpay: null,
  });

  const [newService, setNewService] = useState("");
  const [newCar, setNewCar] = useState({ model: "", plate: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo({ ...storeInfo, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStoreInfo({ ...storeInfo, [field]: imageUrl });
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setStoreInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const deleteImage = (index) => {
    const updated = storeInfo.images.filter((_, i) => i !== index);
    setStoreInfo({ ...storeInfo, images: updated });
  };

  const addService = () => {
    if (newService.trim() !== "") {
      setStoreInfo({
        ...storeInfo,
        services: [...storeInfo.services, newService],
      });
      setNewService("");
    }
  };

  const deleteService = (index) => {
    const updated = storeInfo.services.filter((_, i) => i !== index);
    setStoreInfo({ ...storeInfo, services: updated });
  };

  const addCar = () => {
    if (newCar.model.trim() && newCar.plate.trim()) {
      setStoreInfo({ ...storeInfo, cars: [...storeInfo.cars, newCar] });
      setNewCar({ model: "", plate: "" });
    }
  };

  const deleteCar = (index) => {
    const updated = storeInfo.cars.filter((_, i) => i !== index);
    setStoreInfo({ ...storeInfo, cars: updated });
  };

  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      {/* Header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/DriverAccount">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">
          {isEditing ? "แก้ไขข้อมูลร้าน" : "ข้อมูลร้าน"}
        </h1>
      </div>

      {/* Content */}
      <div className="pt-[130px] px-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{storeInfo.name}</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 underline text-sm"
          >
            {isEditing ? "บันทึก" : "แก้ไขข้อมูล"}
          </button>
        </div>

        {isEditing ? (
          <>
            <label htmlFor="name" className="block mb-1 font-medium">
              ชื่อร้าน
            </label>
            <input
              id="name"
              name="name"
              value={storeInfo.name}
              onChange={handleInputChange}
              className="border !border-green-400 p-2 w-full rounded mb-4"
              placeholder="ชื่อร้าน"
            />

            <label htmlFor="owner" className="block mb-1 font-medium">
              ชื่อเจ้าของ
            </label>
            <input
              id="owner"
              name="owner"
              value={storeInfo.owner}
              onChange={handleInputChange}
              className="border !border-green-400 p-2 w-full rounded mb-4"
              placeholder="ชื่อเจ้าของ"
            />

            <label htmlFor="phone" className="block mb-1 font-medium">
              เบอร์โทร
            </label>
            <input
              id="phone"
              name="phone"
              value={storeInfo.phone}
              onChange={handleInputChange}
              className="border !border-green-400 p-2 w-full rounded mb-4"
              placeholder="เบอร์โทร"
            />

            <label htmlFor="address" className="block mb-1 font-medium">
              ที่อยู่
            </label>
            <textarea
              id="address"
              name="address"
              value={storeInfo.address}
              onChange={handleInputChange}
              className="border !border-green-400 p-2 w-full rounded mb-4"
              placeholder="ที่อยู่"
            />

            <label htmlFor="about" className="block mb-1 font-medium">
              เกี่ยวกับร้าน
            </label>
            <textarea
              id="about"
              name="about"
              value={storeInfo.about}
              onChange={handleInputChange}
              className="border !border-green-400 p-2 w-full rounded h-24 mb-4"
              placeholder="เกี่ยวกับร้าน"
            />
            {/* บริการ */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">บริการ</label>
              <div className="border !border-green-400 p-3 rounded space-y-2 bg-white">
                {/* รายการบริการที่มีอยู่ */}
                {storeInfo.services.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded"
                  >
                    <span>{s}</span>
                    <button
                      onClick={() => deleteService(i)}
                      className="text-red-500 hover:underline"
                    >
                      ลบ
                    </button>
                  </div>
                ))}

                {/* ช่องกรอกบริการใหม่ + ปุ่มเพิ่ม */}
                <div className="flex gap-2 items-center">
                  <input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="เพิ่มบริการ"
                  />
                  <button
                    onClick={addService}
                    className="border px-4 py-1 rounded text-green-600 border-green-500 hover:bg-green-50"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
            </div>

            {/* รถ */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">ยานพาหนะ</label>
              <div className="border !border-green-400 p-3 rounded space-y-2 bg-white">
                {/* รายการรถที่มีอยู่ */}
                {storeInfo.cars.map((car, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded"
                  >
                    <span>
                      {car.model} - {car.plate}
                    </span>
                    <button
                      onClick={() => deleteCar(i)}
                      className="text-red-500 hover:underline"
                    >
                      ลบ
                    </button>
                  </div>
                ))}

                {/* ช่องกรอกข้อมูลรถใหม่ */}
                <div className="flex gap-2 items-center">
                  <input
                    value={newCar.model}
                    onChange={(e) =>
                      setNewCar({ ...newCar, model: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded w-1/2"
                    placeholder="รุ่นรถ"
                  />
                  <input
                    value={newCar.plate}
                    onChange={(e) =>
                      setNewCar({ ...newCar, plate: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded w-1/2"
                    placeholder="ทะเบียน"
                  />
                </div>

                {/* ปุ่มเพิ่มรถ */}
                <div className="flex justify-end">
                  <button
                    onClick={addCar}
                    className="mt-2 border px-4 py-1 rounded text-green-600 border-green-500 hover:bg-green-50"
                  >
                    เพิ่มข้อมูล
                  </button>
                </div>
              </div>
            </div>

            {/* รูปภาพหลายรูป */}
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

            {/* ส่วนอัปโหลด QR Code */}
            <div className="mt-4">
              <label className="block mb-1">QR Code PromptPay:</label>
              <label
            htmlFor="storeImages"
            className="inline-block cursor-pointer text-center border !border-green-400 text-green-600 px-4 py-2 rounded-lg w-full text-sm hover:bg-green-50 transition"
          >
            เพิ่มรูปภาพQR
          </label>
              <input
                id="qrPromptpay"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "promptpay")}
                className="hidden"
              />

              {/* แสดง QR Code ถ้าอัปโหลดแล้ว */}
              {storeInfo.promptpay && (
                <img
                  src={storeInfo.promptpay}
                  alt="QR Code"
                  className="mt-2 rounded shadow w-full max-w-xs"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1">
              ชื่อเจ้าของร้าน
            </label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {storeInfo.owner}
            </p>

            <label className="block text-sm font-medium mb-1">
              เบอร์โทรศัพท์
            </label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {storeInfo.phone}
            </p>

            <label className="block text-sm font-medium mb-1">
              ที่อยู่ร้าน
            </label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3 whitespace-pre-line">
              {storeInfo.address}
            </p>

            <label className="block text-sm font-medium mb-1">
              เกี่ยวกับร้าน
            </label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3 whitespace-pre-line">
              {storeInfo.about}
            </p>

            {/* กล่อง: บริการ */}
            <div className="border !border-green-400 bg-white rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-2">บริการ:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {storeInfo.services.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            {/* กล่อง: ยานพาหนะ */}
            <div className="border !border-green-400 bg-white rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-2">ยานพาหนะ:</h3>
              {storeInfo.cars.map((car, i) => (
                <div
                  key={i}
                  className="flex justify-between border rounded px-3 py-2 bg-gray-100 my-1"
                >
                  <span>{car.model}</span>
                  <span>{car.plate}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold mt-4">รูปภาพร้าน:</h3>
            <div className="grid grid-cols-2 gap-2">
              {storeInfo.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`ร้าน-${i}`}
                  className="rounded shadow w-full h-32 object-cover"
                />
              ))}
            </div>

            <h3 className="font-semibold mt-4">โอนเงินชำระ:</h3>
            {storeInfo.promptpay && (
              <img
                src={storeInfo.promptpay}
                alt="PromptPay QR"
                className="w-full rounded shadow"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StoreAccount;
