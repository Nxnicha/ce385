// ส่วนที่ 1 — สร้างข้อมูลตั้งต้น array ของนักศึกษาอย่างน้อย 4 คน
const students = [
  { id: "65001", name: "สมชาย ใจดี", major: "Computer Science", score: 85 },
  { id: "65002", name: "สมหญิง รักเรียน", major: "Information Technology", score: 92 },
  { id: "65003", name: "มานะ อดทน", major: "Software Engineering", score: 78 },
  { id: "65004", name: "ปิติ ยินดี", major: "Data Science", score: 88 }
];

// ส่วนที่ 2 — เขียน fetchStudentById(id, callback) ตามธรรมเนียม error-first
function fetchStudentById(id, callback) {
  // เงื่อนไข: id ไม่ใช่ string หรือว่าง
  if (typeof id !== 'string' || id.trim() === '') {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  // ค้นหานักศึกษาในฐานข้อมูลจำลอง
  const student = students.find(s => s.id === id);

  // เงื่อนไข: ค้นแล้วไม่พบ
  if (!student) {
    return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
  }

  // เงื่อนไข: พบ (จำลองความล่าช้า 300ms แล้วคืนค่าเป็นสำเนา)
  setTimeout(() => {
    callback(null, { ...student }); // คืนสำเนาเสมอ (ใช้ spread operator)
  }, 300);
}

// ส่วนที่ 3 — เรียกใช้ครบ 3 กรณี แล้วพิมพ์ผลทุกกรณี (ต้องตรวจ error ก่อนแตะผลลัพธ์เสมอ)

console.log("--- เริ่มการทดสอบระบบตรวจทะเบียน ---");

// ก) id ที่มีจริง
fetchStudentById("65002", (error, student) => {
  if (error) {
    console.log("กรณี ก (มีจริง) เกิดข้อผิดพลาด:", error.message);
  } else {
    console.log("กรณี ก (มีจริง) สำเร็จ: พบข้อมูลนักศึกษาชื่อ", student.name);
  }
});

// ข) id ที่ไม่มี
fetchStudentById("99999", (error, student) => {
  if (error) {
    console.log("กรณี ข (ไม่มีจริง) เกิดข้อผิดพลาด:", error.message);
  } else {
    console.log("กรณี ข (ไม่มีจริง) สำเร็จ:", student.name);
  }
});

// ค) id ผิดรูปแบบ (เช่น 42)
fetchStudentById(42, (error, student) => {
  if (error) {
    console.log("กรณี ค (ผิดรูปแบบ) เกิดข้อผิดพลาด:", error.message);
  } else {
    console.log("กรณี ค (ผิดรูปแบบ) สำเร็จ:", student.name);
  }
});

// ส่วนที่ 4 — ตอบคำถามท้ายไฟล์
/*
คำถามที่ 1: ถ้าลืมตรวจ error แล้วอ่าน .name ทันที จะเกิดอะไร ใครเห็น error นั้น
คำตอบ: หากมีข้อผิดพลาดเกิดขึ้น (เช่น id ไม่ถูกต้อง หรือหาไม่พบ) ตัวแปร student ใน callback จะไม่มีการส่งค่ามา (เป็น undefined)
ถ้าเราไม่อ่านเช็ค error ก่อน แล้วไปเรียกใช้ student.name ทันที โปรแกรมจะพัง (Crash) และเกิด Runtime Error 
ที่ชื่อว่า TypeError: Cannot read properties of undefined (reading 'name')
คนที่เห็น error นี้คือ Developer (ผ่านหน้า Console/Terminal) หรือถ้าเป็นระบบจริงคือเซิร์ฟเวอร์อาจจะล่มจน User ใช้งานไม่ได้เลย

คำถามที่ 2: ทำไมต้อง return หลังเรียก callback(error)
คำตอบ: การใส่ return จะเป็นการสั่งให้ฟังก์ชัน fetchStudentById หยุดการทำงานในบรรทัดนั้นทันที 
เพื่อป้องกันไม่ให้โปรแกรมทำงานทะลุลงไปรันโค้ดบรรทัดด้านล่างต่อ (เช่น ไปค้นหาต่อ หรือไปเรียก setTimeout)
ซึ่งอาจทำให้เกิดบั๊กการเรียก callback ซ้ำซ้อนหลายรอบได้
*/