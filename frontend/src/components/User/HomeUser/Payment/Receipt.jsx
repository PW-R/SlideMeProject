import React, { useState, useEffect } from "react";

function Receipt() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, timerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0dc964] flex flex-col items-center py-10">
      {/* Header */}
      <div >
        <h1 className="text-white text-center text-xl font-semibold">
          QR Payment
        </h1>
      </div>

      {/* Content wrapped in white rounded box */}
      <div className="bg-white rounded-3xl p-8 mt-8 w-11/12 max-w-md shadow-lg">
        <div className="text-center text-lg font-medium">
          <p>Payment Time Left: {formatTime(timeLeft)}</p>
        </div>
        <div className="mt-4">
          <img
            src="qr-code-placeholder.png" // Replace with the actual QR code image source
            alt="QR Code"
            className="w-40 h-40 mx-auto"
          />
        </div>
        <div className="mt-4 text-center text-[#0dc964]">
          <p>กรุณาสแกน QR Code ด้วยแอปพลิเคชัน Mobile Banking ของคุณ</p>
        </div>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="bg-[#0dc964] text-white px-6 py-2 rounded-xl">
            บันทึกรูป
          </button>
          <button className="bg-[#0dc964] text-white px-6 py-2 rounded-xl">
            กลับไปหน้าแรก
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
