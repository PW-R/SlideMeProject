function IncomingOrder() {
    return ( 

      <div>

        <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">สถานะงาน</h1></div>

        <div className="w-[300px] h-[90px] bg-[#82E179] text-black border-none rounded-[10px] mt-4">
          <h4>OrderId: </h4>
          <h4>Custtomer name: </h4>
        </div>

        <div className="w-[300px] h-[460px] bg-[#82E179] text-black border-none rounded-[10px] mt-4">
          <p>ตำแหน่งต้นทาง: </p>
          <p>ตำแหน่งปลายทาง: </p>
          <p>ประเภทรถที่ต้องการ: </p>
          <p>ยี่ห้อ: </p>
          <p>ประเภท: </p>
          <p>เลขทะเบียนรถ: </p>
          <p>ปีรถ: </p>
          <p>หมายเหตุ: </p>
          <p>วันที่บริการ: </p>
          <p>งบประมาณ: </p>
        </div>
      </div>
      
     );
}

export default IncomingOrder;