function OrderhistoryDetail() {
  return (
    <div className="OrderhistoryDetail">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">ประวัติการทำงาน</h1>
      </div>

      <div className="flex flex-col items-center mt-4 px-4">
        <h3 className="text-xl font-semibold">Order status</h3>
        <h5 className="text-lg font-medium text-gray-600">#45567389</h5>
        <img
          src="./check-icon.svg"
          className="m-4 w-12 h-12"
          alt="check icon"
        />

        <div className="w-[300px] h-auto border-2 border-[#A09D9D] rounded-[15px] p-4 mt-4">
          <p>ค่าบริการ</p>
          <p>ส่วนลด</p>
          <p>ค่าอุปกรณ์</p>
          <p>รวมทั้งหมด</p>
        </div>

        <div className="w-[350px] h-auto border-2 border-[#A09D9D] rounded-[15px] p-4 mt-4">
          <p>ตำแหน่งต้นทาง: 400/20 ถ.แสร้งว่ามีมิตรภาพ ท่าแร้ง</p>
          <p>ตำแหน่งปลายทาง: 191/33 ถ.กำลังบำรุง เจริญกรุง 12</p>
          <p>ประเภทรถ: รถสไลด์ 6 ล้อ</p>
          <p>ยี่ห้อ: Honda</p>
          <p>ประเภทรถ: SUV</p>
          <p>เลขทะเบียนรถ: กก-5578</p>
          <p>
            หมายเหตุ: รถยางแตกบนทางด่วนรั่วจนแบนขับต่อไม่ได้
            หม้อระเบิดเกิดเป็นน้ำมันดิบ
          </p>
          <p>วันที่บริการ: วันจันทร์ 21 กันยายน 2569 เวลา 12.50</p>
          <p>งบประมาณ: 3,000บาท</p>
        </div>
      </div>
    </div>
  );
}

export default OrderhistoryDetail;
