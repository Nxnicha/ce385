// ==========================================
// ค่าคงที่สำหรับเกณฑ์การวัดผล (Constants)
// ==========================================
const MIN_SCORE = 0;
const MAX_SCORE = 100;

const GRADE_RULES = [
  { min: 80, grade: 'A' },
  { min: 75, grade: 'B+' },
  { min: 70, grade: 'B' },
  { min: 65, grade: 'C+' },
  { min: 60, grade: 'C' },
  { min: 55, grade: 'D+' },
  { min: 50, grade: 'D' },
  { min: 0, grade: 'F' }
];

// ==========================================
// ส่วนที่ 1 — ฟังก์ชันคำนวณคะแนน
// ==========================================

// 1. ตรวจสอบความถูกต้องของคะแนน (0 - 100)
const isValidScore = (score) => {
  return typeof score === 'number' && score >= MIN_SCORE && score <= MAX_SCORE;
};

// 2. แปลงคะแนนเป็นเกรด (เรียก isValidScore ตรวจก่อนเสมอ + ใช้ find)
const toGrade = (score) => {
  if (!isValidScore(score)) {
    return 'Invalid Score';
  }
  const rule = GRADE_RULES.find(r => score >= r.min);
  return rule ? rule.grade : 'F';
};

// 3. คำนวณคะแนน Workshop จากคะแนนดิบ (มี Default Parameters)
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
  return (raw / full) * weight;
};

// 4. รวมคะแนน 5 ส่วน
const calculateTotal = (workshop, attendance, project, midterm, final) => {
  return workshop + attendance + project + midterm + final;
};

// ==========================================
// ส่วนที่ 2 — ทดสอบสร้างข้อมูลนักศึกษา 3 คน และแสดงผลตาราง
// ==========================================
const student1Raw = { name: 'Somchai', workshopRaw: 48, attendance: 10, project: 20, midterm: 25, final: 25 };
const student2Raw = { name: 'Somsri', workshopRaw: 30, attendance: 8, project: 15, midterm: 18, final: 12 };
const student3Raw = { name: 'Anan', workshopRaw: 55, attendance: 10, project: 22, midterm: 28, final: 27 };

const processStudent = (student) => {
  const workshopScore = calculateWorkshopScore(student.workshopRaw);
  const totalScore = calculateTotal(workshopScore, student.attendance, student.project, student.midterm, student.final);
  const grade = toGrade(totalScore);

  return {
    Name: student.name,
    Workshop: workshopScore,
    Attendance: student.attendance,
    Project: student.project,
    Midterm: student.midterm,
    Final: student.final,
    Total: totalScore,
    Grade: grade
  };
};

const studentTableData = [
  processStudent(student1Raw),
  processStudent(student2Raw),
  processStudent(student3Raw)
];

console.log('=== ส่วนที่ 2: ตารางสรุปคะแนนนักศึกษา 3 คน ===');
console.table(studentTableData);

// ==========================================
// ส่วนที่ 3 — พิสูจน์การทำงานของ Default Parameters
// ==========================================
console.log('\n=== ส่วนที่ 3: พิสูจน์ค่าเริ่มต้น (Default Parameters) ===');

const resultDefault = calculateWorkshopScore(48);
const resultExplicit = calculateWorkshopScore(48, 60, 20);

console.log(`calculateWorkshopScore(48)         : ${resultDefault}`);
console.log(`calculateWorkshopScore(48, 60, 20) : ${resultExplicit}`);
console.log(`ผลลัพธ์เท่ากันหรือไม่?: ${resultDefault === resultExplicit}`);

// เรียกทดสอบด้วย undefined
const resultWithUndefined = calculateWorkshopScore(48, undefined, 25);
console.log(`calculateWorkshopScore(48, undefined, 25): ${resultWithUndefined}`);

/*
  [คำอธิบายผลลัพธ์ของ calculateWorkshopScore(48, undefined, 25)]
  - เมื่อส่ง undefined ในตำแหน่งพารามิเตอร์ตัวที่ 2 (full) JavaScript จะถือว่าไม่มีการระบุค่า
    ทำให้ดึงค่า Default Parameter (full = 60) มาใช้โดยอัตโนมัติ
  - ส่วนพารามิเตอร์ตัวที่ 3 (weight) ถูกส่งค่า 25 เข้าไปทับค่า Default เดิม (20)
  - ผลลัพธ์จึงคำนวณจาก (48 / 60) * 25 ได้เท่ากับ 20
*/