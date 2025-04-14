import { Link } from "react-router-dom";

function RequestJoin() {
  const requests = [
    { name: "เอก เสนาราไป" },
    { name: "คต ตำรา" },
    { name: "หมาย เหตุ" },
  ];

  const handleApprove = (name) => {
    console.log(`อนุมัติ: ${name}`);
    // ที่นี่สามารถส่ง request ไป backend ได้
  };

  const handleReject = (name) => {
    console.log(`ปฏิเสธ: ${name}`);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/DriverAccount">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white font-bold !text-[30px]">คำขอสมัครพนักงาน</h1>
      </div>

      {/* Content */}
      <div className="pt-[130px] px-4">
        {requests.map((req, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <span className="text-[16px]">{req.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(req.name)}
                className="bg-[#69DB7C] text-white px-4 py-1 !rounded-[10px] text-sm"
              >
                อนุมัติ
              </button>
              <button
                onClick={() => handleReject(req.name)}
                className="bg-[#D74F4F] text-white px-4 py-1 !rounded-[10px] text-sm"
              >
                ปฏิเสธ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestJoin;
