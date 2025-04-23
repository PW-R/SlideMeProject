import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Receipt() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [qrPath, setQrPath] = useState(""); // mock path รูป QR
  const navigate = useNavigate();
  const { orderId } = useParams();

  const BASE_URL = "http://localhost:3000"; // ใช้ไว้ต่อ prefix path รูป QR

  // mock function โหลดรูป QR
  useEffect(() => {
    if (orderId) {
      // จำลอง path QR code (ในโปรเจกต์อาจจะใส่ใน public/)
      const fakePath = "/uploads/mock_qr_code.png";
      setQrPath(fakePath);
      console.log("✅ Mock QR code loaded:", fakePath);
    }
  }, [orderId]);

  // mock countdown
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, timerActive]);

  // mock update order status เมื่อหมดเวลา
  useEffect(() => {
    if (timeLeft === 0 && orderId) {
      console.log(`⏰ คำสั่งซื้อ ${orderId} หมดเวลา — MOCK UPDATE STATUS เป็น expired`);
      // mock log แทนการยิง API PUT
    }
  }, [timeLeft, orderId]);

  // mock download image
  const handleDownload = async () => {
    try {
      if (!qrPath) return;
      const imageUrl = `${BASE_URL}${qrPath}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "QR-code_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("ดาวน์โหลดไม่สำเร็จ:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
  };

  return (
    <div className="h-full w-full bg-[#0dc964] flex flex-col items-center py-10 p-2">
      <div>
        <h1 className="text-white text-center text-xl font-semibold mt-4">
          QR Payment
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-8 mt-8 w-11/12 max-w-md shadow-lg">
        <div className="text-center text-lg font-medium">
          <p className="font-semibold text-2xl">
            Payment Time Left <br />
            {formatTime(timeLeft)}
          </p>
        </div>

        <div className="mt-4">
          <img
            src={qrPath ? `${BASE_URL}${qrPath}` : "https://via.placeholder.com/240"}
            alt="QR Code"
            className="w-60 h-60 mx-auto"
          />
        </div>

        <div className="mt-4 text-center text-[#0dc964]">
          <p>กรุณาสแกน QR Code ด้วยแอปพลิเคชัน Mobile Banking ของคุณ</p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleDownload}
            className="bg-[#007bff] text-white px-6 py-2 rounded-xl"
          >
            บันทึกรูป
          </button>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => navigate(`/PaymentCompleted/${orderId}`)}
            className="bg-[#0dc964] text-white px-6 py-2 rounded-xl"
          >
            ชำระเงินเสร็จสิ้น
          </button>
          <button
            onClick={() => navigate("/UserHome")}
            className="bg-[#ff0000] text-white px-6 py-2 rounded-xl"
          >
            กลับไปหน้าแรก
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
