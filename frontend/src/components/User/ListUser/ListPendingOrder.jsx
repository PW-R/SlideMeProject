import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ListPendingOrder() {
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "กำลังมองหารถ",
      tab: "pending",
    },
    {
      id: 2,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "ได้รถแล้ว",
      tab: "pending",
    },
    {
      id: 3,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "รอชำระเงิน",
      tab: "pending",
    },
    {
      id: 4,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "กำลังดำเนินการ",
      tab: "pending",
    },
    {
      id: 5,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "งานเสร็จสิ้น",
      tab: "history",
    },
    {
      id: 6,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "งานเสร็จสิ้น",
      tab: "history",
    },
    {
      id: 7,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "งานเสร็จสิ้น",
      tab: "history",
    },
    {
      id: 8,
      shop: "ร้านบัวบางแคร์",
      date: "01/11/2567",
      price: 2130,
      status: "งานเสร็จสิ้น",
      tab: "pending",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "pending") return order.tab === "pending";
    if (activeTab === "history") return order.tab === "history";
    return false;
  });

  const handleOrderClick = (orderId, status) => {
    if (status === "งานเสร็จสิ้น" && activeTab === "history") {
      // Navigate to "pending" tab when clicking "งานเสร็จสิ้น" in "history" tab
      setActiveTab("pending");
    } else if (status === "งานเสร็จสิ้น" && activeTab === "pending") {
      navigate("/Review"); // Navigate to Review page if clicked in "pending" tab
    }
  };

  return (
    <div className="p-4 overflow-hidden">
      {/* Header */}
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-xl font-bold">รายการ</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-between mt-6 mb-4 items-center">
        <div className="flex w-full">
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "pending" ? "text-blue-600 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            กำลังดำเนินการ
          </button>
          <button
            className={`w-1/2 py-2 text-center ${
              activeTab === "history" ? "text-blue-600 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            ประวัติ
          </button>
        </div>
      </div>

      {/* Order List */}
      <ul className="space-y-3">
        {filteredOrders.map((order) => (
          <li
            key={order.id}
            className="w-full bg-white p-4 rounded-xl shadow flex items-center justify-between hover:bg-gray-50 transition cursor-pointer"
            onClick={() => handleOrderClick(order.id, order.status)} // Order click action
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              <FaCar className="text-2xl text-gray-600" />
              <div>
                <div className="font-medium">{order.shop}</div>
                <div className="text-sm text-gray-500">{order.date}</div>
                <div className="text-sm text-gray-800">{order.price} ฿</div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-1">
              {activeTab === "history" ? null : (
                <div className="text-blue-600 text-sm">{order.status}</div>
              )}
              {activeTab === "history" && order.status === "งานเสร็จสิ้น" && (
                <button className="text-sm text-blue-500 hover:underline">
                  จองอีกครั้ง
                </button>
              )}
            </div>
          </li>
        ))}
        {filteredOrders.length === 0 && (
          <li className="text-gray-500 text-center">ไม่มีข้อมูล</li>
        )}
      </ul>
    </div>
  );
}

export default ListPendingOrder;