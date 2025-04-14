import React from "react";

function PaymentCompleted() {
  return (
    <div className="flex justify-center items-center py-8 bg-green-500 min-h-screen">
      {/* Main Container with White Background */}
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        {/* Green Check Mark Circle */}
        <div className="bg-green-500 p-3 rounded-full text-white w-16 h-16 flex items-center justify-center mb-6">
          <i className="fas fa-check text-white text-4xl"></i>{" "}
          {/* Larger check mark icon */}
        </div>

        {/* Thank You Message */}
        <p className="text-center font-medium text-lg mb-4">
          ขอบคุณสำหรับการเรียกรถ
        </p>

        {/* Order Status Box */}
        <div className="bg-green-100 border border-gray-300 rounded-lg p-4 mb-6">
          <p className="font-medium text-lg mb-2">Order Status</p>
          <div className="flex justify-between mb-2">
            <span>ทั้งหมด</span>
            <span>2,230</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>ส่วนลด</span>
            <span>100</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>รวมทั้งหมด</span>
            <span>2,130</span>
          </div>
        </div>

        {/* Driver Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {/* Profile Icon Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div>
          <p className="font-medium text-lg mb-2">Driver Name</p>
          <div className="flex space-x-4 text-sm text-gray-600 mb-4">
            <span>5ดาว</span>
            <span>15รอบเที่ยว</span>
            <span>1ปี</span>
          </div>

          {/* Call and Message Icons */}
          <div className="flex space-x-4">
            <button className="p-3 bg-green-500 text-white rounded-full">
              <i className="fas fa-phone-alt"></i>
            </button>
            <button className="p-3 bg-green-500 text-white rounded-full">
              <i className="fas fa-comment"></i>
            </button>
          </div>
        </div>

        {/* Green Action Button */}
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-600 transition">
          ติดตามสถานะ
        </button>
      </div>
    </div>
  );
}

export default PaymentCompleted;
