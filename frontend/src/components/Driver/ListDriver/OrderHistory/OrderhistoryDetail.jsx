import { useLocation } from "react-router-dom";

function OrderhistoryDetail() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <div className="p-4 text-center">ไม่พบข้อมูล Order</div>;
  }

  return (
    <div className="OrderhistoryDetail">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">ประวัติการทำงาน</h1>
      </div>

      <div className="flex flex-col items-center mt-4 px-4">
        <h3 className="text-xl font-semibold">Order status</h3>
        <h5 className="text-lg font-medium text-gray-600">#{order.ID}</h5>
        <img src="./check-icon.svg" className="m-4 w-12 h-12" alt="check icon" />

        <div className="w-[300px] border-2 border-[#A09D9D] rounded-[15px] p-4 mt-4">
          <p>ค่าบริการ: {order.Total_Price} บาท</p>
          <p>ส่วนลด: {order.Discount} บาท</p>
          <p>ค่าอุปกรณ์: {order.Equipment} บาท</p>
          <p>รวมทั้งหมด: {order.Total_Price - order.Discount + order.Equipment} บาท</p>
        </div>

        <div className="w-[350px] border-2 border-[#A09D9D] rounded-[15px] p-4 mt-4">
          <p>ตำแหน่งต้นทาง: {order.Start_Location}</p>
          <p>ตำแหน่งปลายทาง: {order.End_location}</p>
          <p>ยี่ห้อ: {order.Car_Brand}</p>
          <p>ประเภทรถ: {order.UserCar_type}</p>
          <p>ทะเบียน: {order.License_Plate}</p>
          <p>หมายเหตุ: {order.Note}</p>
          <p>
            วันที่บริการ:{" "}
            {new Date(order.Order_Date_time).toLocaleString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>งบประมาณ: {order.Order_Budget} บาท</p>
        </div>
      </div>
    </div>
  );
}

export default OrderhistoryDetail;
