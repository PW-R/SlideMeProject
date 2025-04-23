const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

// Helper function to recursively find all controller files in the backend API folders
const getFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir); // Read directory contents
  list.forEach((file) => {
    file = path.join(dir, file); // Get the full file path
    const stat = fs.statSync(file); // Get file stats
    if (stat && stat.isDirectory()) {
      // Recurse into subdirectories (API folders like registerUser, loginUser)
      results = results.concat(getFiles(file));
    } else if (file.endsWith(".controller.js")) {
      // Add controller file if it ends with `.controller.js`
      results.push(file);
    }
  });
  return results;
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SlideMe API",
      version: "1.0.0",
      description: `
        SlideMe API เป็น API ที่ให้บริการสำหรับแอปพลิเคชัน SlideMe ซึ่งเป็นแอปที่ให้บริการขอใช้รถยนต์
        โดยผู้ใช้สามารถตั้งค่าตำแหน่งและโพสต์คำขอ จากนั้นคนขับสามารถเห็นคำขอและเสนอมูลค่าราคาที่ต้องการ
        เมื่อผู้ใช้ยอมรับราคานั้น ผู้ใช้สามารถดำเนินการชำระเงินและจ่ายค่าบริการให้กับคนขับ หลังจากนั้นคนขับจะทำภารกิจให้เสร็จ
        และยืนยันในแอปว่าเสร็จสมบูรณ์ เมื่อภารกิจเสร็จสิ้น ผู้ใช้สามารถให้คะแนนและรีวิวประสบการณ์กับคนขับได้

        ฟีเจอร์ของ API ได้แก่:
        - การลงทะเบียนและการเข้าสู่ระบบของผู้ใช้
        - การสร้างและการจัดการคำขอการเดินทาง
        - การเสนอราคาโดยคนขับและการเสร็จสิ้นภารกิจ
        - การประมวลผลการชำระเงิน
        - ระบบรีวิวให้ผู้ใช้สามารถให้คะแนนและประเมินประสบการณ์กับคนขับ

        ผู้พัฒนา:
        - วาศิยาธร กางกั้น (66079501)
        - กัลยรัตน์ ถิ่นหาญวงศ์ (66050217)
        - เบญจวรรณ พูลทรัพย์ (66066266)
        - ปวเรศ เรืองทอง (66094460)
        - สิรินทรา อัคคเมธี (66073734)
      `,
    },
  },
  // Fetch the controller files from the backend folder
  apis: getFiles(path.join(__dirname)),
};



const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
