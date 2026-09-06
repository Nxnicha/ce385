// ==========================================
// ส่วนที่ 1 — ข้อมูลตั้งต้น (อย่างน้อย 6 คน)
// ==========================================
const students = [
  { id: '1001', name: 'Somchai', major: 'CE', score: 85, contact: { email: 'somchai@email.com', phone: '0812345678' } },
  { id: '1002', name: 'Somsri', major: 'IT', score: 45, contact: { email: 'somsri@email.com', phone: '0823456789' } },
  { id: '1003', name: 'Anan', major: 'CE', score: 72, contact: { email: 'anan@email.com', phone: '0834567890' } },
  { id: '1004', name: 'Kanda', major: 'IT', score: 68, contact: { email: 'kanda@email.com', phone: '0845678901' } },
  { id: '1005', name: 'Boonmee', major: 'CE', score: 30, contact: { email: 'boonmee@email.com', phone: '0856789012' } },
  { id: '1006', name: 'Chai', major: 'IT', score: 90, contact: { email: 'chai@email.com', phone: '0867890123' } }
];

// ==========================================
// ส่วนที่ 2 — ฟังก์ชันค้นหาข้อมูล
// ==========================================

// 1. ค้นหาด้วย ID (คืนนักศึกษาคนนั้น หรือ undefined)
const findById = (studentList, id) => {
  return studentList.find(student => student.id === id);
};

// 2. ค้นหาด้วย สาขา (คืน array ของนักศึกษาในสาขานั้น)
const findByMajor = (studentList, major) => {
  return studentList.filter(student => student.major === major);
};

// 3. ตรวจสอบว่ามีคนสอบตกไหม (score < 50)
const hasFailingStudent = (studentList) => {
  return studentList.some(student => student.score < 50);
};

// 4. ดึงอีเมล (ใช้ ?. และ ??)
const getEmail = (studentList, id) => {
  const student = findById(studentList, id);
  return student?.contact?.email ?? 'ไม่พบข้อมูลติดต่อ';
};

// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีขอบและการเพิ่มข้อมูล
// ==========================================

console.log('=== 1. ทดสอบกรณีหาไม่เจอ (ID: "9999") ===');
console.log('findById("9999") :', findById(students, '9999'));
console.log('getEmail("9999")  :', getEmail(students, '9999'));

console.log('\n=== 2. เพิ่มนักศึกษาใหม่โดยไม่ใส่ contact (ใช้ Spread Operator) ===');
const newStudent = { id: '1007', name: 'NoContactStudent', major: 'CE', score: 78 };

// ห้ามใช้ push — สร้าง array ใหม่ด้วย spread
const updatedStudents = [...students, newStudent];

console.log('ทดสอบ getEmail กับนักศึกษาคนที่ไม่มี contact (ID: "1007"):');
console.log('getEmail("1007")  :', getEmail(updatedStudents, '1007'));

console.log('\n=== 3. ทดสอบฟังก์ชันค้นหาอื่นๆ ===');
console.log('นักศึกษาสาขา CE   :', findByMajor(updatedStudents, 'CE'));
console.log('มีคนสอบตกหรือไม่?  :', hasFailingStudent(updatedStudents));