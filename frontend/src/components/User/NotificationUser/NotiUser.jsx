function NotiUser() {
  const notifications = [
    {
      id: 1,
      message: "รถถึงปลายทาง สำเร็จ!",
      time: "5 นาทีที่แล้ว",
    },
    {
      id: 2,
      message: "รถของคุณใกล้ถึง ปลายทาง...",
      time: "10 นาทีที่แล้ว",
    },
    {
      id: 3,
      message: "ได้รถแล้ว",
      time: "15 นาทีที่แล้ว",
    },
    {
      id: 4,
      message: "คุณยังไม่ได้ชำระเงิน",
      time: "20 นาทีที่แล้ว",
    },
    {
      id: 5,
      message: "ใส่ code slideme100 ลดสูงสุด...",
      time: "30 นาทีที่แล้ว",
    },
    {
      id: 6,
      message: "ช่วยรีวิวคำสั่งล่าสุดให้หน่อยครับ!",
      time: "1 ชั่วโมงที่แล้ว",
    },
  ];

  const handleNotificationClick = (id) => {
    console.log("Notification clicked:", id);
  };

  return (
    <div className="driver-noti-container min-h-screen bg-white flex flex-col">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center text-xl font-semibold">Notifications</h1>
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-4 items-center pb-10">
          {notifications.map((noti) => (
            <button
              key={noti.id}
              onClick={() => handleNotificationClick(noti.id)}
              className="w-full max-w-md flex items-start gap-3 rounded-xl p-4 shadow bg-gray-100 transition hover:scale-[1.01] active:scale-[0.98]"
            >
              <img src="./message.svg" alt="icon" className="w-6 h-6 mt-1" />
              <div className="flex flex-col text-left">
                {/* Set notification name (message) to red */}
                <p className="text-sm text-red-500">{noti.message}</p>
                <p className="text-xs text-gray-500 mt-1">{noti.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotiUser;
