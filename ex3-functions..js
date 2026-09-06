// ข้อมูลตัวอย่างนักศึกษา
const mockStudents = [
  { id: 1, name: 'Somchai', dept: 'CE', score: 85, grade: 'A' },
  { id: 2, name: 'Somsri', dept: 'CE', score: 45, grade: 'F' },
  { id: 3, name: 'Anan', dept: 'EE', score: 72, grade: 'B' },
  { id: 4, name: 'Kanda', dept: 'CE', score: 68, grade: 'C' },
  { id: 5, name: 'Boonmee', dept: 'ME', score: 30, grade: 'F' }
];


// ส่วนที่ 1 — ฟังก์ชันประมวลผลข้อมูล


// 1. ดึง array ของชื่อทุกคน
const getNames = (students) => {
  return students.map(student => student.name);
};

// 2. ดึง array ของคนที่คะแนน >= 50
const getPassedStudents = (students) => {
  return students.filter(student => student.score >= 50);
};

// 3. ผลรวมคะแนนทั้งหมด
const getTotalScore = (students) => {
  return students.reduce((sum, student) => sum + student.score, 0);
};

// 4. คะแนนเฉลี่ย (ทศนิยม 2 ตำแหน่ง) - กรณี array ว่างคืน 0
const getAverageScore = (students) => {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, student) => sum + student.score, 0);
  return Number((total / students.length).toFixed(2));
};

// 5. นับจำนวนแยกตามเกรด
const countByGrade = (students) => {
  return students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});
};

// 6. นักศึกษาที่คะแนนสูงสุด
const getTopStudent = (students) => {
  return students.reduce((top, student) => {
    return (!top || student.score > top.score) ? student : top;
  }, null);
};


// ส่วนที่ 2 — ท่อข้อมูลต่อกัน (Method Chaining บรรทัดเดียว)

// หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่าน โดยต่อ filter -> map -> reduce
const getCEPassedAverage = (students) =>
  Number((students.filter(s => s.dept === 'CE' && s.score >= 50).map(s => s.score).reduce((acc, score, _, arr) => acc + score / arr.length, 0)).toFixed(2));


// ส่วนที่ 3 — ทดสอบกรณีขอบ (Edge Cases - Array ว่าง [])

console.log("=== ทดสอบข้อมูลปกติ ===");
console.log("1. getNames:", getNames(mockStudents));
console.log("2. getPassedStudents:", getPassedStudents(mockStudents));
console.log("3. getTotalScore:", getTotalScore(mockStudents));
console.log("4. getAverageScore:", getAverageScore(mockStudents));
console.log("5. countByGrade:", countByGrade(mockStudents));
console.log("6. getTopStudent:", getTopStudent(mockStudents));
console.log("ส่วนที่ 2 - คะแนนเฉลี่ย CE ที่ผ่าน:", getCEPassedAverage(mockStudents));

console.log("\n=== ทดสอบกรณีขอบ (Array ว่าง []) ===");
const emptyArray = [];
console.log("getNames([]):", getNames(emptyArray));
console.log("getPassedStudents([]):", getPassedStudents(emptyArray));
console.log("getTotalScore([]):", getTotalScore(emptyArray));
console.log("getAverageScore([]):", getAverageScore(emptyArray));
console.log("countByGrade([]):", countByGrade(emptyArray));
console.log("getTopStudent([]):", getTopStudent(emptyArray));
console.log("getCEPassedAverage([]):", getCEPassedAverage(emptyArray));