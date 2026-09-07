// ข้อมูลตั้งต้น (copy จากข้อ 2)
const students = [
  { id: "65001", name: "สมชาย ใจดี", major: "Computer Science", score: 85 },
  { id: "65002", name: "สมหญิง รักเรียน", major: "Information Technology", score: 92 },
  { id: "65003", name: "มานะ อดทน", major: "Software Engineering", score: 78 },
  { id: "65004", name: "ปิติ ยินดี", major: "Data Science", score: 88 }
];

// ฟังก์ชันตัดเกรด
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ฟังก์ชัน Promise จากข้อ 2
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== 'string' || id.trim() === '') {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    const student = students.find(s => s.id === id);

    if (!student) {
      return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    setTimeout(() => {
      resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 1 — reportSequential(): ดึงข้อมูลทีละคนด้วย await ใน for...of
async function reportSequential() {
  console.log("=== ส่วนที่ 1: ดึงข้อมูลทีละคน (Sequential) ===");
  const targetIds = ["65001", "65002", "65003"];
  const startTime = Date.now();
  const results = [];

  for (const id of targetIds) {
    const student = await fetchStudentByIdAsync(id);
    results.push(student);
  }

  const duration = Date.now() - startTime;
  console.log(`ดึงข้อมูล 3 คนเรียบร้อยใช้เวลา: ${duration} ms`);
  return duration;
}

// ส่วนที่ 2 — reportParallel(): ดึง 3 คนพร้อมกันด้วย Promise.all + map
async function reportParallel(seqDuration) {
  console.log("\n=== ส่วนที่ 2: ดึงข้อมูลพร้อมกัน (Parallel) ===");
  const targetIds = ["65001", "65002", "65003"];
  const startTime = Date.now();

  const results = await Promise.all(
    targetIds.map(id => fetchStudentByIdAsync(id))
  );

  const duration = Date.now() - startTime;
  const speedup = (seqDuration / duration).toFixed(2);

  console.log(`ดึงข้อมูล 3 คนพร้อมกันใช้เวลา: ${duration} ms`);
  console.log(`ทำงานเร็วกว่าแบบลำดับ (Sequential) ประมาณ ${speedup} เท่า`);
}

// ส่วนที่ 3 — safeReport(id): ครบ try-catch-finally
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = getGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// ฟังก์ชันหลักควบคุมลำดับการทำงาน (ห้ามใช้ .then)
async function main() {
  // รันส่วนที่ 1
  const seqTime = await reportSequential();

  // รันส่วนที่ 2 ต่อหลังส่วนที่ 1 จบ
  await reportParallel(seqTime);

  // รันส่วนที่ 3
  console.log("\n=== ส่วนที่ 3: ทดสอบ safeReport (try-catch-finally) ===");
  await safeReport("65001"); // พบข้อมูล
  await safeReport("99999"); // ไม่พบข้อมูล
  await safeReport(42);      // id ผิดรูปแบบ
}

main();

/*
===================================================================
ส่วนที่ 4 — ตอบคำถามท้ายไฟล์
===================================================================

คำถามที่ 1: ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
คำตอบ: 
- เมื่อใช้ `await` ตัวสั่งการ async จะหยุดการทำงานในฟังก์ชันชั่วคราวเพื่อรอ Promise หาก Promise ถูก reject ระบบจะแปลงการ reject นั้นให้กลายเป็น exception ที่พ่น (throw) ออกมา ณ บรรทัดนั้นทันที บล็อก `try-catch` จึงจับได้เหมือนโค้ด synchronous ปกติ
- ในทางตรงกันข้าม การเรียก callback ธรรมดาจะถูกโยนไปประมวลผลภายนอก Call Stack หลัก (ผ่าน Event Loop / Web APIs) ในขณะนั้นบล็อก `try-catch` ได้ทำงานผ่านจุดนั้นไปเรียบร้อยแล้ว จึงไม่สามารถรอตรวจจับ error ที่จะเกิดขึ้นใน callback ย้อนหลังได้

คำถามที่ 2: ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ — เกิดอะไรขึ้น เขียนคำอธิบายประกอบ
คำตอบ:
- หากลืมใส่ `await` หน้า `Promise.all(...)` ค่าที่ได้กลับมาจะเป็น object ประเภท `Promise { <pending> }` ไม่ใช่ Array ของข้อมูลนักศึกษาจริง
- การนำผลลัพธ์นี้ไปใช้ต่อทันทีจะทำให้เกิดบั๊ก เช่น การพยายามวนลูปอ่านค่าสมาชิกจะล้มเหลว หรือได้ค่าเป็น `undefined`
- นอกจากนี้ หากฟังก์ชัน asynchronous ด้านในเกิด error/reject จะเกิดการเตือน UnhandledPromiseRejection เนื่องจากไม่มีตัวจับ error ณ เวลาที่มีการรัน
*/