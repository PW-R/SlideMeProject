import { Link } from "react-router-dom";
import { useState } from "react";

function OrderConfirmation() {
  const [orderInfo, setOrderInfo] = useState({
    customer: "เจนณิรา สุขไปเดอะ",
    startLocation:
      "กรุง ออร์ แอร์ 61 ถ. หลังสวน แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    endLocation:
      "บัวรถโสติเคร์ 67/8 หมู่ที่ 7 ตำบลมหาสวัสดิ์ อำเภอบางกรวย นนทบุรี 11130",
    car: {
      brand: "Honda",
      type: "SUV",
      plate: "กก-5578",
    },
    note: "รถยางแตกบนทางด่วน รั่วจนแนบขันต่อไม่ได้ หม้อระเบิดเกิดเป็นน้ำมันดิบ",
    images: [],
  });

  // อัปโหลดภาพหลายภาพ
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setOrderInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // ลบภาพ
  const deleteImage = (indexToDelete) => {
    setOrderInfo((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToDelete),
    }));
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Header */}
      <div className="fixed top-0 w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-50">
        <Link to="/OrderStatusList">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-xl font-semibold">ให้บริการสำเร็จ</h1>
      </div>

      {/* Main content */}
      <div className="pt-[130px] px-4 space-y-4">
        {/* Customer Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <i className="bi bi-person text-2xl text-white"></i>
          </div>
          <div>
            <div className="text-sm text-gray-500">ลูกค้า</div>
            <div className="font-semibold">{orderInfo.customer}</div>
          </div>
        </div>

        {/* Locations */}
        <div className="text-sm space-y-2">
          <div className="flex items-start space-x-2">
            <div className="text-red-500 mt-1">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <div>{orderInfo.startLocation}</div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="text-green-500 mt-1">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <div>{orderInfo.endLocation}</div>
          </div>
        </div>

        {/* Car Info */}
        <div className="text-sm space-y-1">
          <div>
            <strong>ยี่ห้อ:</strong> {orderInfo.car.brand}
          </div>
          <div>
            <strong>ประเภท:</strong> {orderInfo.car.type}
          </div>
          <div>
            <strong>เลขทะเบียนรถ:</strong> {orderInfo.car.plate}
          </div>
        </div>

        {/* Note */}
        <div className="text-sm">
          <strong>หมายเหตุ:</strong>
          <br />
          {orderInfo.note}
        </div>

        {/* Additional Input */}
        <textarea
          placeholder="ข้อมูลเพิ่มเติม"
          className="w-full h-24 border !border-green-400 rounded-lg p-2 text-sm resize-none"
        ></textarea>

        {/* Image Upload + Preview */}
        <div>
          <label className="block mb-1 text-sm font-medium">เพิ่มรูปภาพ:</label>

          {/* ปุ่มแทน input */}
          <label
            htmlFor="image-upload"
            className="inline-block cursor-pointer text-center border !border-green-400 text-green-600 px-4 py-2 rounded-lg w-full text-sm hover:bg-green-50 transition"
          >
            เพิ่มรูปภาพ
          </label>

          {/* ซ่อน input แล้วใช้ label ด้านบนแทน */}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleImagesChange}
            className="hidden"
          />

          {/* Preview รูปภาพ */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {orderInfo.images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`ภาพ-${idx}`}
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

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <button className="bg-[#0dc964] text-white px-10 py-2 rounded-full shadow font-semibold">
            ส่งงาน
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
