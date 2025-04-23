import { FaMapMarkerAlt } from 'react-icons/fa';  // Updated to GPS pin icon

function PresetPosition() {
  const locations = [
    {
      name: 'อู่แก้วดินแดง',
      address: '213 ซ. จตุรทิศ 2 แยก 7 แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400',
    },
    {
      name: 'สถานีรถไฟฟ้าอ่อนนุช',
      address: '88/3 ซ.อ่อนนุช 30 ถนนสุขุมวิท 10350',
    },
    {
      name: 'ห้างสรรพสินค้าเซ็นทรัลลาดพร้าว',
      address: '1691 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900',
    },
  ];

  const handleClick = (location) => {
    alert(`You selected: ${location.name}`);
  };

  return (
    <div className="bg-white">
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">ตำแหน่งที่สร้างไว้</h1>
      </div>

      {/* Box without outer border but with no gray background outside the button */}
      <div className="p-4 mb-4">
        {locations.map((location, index) => (
          <div key={index} className="mb-4">
            <button 
              onClick={() => handleClick(location)} 
              className="w-full text-left flex items-center space-x-2 p-4 bg-gray-200 hover:bg-gray-300 rounded-xl shadow-md border border-black">
              <FaMapMarkerAlt className="text-gray-600 text-2xl" /> {/* Increased size of pin icon */}
              <div>
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PresetPosition;
