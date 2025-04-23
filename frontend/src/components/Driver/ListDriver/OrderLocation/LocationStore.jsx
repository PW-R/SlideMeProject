import { Link } from "react-router-dom";

function LocationStore() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="fixed w-full max-w-[387px] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl shadow-[0_0_10px_#969696] z-[3000]">
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-xl font-bold">Location</h1>
      </div>

      {/* Main Content */}
      <div className="pt-[120px] flex flex-col items-center">
        {/* Map */}
        <div className="w-[360px] h-[300px] rounded-xl overflow-hidden shadow-md mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/OpenStreetMap_Map_Example.png"
            alt="map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Store Info */}
        <div className="bg-white rounded-t-3xl shadow-md w-full max-w-[387px] p-4">
          <div className="flex items-start gap-3">
            <i className="bi bi-shop text-2xl text-[#0dc964]"></i>
            <div>
              <h2 className="!text-[20px]">เกี่ยวกับ</h2>
              <p className="text-sm text-gray-600 mt-1">
                Fix & Drive ร้านซ่อมรถยนต์ในเชียงใหม่ บริการซ่อมเครื่องยนต์,
                ระบบไฟฟ้า, เบรก, เปลี่ยนถ่ายน้ำมันเครื่องและดูแลรถยนต์ทุกรุ่น
                โดยช่างมืออาชีพและเทคโนโลยีทันสมัย พร้อมรับประกันความพึงพอใจ
              </p>
              <img
                src="/advert_car1.svg"
                alt="ร้านซ่อมรถ"
                className="w-full rounded-xl mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationStore;
