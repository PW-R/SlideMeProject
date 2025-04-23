import { useState } from "react";
import { Link } from "react-router-dom";

function RoleEmployee() {
  const roles = ["ผู้จัดการ", "คนขับ"];

  const [employees, setEmployees] = useState([
    { name: "จันทร์เอก กระจ่าง", role: "ผู้จัดการ" },
    { name: "เอก เสนาราไป", role: "ผู้จัดการ" },
    { name: "คต ตำรา", role: "คนขับ" },
    { name: "หมาย เหตุ", role: "คนขับ" },
    { name: "ขุมพล ธานทอง", role: "คนขับ" },
  ]);

  const handleRoleChange = (index, newRole) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].role = newRole;
    setEmployees(updatedEmployees);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/DriverAccount">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ระบบพนักงาน</h1>
      </div>

      {/* Content */}
      <div className="pt-[130px] px-4">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <span className="text-[16px]">{emp.name}</span>

            <select
              value={emp.role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              className="border !border-[#0dc964]  rounded-full px-3 py-1 text-sm focus:outline-none "
            >
              {roles.map((role, idx) => (
                <option key={idx} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <button className="bg-[#0dc964] text-white px-4 py-1 !rounded-[10px] text-sm ml-2">
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleEmployee;
