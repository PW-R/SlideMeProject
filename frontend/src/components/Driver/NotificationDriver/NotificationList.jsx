function DriverNotificationList() {
    return ( 
        <div className="driver-noti-container">
            
            <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
                <h1 className="text-white text-center">Notifications</h1>
            </div>

            <div className="flex flex-col gap-4 items-center mt-4">
                <div className="flex gap-2">
                <img src="./message.svg"  />
                <p>คุณได้รับงานแล้ว</p>
                <p>25 นาทีที่แล้ว</p>
                </div>
                
            </div>
        </div>
     );
}

export default DriverNotificationList;