import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const reverseGeocodeNominatim = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data.display_name;
    return address;
  } catch (error) {
    console.error("Nominatim error:", error);
    return null;
  }
};

function OrderConfirmation() {
  const navigate = useNavigate();
  const [completeDetail, setCompleteDetail] = useState("");
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // ใช้สำหรับเก็บข้อความแสดงข้อผิดพลาด
  const orderId = 1;
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  // อัปโหลดภาพหลายภาพ
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

  // ลบภาพ
  const deleteImage = (indexToDelete) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToDelete));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleSubmit = async () => {
    if (!completeDetail) {
      setError("กรุณากรอกข้อมูลเพิ่มเติม");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("กรุณาอัปโหลดรูปภาพ");
      return;
    }

    setLoading(true);
    setError(null); // ล้างข้อความข้อผิดพลาดก่อนการส่งคำขอใหม่
    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("completeDetail", completeDetail);
    if (selectedFiles[0]) {
      formData.append("completePhoto", selectedFiles[0]);
    }

    try {
      await axios.post(`http://localhost:3000/complete-order/${orderId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/OrderStatusList");
    } catch (err) {
      console.error("Error submitting complete order:", err);
      setError("เกิดข้อผิดพลาดในการส่งคำขอ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/OrderDetail/${orderId}`);
        setOrderInfo(res.data);
      } catch (err) {
        console.error("Error loading order detail:", err);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  useEffect(() => {
    let isMounted = true;

    if (orderInfo && orderInfo.Start_Lat && orderInfo.Start_Lng && orderInfo.End_Lat && orderInfo.End_Lng) {
      const fetchLocations = async () => {
        const startAddress = await reverseGeocodeNominatim(orderInfo.Start_Lat, orderInfo.Start_Lng);
        const endAddress = await reverseGeocodeNominatim(orderInfo.End_Lat, orderInfo.End_Lng);

        if (isMounted) {
          setStartLocation(startAddress);
          setEndLocation(endAddress);
        }
      };

      fetchLocations();
    }

    return () => {
      isMounted = false;
    };
  }, [orderInfo]);

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
        {loading ? (
          <div className="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
        ) : orderInfo ? (
          <>
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
                <div>{startLocation}</div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-green-500 mt-1">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>{endLocation}</div>
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
          </>
        ) : (
          <div className="text-center text-gray-500">ไม่พบข้อมูลออเดอร์</div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Additional Input */}
        <textarea
          placeholder="ข้อมูลเพิ่มเติม"
          className="w-full h-24 border !border-green-400 rounded-lg p-2 text-sm resize-none"
          value={completeDetail}
          onChange={(e) => setCompleteDetail(e.target.value)}
        />

        {/* Image Upload + Preview */}
        <div>
          <label className="block mb-1 text-sm font-medium">เพิ่มรูปภาพ:</label>
          <label
            htmlFor="image-upload"
            className="inline-block cursor-pointer text-center border !border-green-400 text-green-600 px-4 py-2 rounded-lg w-full text-sm hover:bg-green-50 transition"
          >
            เพิ่มรูปภาพ
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleMultipleImagesChange}
            className="hidden"
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            {images.map((img, idx) => (
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
          <button
            onClick={handleSubmit}
            className="bg-[#0dc964] text-white px-10 py-2 rounded-full shadow font-semibold"
          >
            {loading ? "กำลังส่งข้อมูล..." : "ส่งงาน"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
