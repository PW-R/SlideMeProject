import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function OrderPayment() {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [price, items]);

  const calculateTotal = () => {
    const basePrice = parseFloat(price) || 0;
    const accessoryTotal = items.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return acc + itemPrice;
    }, 0);
    setTotal(basePrice + accessoryTotal);
  };

  const handleOfferJob = () => {
    navigate("/PendingOrderLocation");
  };
  const handleChangePrice = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddRow = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/IncomingOrderInfo">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-center">รายละเอียดงาน</h1>
      </div>

      <div className="flex items-center m-4">
        <div className="flex flex-col items-start justify-center relative gap-15">
          <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
          <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
          <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10 mt-3"></i>
        </div>

        <div className="flex flex-col gap-4 ">
          <p className="ml-2">
            ทรูท ออร์ แดร์ 61 ถ. หลังสวน แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร
            10330
          </p>
          <p className="ml-2">
            บัวรถสไลด์คาร์แคร์ 67/8 หมูู่ที่ 7 ตำบล มหาสวัสดิ์ อำเภอบางกรวย
            นนทบุรี 11130
          </p>
        </div>
      </div>

      <div className=" mt-4 ml-10 font-bold w-[300px] h-auto border-2 border-[#6FBB84] !rounded-[10px] p-3 leading-none ">
        <p>#56665789-897</p>
        <p>คุณพร บ่าวแม็ค</p>
        <p>ประเภทการเรียก: เรียกทันที</p>
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

      <div className="flex flex-col m-4">
        <label htmlFor="" className="text-lg font-bold mb-4">
          เสนอราคา
        </label>
        <input
          type="number"
          value={price}
          onChange={handleChangePrice}
          placeholder="ระบุราคาที่ต้องการเสนอ"
          className="border-2 border-[#6FBB84] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-500"
        />

        <hr className="my-4" />
        <p className="text-lg font-bold mb-4">ค่าอุปกรณ์เสริม</p>

        {items.map((item, index) => (
          <div
            key={index}
            className="mb-4 border-b border-green-300 pb-4 flex flex-col gap-2"
          >
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChangeItem(index, "name", e.target.value)}
              placeholder="ระบุอุปกรณ์"
              className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleChangeItem(index, "quantity", e.target.value)
                }
                placeholder="จำนวน"
                className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleChangeItem(index, "price", e.target.value)
                }
                placeholder="ราคารวม"
                className="border-2 border-[#6FBB84] rounded-lg px-3 py-2 w-full"
              />
            </div>
            <button
              onClick={() => handleRemoveRow(index)}
              className="mt-2 border border-[#6FBB84] text-green-700 px-4 py-1 rounded-lg font-semibold hover:bg-green-50 w-fit"
            >
              ลบ
            </button>
          </div>
        ))}

        <button
          onClick={handleAddRow}
          className="border border-green-500 text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-green-50"
        >
          เพิ่มแถว
        </button>

        <hr className="my-4" />
        <p className="text-xl font-bold text-green-700">
          ยอดรวมทั้งหมด: {total.toLocaleString()} บาท
        </p>
      </div>

      <button
        type="button"
        className="btn btn-success"
        onClick={handleOfferJob}
      >
        เสนองาน
      </button>
    </div>
  );
}

export default OrderPayment;
