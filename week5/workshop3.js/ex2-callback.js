// ข้อมูลตั้งต้น (คัดลอกจากข้อ 1 ตามเงื่อนไข)
const students = [
  { id: "65001", name: "สมชาย ใจดี", major: "Computer Science", score: 85 },
  { id: "65002", name: "สมหญิง รักเรียน", major: "Information Technology", score: 92 },
  { id: "65003", name: "มานะ อดทน", major: "Software Engineering", score: 78 },
  { id: "65004", name: "ปิติ ยินดี", major: "Data Science", score: 88 }
];

// ส่วนที่ 1 — เขียน fetchStudentByIdAsync(id) ที่คืน Promise (ห้ามใช้ async, หน่วง 300ms)
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    // ตรวจสอบรหัสผิดรูปแบบ
    if (typeof id !== 'string' || id.trim() === '') {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    // ค้นหานักศึกษา
    const student = students.find(s => s.id === id);

    // ตรวจสอบกรณีไม่พบ
    if (!student) {
      return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    // เมื่อพบ คืนค่าเป็นสำเนา object ผ่าน resolve หลัง 300ms
    setTimeout(() => {
      resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 2 — เรียกใช้ครบ 3 กรณีด้วย .then / .catch / .finally

console.log("=== ส่วนที่ 2: ทดสอบเรียกใช้ 3 กรณี ===");

// ก) id ที่มีจริง
fetchStudentByIdAsync("65001")
  .then(student => console.log("กรณี ก (มีจริง): พบข้อมูล", student.name))
  .catch(err => console.error("กรณี ก ข้อผิดพลาด:", err.message))
  .finally(() => console.log("กรณี ก: ทำงานเสร็จสิ้น (finally)"));

// ข) id ที่ไม่มี
fetchStudentByIdAsync("99999")
  .then(student => console.log("กรณี ข (ไม่มีจริง): พบข้อมูล", student.name))
  .catch(err => console.error("กรณี ข ข้อผิดพลาด:", err.message))
  .finally(() => console.log("กรณี ข: ทำงานเสร็จสิ้น (finally)"));

// ค) id ผิดรูปแบบ (เช่น 42)
fetchStudentByIdAsync(42)
  .then(student => console.log("กรณี ค (ผิดรูปแบบ): พบข้อมูล", student.name))
  .catch(err => console.error("กรณี ค ข้อผิดพลาด:", err.message))
  .finally(() => console.log("กรณี ค: ทำงานเสร็จสิ้น (finally)"));


// ส่วนที่ 3 — เขียน "โซ่" 3 ขั้น (Promise Chain) ทุกขั้นต้อง return ส่งต่อ

function calculateGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

setTimeout(() => {
  console.log("\n=== ส่วนที่ 3: ทดสอบ Promise Chain 3 ขั้น ===");
  
  fetchStudentByIdAsync("65001")
    .then(student => {
      // ขั้น 1: แปลงเป็น { name, grade }
      const grade = calculateGrade(student.score);
      return { name: student.name, grade: grade };
    })
    .then(data => {
      // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
      return `นักศึกษาชื่อ ${data.name} สอบได้เกรด ${data.grade}`;
    })
    .then(reportText => {
      // ขั้น 3: พิมพ์ออกทาง console
      console.log(reportText);
      return reportText;
    })
    .catch(err => console.error("Chain Error:", err.message));
}, 1000);


// ส่วนที่ 4 (โบนัส +0.5) — เขียน promisify(fn) อเนกประสงค์

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}

// ตัวอย่างฟังก์ชันอื่นแบบ error-first callback สำหรับทดสอบ promisify
function sampleAsyncDivide(a, b, callback) {
  setTimeout(() => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return callback(new Error("พารามิเตอร์ต้องเป็นตัวเลข"));
    }
    if (b === 0) {
      return callback(new Error("ไม่สามารถหารด้วย 0 ได้"));
    }
    callback(null, a / b);
  }, 200);
}

// ทดสอบแปลงฟังก์ชันด้วย promisify
setTimeout(() => {
  console.log("\n=== ส่วนที่ 4: ทดสอบ promisify(fn) ===");
  const divideAsync = promisify(sampleAsyncDivide);

  divideAsync(10, 2)
    .then(res => console.log("ผลการหาร 10 / 2 =", res))
    .catch(err => console.error("Promisify Error:", err.message));

  divideAsync(10, 0)
    .then(res => console.log("ผลการหาร 10 / 0 =", res))
    .catch(err => console.error("Promisify Error:", err.message));
}, 2000);