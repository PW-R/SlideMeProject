import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function EditDriverAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "สมใจ สมฉินคร",
    phone: "0812345678",
    password: "230514154",
    confirmPassword: "230514154",
    brithday: "2000-01-01",
    profileImage: null,
    licenseImage: null,
  });

  const fileInputRef = useRef(null); // สำหรับ profile image

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    console.log("ข้อมูลที่บันทึก:", formData);
    setIsEditing(false);
  };

  const handleClickProfileUpload = () => {
    fileInputRef.current?.click(); // trigger คลิก input ซ่อน
  };

  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      {/* Header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/DriverAccount">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">โปรไฟล์</h1>
      </div>

      {/* Content */}
      <div className="pt-[130px] px-5 space-y-4">
        {/* รูปโปรไฟล์ */}
        <div className="relative flex flex-col items-center">
          <img
            src={
              formData.profileImage
                ? URL.createObjectURL(formData.profileImage)
                : "/default-profile.png"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border shadow"
          />
          {isEditing && (
            <>
              {/* ไอคอนกล้อง */}
              <button
                onClick={handleClickProfileUpload}
                className="absolute bottom-0 right-[calc(50%-12px)] bg-white p-1 rounded-full shadow-md"
                title="เปลี่ยนรูปโปรไฟล์"
              >
                <i className="bi bi-camera-fill text-[#0dc964] text-lg"></i>
              </button>

              {/* input แบบซ่อน */}
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* ปุ่มแก้ไข/บันทึก */}
        <div className="flex justify-between items-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-600 underline text-sm"
            >
              บันทึก
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 underline text-sm"
            >
              แก้ไขข้อมูล
            </button>
          )}
        </div>
        {isEditing ? (
          <>
            {/* ฟอร์มตอนแก้ไข */}
            <label htmlFor="name">ชื่อผู้ใช้</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
              className="w-full border !border-green-400 px-4 py-2 rounded-xl"
            />

            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="เบอร์โทรศัพท์"
              className="w-full border !border-green-400 px-4 py-2 rounded-xl"
            />

            <label htmlFor="password">รหัสผ่าน</label>
            <input
              id="password"
              type="text"
              inputMode="numeric"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              className="w-full border !border-green-400 px-4 py-2 rounded-xl"
            />

            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              id="confirmPassword"
              type="text"
              inputMode="numeric"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full border !border-green-400 px-4 py-2 rounded-xl"
            />

            {/* ใบขับขี่ */}
            <label className="block mt-4 mb-2 font-medium">
              ใบขับขี่ (แนบภาพ)
            </label>
            <input
              type="file"
              name="licenseImage"
              accept="image/*"
              onChange={handleChange}
              className="mb-2"
            />
            {formData.licenseImage && (
              <img
                src={URL.createObjectURL(formData.licenseImage)}
                alt="ใบขับขี่"
                className="w-full max-w-xs mx-auto rounded shadow"
              />
            )}
          </>
        ) : (
          <>
            {/* แสดงผลแบบ read-only เหมือน input */}
            {/* ชื่อผู้ใช้ */}
            <label className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {formData.name}
            </p>

            {/* เบอร์โทรศัพท์ */}
            <label className="block text-sm font-medium mb-1">
              เบอร์โทรศัพท์
            </label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {formData.phone}
            </p>

            {/* รหัสผ่าน */}
            <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {formData.password}
            </p>
            {/* วันเกิด */}
            <label className="block text-sm font-medium mb-1">วันเกิด</label>
            <p className="w-full border !border-green-400 bg-white text-black px-4 py-2 rounded-xl mb-3">
              {formData.brithday}
            </p>

            {formData.licenseImage && (
              <>
                <h3 className="mt-4 font-semibold">ใบขับขี่ (แนบภาพ)</h3>
                <img
                  src={URL.createObjectURL(formData.licenseImage)}
                  alt="ใบขับขี่"
                  className="w-full max-w-xs mx-auto rounded shadow"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EditDriverAccount;
