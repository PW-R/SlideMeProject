import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OrderHistoryList() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/order-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;


  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      <div className="w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000] relative">
        <i
          onClick={() => navigate("/ListDriver")}
          className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4 cursor-pointer"
        ></i>
        <div className="text-white text-center">
          <h1 className="text-lg font-bold">Order History</h1>
        </div>
      </div>

      {orderHistory.map((order) => (
        <div
          key={order.ID}
          onClick={() => navigate(`/OrderhistoryDetail/${order.ID}`, { state: { order } })}
          className="flex mt-4 ml-4 font-bold w-full cursor-pointer"
        >
          <div className="icon">
            <img src="/car_icon.svg" alt="car" />
          </div>
          <div className="ml-4 mt-auto w-full">
            <p>{order.Start_Location}</p>
            <p>#{order.ID}</p>
            <i className="bi bi-cash-coin"> {order.Total_Price} ฿</i>
            <p>{new Date(order.Order_Date_time).toLocaleString("th-TH")}</p>
            <hr className="w-[150px] border-t-2 border-[#13703E] mr-0" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryList;
