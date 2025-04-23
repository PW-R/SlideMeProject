import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Receipt() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [qrPath, setQrPath] = useState(""); // Store image path like /uploads/xxx.png
  const navigate = useNavigate();
  const { orderId } = useParams();

  const BASE_URL = "http://localhost:3000"; // Adjust if deploying

  const handleDownload = async () => {
    try {
      if (!qrPath) return;
  
      const response = await fetch(`${BASE_URL}${qrPath}`);
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
  

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, timerActive]);

  useEffect(() => {
    if (timeLeft === 0 && orderId) {
      const updateOrderStatus = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/order?orderId=${orderId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "expired" }),
            }
          );
          if (!response.ok) throw new Error("Failed to update order status");
          console.log("✅ Order status updated");
        } catch (error) {
          console.error("❌ Error updating order status:", error);
        }
      };

      updateOrderStatus();
    }
  }, [timeLeft, orderId]);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/qr?orderId=${orderId}`);
        const data = await res.json();
        setQrPath(data.qrCode); // ✅ backend ส่ง path มา เช่น /uploads/promptpay_abc.png
      } catch (error) {
        console.error("❌ Error fetching QR Code:", error);
      }
    };

    if (orderId) {
      fetchQRCode();
    }
  }, [orderId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(
      2,
      "0"
    )}`;
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
            src={
              qrPath
                ? `${BASE_URL}${qrPath}`
                : "https://via.placeholder.com/240"
            }
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
