function IncomingOrderInfo() {
  return (
    <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">รายละเอียดงาน</h1>
      </div>

      <div className="flex flex-col items-center mt-4 ">
        <div className=" mt-4 font-bold bg-[#62EF8A] w-[300px] h-auto !rounded-[10px] p-3 leading-none ">
          <p>#56665789-897</p>
          <p>คุณพร บ่าวแม็ค</p>
          <p>ประเภทการเรียก: เรียกทันที</p>
        </div>

        <div className="bg-[#62EF8A] w-[300px] h-auto !rounded-[10px] p-3 leading-none mt-4">
          <p>ตำแหน่งต้นทาง: 400/20 ถ.แสร้งว่ามีมิตรภาพ ท่าแร้ง</p>
          <p>ตำแหน่งปลายทาง: 191/33 ถ.กำลังบำรุง เจริญกรุง 12</p>
          <p>ประเภทรถ: รถสไลด์ 6 ล้อ</p>
          <p>ยี่ห้อ: Honda</p>
          <p>ประเภทรถ: SUV</p>
          <p>เลขทะเบียนรถ: กก-5578</p>
          <p>ปีรถ : 2045</p>
          <p>
            หมายเหตุ : รถยางแตกบนทางด่วนรั่วจนแบนขับต่อไม่ได้
            หม้อระเบิดเกิดเป็นน้ำมันดิบ
            อยากให้มาถึงภายใน10นาทีเนื่องจากต้องไปทำงานคะต้องการให้นำรถเข้าอู่เลย
          </p>
          <p>วันที่บริการ : วันจันทร์ 21 กันยายน 2569</p>
          <p>เวลา 12.50</p>
          <p>งบประมาณ : 3,000 บาท</p>
        </div>
        <div className="flex m-4 ">
        <button type="button" className="btn btn-success">รับงาน</button>
        <button type="button" className="btn btn-danger">ปฏิเสธงาน</button>
        </div>
      </div>
    </div>
  );
}

export default IncomingOrderInfo;
