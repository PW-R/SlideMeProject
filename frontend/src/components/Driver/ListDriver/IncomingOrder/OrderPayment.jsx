import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function OrderPayment() {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [total, setTotal] = useState(0);
  const { state } = useLocation();
  const order = state?.order;

  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  useEffect(() => {
    if (order?.Start_Lat && order?.Start_Lng) {
      fetchPlaceName(order.Start_Lat, order.Start_Lng, setStartPlace);
    }
    if (order?.End_Lat && order?.End_Lng) {
      fetchPlaceName(order.End_Lat, order.End_Lng, setEndPlace);
    }
  }, [order]);

  const fetchPlaceName = async (lat, lng, setter) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=17&addressdetails=1`
      );
      const data = await res.json();
      setter(data.display_name);
    } catch (err) {
      console.error("❌ ดึงชื่อสถานที่ล้มเหลว:", err);
      setter(null);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [price, items]);

  const calculateTotal = () => {
    const basePrice = parseFloat(price) || 0;
    const accessoryTotal = items.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + itemPrice * quantity;
    }, 0);
    setTotal(basePrice + accessoryTotal);
  };
  const driverId = sessionStorage.getItem("driverId");
  const generatePayload = () => ({
    orderId: order?.Order_ID,
    basePrice: parseFloat(price),
    totalPrice: total,
    driverId: parseInt(driverId),
    equipment: items.filter((item) => item.name && item.price),
    serviceType: order?.Service_Type,
  });

  const submitOffer = async () => {
    try {
      const payload = generatePayload();

      const offerResponse = await fetch(
        `http://localhost:3000/api/driver-offer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!offerResponse.ok) {
        const error = await offerResponse.json();
        alert(
          "เกิดข้อผิดพลาดในการเสนอราคา: " +
            (error?.error || "ไม่สามารถส่งข้อมูลได้")
        );
        return;
      }

      const updateStatusResponse = await fetch(
        `http://localhost:3000/api/offer-status/update-offer-status/${order?.OrderDetail_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "ตกลง",
            driverId: parseInt(driverId),
          }),
        }
      );

      if (!updateStatusResponse.ok) {
        const error = await updateStatusResponse.json();
        alert(
          "เกิดข้อผิดพลาดในการอัปเดตสถานะ: " +
            (error?.error || "ไม่สามารถอัปเดตสถานะได้")
        );
        return;
      }

      alert("เสนองานและอัปเดตสถานะสำเร็จ");
      navigate("/PendingOrderLocation", {
        state: {
          orderId: order?.Order_ID,
          basePrice: parseFloat(price),
          totalPrice: total,
          equipment: items.filter((item) => item.name && item.price),
          startLat: order?.Start_Lat,
          startLng: order?.Start_Lng,
          endLat: order?.End_Lat,
          endLng: order?.End_Lng,
        },
      });
      console.log("📦 OrderDetail_ID ที่ใช้:", order?.OrderDetail_ID);
    } catch (err) {
      console.error("Error submitting offer:", err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  const handleChangePrice = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddRow = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/IncomingOrderInfo">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-center">รายละเอียดงาน</h1>
      </div>

      <div className="flex items-center m-4">
        <div className="flex flex-col items-start justify-center relative gap-15">
          <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
          <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
          <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10 mt-3"></i>
        </div>

        <div className="flex flex-col gap-4 ml-2 text-sm text-gray-600">
          <p>
            จุดเริ่มต้น:{" "}
            {startPlace || `${order?.Start_Lat}, ${order?.Start_Lng}`}
          </p>
          <p>
            จุดปลายทาง: {endPlace || `${order?.End_Lat}, ${order?.End_Lng}`}
          </p>
        </div>
      </div>

      <div className="mt-4 ml-10 font-bold w-[300px] h-auto border-2 border-[#6FBB84] !rounded-[10px] p-3 leading-none">
        <p>#{order?.Order_ID}</p>
        <p>{order?.Order_UserName}</p>
        <p>ประเภทการเรียก: {order?.Service_Type}</p>
        <p>ประเภทรถ: {order?.DriverCar_type}</p>
        <p>ยี่ห้อ: {order?.Car_Brand}</p>
        <p>ประเภทรถ: {order?.UserCar_type}</p>
        <p>เลขทะเบียนรถ: {order?.License_Plate}</p>
        <p>ปีรถ : {order?.CarYear}</p>
        <p>หมายเหตุ : {order?.Note}</p>
        <p>
          วันที่บริการ :{" "}
          {new Date(order?.Order_Date_time).toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p>
          เวลา:{" "}
          {new Date(order?.Order_Date_time).toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>งบประมาณ : {parseFloat(order?.Order_Budget).toLocaleString()} บาท</p>
      </div>

      <div className="flex flex-col m-4">
        <label htmlFor="" className="text-lg font-bold mb-4">
          เสนอราคา
        </label>
        <input
          type="number"
          value={price}
          onChange={handleChangePrice}
          placeholder="ระบุราคาที่ต้องการเสนอ"
          className="border-2 border-[#6FBB84] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-500"
        />

        <hr className="my-4" />
        <p className="text-lg font-bold mb-4">ค่าอุปกรณ์เสริม</p>

        {items.map((item, index) => (
          <div
            key={index}
            className="mb-4 border-b border-green-300 pb-4 flex flex-col gap-2"
          >
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChangeItem(index, "name", e.target.value)}
              placeholder="ระบุอุปกรณ์"
              className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleChangeItem(index, "quantity", e.target.value)
                }
                placeholder="จำนวน"
                className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleChangeItem(index, "price", e.target.value)
                }
                placeholder="ราคาต่อชิ้น"
                className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
              />
            </div>
            <button
              onClick={() => handleRemoveRow(index)}
              className="mt-2 border border-[#6FBB84] text-green-700 px-4 py-1 rounded-lg font-semibold hover:bg-green-50 w-fit"
            >
              ลบ
            </button>
          </div>
        ))}

        <button
          onClick={handleAddRow}
          className="border border-green-500 text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-green-50"
        >
          เพิ่มแถว
        </button>

        <hr className="my-4" />
        <p className="text-md font-semibold">
          ราคาที่เสนอ: {parseFloat(price || 0).toLocaleString()} บาท
        </p>
        <p className="text-md font-semibold">
          ค่าอุปกรณ์เสริม:{" "}
          {items
            .reduce((acc, item) => {
              const itemPrice = parseFloat(item.price) || 0;
              const quantity = parseInt(item.quantity) || 0;
              return acc + itemPrice * quantity;
            }, 0)
            .toLocaleString()}{" "}
          บาท
        </p>
        <p className="text-xl font-bold text-green-700">
          ยอดรวมทั้งหมด: {total.toLocaleString()} บาท
        </p>
      </div>

      <div className="flex justify-center">
        <button type="button" className="btn btn-success" onClick={submitOffer}>
          เสนองาน
        </button>
      </div>
    </div>
  );
}

export default OrderPayment;
