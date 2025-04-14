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
    setStoreInfo((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const deleteImage = (index) => {
    const updated = storeInfo.images.filter((_, i) => i !== index);
    setStoreInfo({ ...storeInfo, images: updated });
  };

  const addService = () => {
    if (newService.trim() !== "") {
      setStoreInfo({ ...storeInfo, services: [...storeInfo.services, newService] });
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
        <h1 className="text-white">{isEditing ? "แก้ไขข้อมูลร้าน" : "ข้อมูลร้าน"}</h1>
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
            <input name="name" value={storeInfo.name} onChange={handleInputChange} className="border p-2 w-full rounded" placeholder="ชื่อร้าน" />
            <input name="phone" value={storeInfo.phone} onChange={handleInputChange} className="border p-2 w-full rounded" placeholder="เบอร์โทร" />
            <input name="owner" value={storeInfo.owner} onChange={handleInputChange} className="border p-2 w-full rounded" placeholder="ชื่อเจ้าของ" />
            <textarea name="address" value={storeInfo.address} onChange={handleInputChange} className="border p-2 w-full rounded" placeholder="ที่อยู่" />
            <textarea name="about" value={storeInfo.about} onChange={handleInputChange} className="border p-2 w-full rounded h-24" placeholder="เกี่ยวกับร้าน" />

            {/* บริการ */}
            <h3 className="font-semibold mt-4">บริการ:</h3>
            {storeInfo.services.map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <span>{s}</span>
                <button onClick={() => deleteService(i)} className="text-red-500">ลบ</button>
              </div>
            ))}
            <div className="flex gap-2 mb-2">
              <input value={newService} onChange={(e) => setNewService(e.target.value)} className="border p-2 rounded w-full" placeholder="เพิ่มบริการ" />
              <button onClick={addService} className="border px-3 rounded text-green-600 border-green-500">เพิ่ม</button>
            </div>

            {/* รถ */}
            <h3 className="font-semibold mt-4">ยานพาหนะ:</h3>
            {storeInfo.cars.map((car, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <span>{car.model} - {car.plate}</span>
                <button onClick={() => deleteCar(i)} className="text-red-500">ลบ</button>
              </div>
            ))}
            <div className="flex gap-2 mb-2">
              <input value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} className="border p-2 rounded w-1/2" placeholder="รุ่นรถ" />
              <input value={newCar.plate} onChange={(e) => setNewCar({ ...newCar, plate: e.target.value })} className="border p-2 rounded w-1/2" placeholder="ทะเบียน" />
            </div>
            <button onClick={addCar} className="border px-4 py-1 rounded text-green-600 border-green-500 mb-4">เพิ่มข้อมูล</button>

            {/* รูปภาพหลายรูป */}
            <div>
              <label className="block mb-1">รูปภาพร้าน:</label>
              <input type="file" accept="image/*" multiple onChange={handleMultipleImagesChange} />
              <div className="grid grid-cols-2 gap-2 mt-2">
                {storeInfo.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt={`ร้าน-${idx}`} className="w-full h-32 object-cover rounded shadow" />
                    <button
                      onClick={() => deleteImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white px-2 text-xs rounded-full"
                    >ลบ</button>
                  </div>
                ))}
              </div>
            </div>

            {/* QR */}
            <div>
              <label className="block mt-4 mb-1">QR Code PromptPay:</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "promptpay")} />
              {storeInfo.promptpay && <img src={storeInfo.promptpay} alt="QR Code" className="mt-2 rounded shadow w-full" />}
            </div>
          </>
        ) : (
          <>
            <p>เบอร์: {storeInfo.phone}</p>
            <p>เจ้าของ: {storeInfo.owner}</p>
            <p>ที่อยู่: {storeInfo.address}</p>
            <p>เกี่ยวกับ: {storeInfo.about}</p>

            <h3 className="font-semibold mt-4">บริการ:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {storeInfo.services.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4">ยานพาหนะ:</h3>
            {storeInfo.cars.map((car, i) => (
              <div key={i} className="flex justify-between border rounded px-3 py-2 bg-gray-100 my-1">
                <span>{car.model}</span>
                <span>{car.plate}</span>
              </div>
            ))}

            <h3 className="font-semibold mt-4">รูปภาพร้าน:</h3>
            <div className="grid grid-cols-2 gap-2">
              {storeInfo.images.map((img, i) => (
                <img key={i} src={img} alt={`ร้าน-${i}`} className="rounded shadow w-full h-32 object-cover" />
              ))}
            </div>

            <h3 className="font-semibold mt-4">โอนเงินชำระ:</h3>
            {storeInfo.promptpay && <img src={storeInfo.promptpay} alt="PromptPay QR" className="w-full rounded shadow" />}
          </>
        )}
      </div>
    </div>
  );
}

export default StoreAccount;
