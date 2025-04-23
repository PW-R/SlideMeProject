import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RequestJoin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/join-store/requests", {
          credentials: "include", // ✅ ใช้ session cookie
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("❌ API ไม่สำเร็จ:", res.status, errText);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("📦 ข้อมูลที่ได้จาก backend:", data);
        setRequests(data);
      } catch (err) {
        console.error("❌ ดึงข้อมูลไม่สำเร็จ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (driverId) => {
    try {
      const res = await fetch("/api/join-store/approve", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // ✅ ต้องใส่เวลาส่ง JSON
        },
        body: JSON.stringify({ driverId, approved: true }),
      });

      if (res.ok) {
        alert("✅ อนุมัติคำขอสำเร็จ");
        setRequests((prev) => prev.filter((r) => r.Driver_ID !== driverId));
      } else {
        alert("❌ อนุมัติไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (driverId) => {
    try {
      const res = await fetch("/api/join-store/approve", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverId, approved: false }),
      });

      if (res.ok) {
        alert("❌ ปฏิเสธคำขอแล้ว");
        setRequests((prev) => prev.filter((r) => r.Driver_ID !== driverId));
      } else {
        alert("⚠️ ปฏิเสธไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
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

      <div className="pt-[130px] px-4">
        {loading ? (
          <p className="text-center text-gray-500">⏳ กำลังโหลดคำขอ...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีคำขอสมัครเข้าร้าน</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.Driver_ID}
              className="flex items-center justify-between border-b py-2"
            >
              <span className="text-[16px]">{req.Driver_Name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(req.Driver_ID)}
                  className="bg-[#69DB7C] text-white px-4 py-1 !rounded-[10px] text-sm"
                >
                  อนุมัติ
                </button>
                <button
                  onClick={() => handleReject(req.Driver_ID)}
                  className="bg-[#D74F4F] text-white px-4 py-1 !rounded-[10px] text-sm"
                >
                  ปฏิเสธ
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RequestJoin;
