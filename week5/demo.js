//ฐานข้อมูล" จำลอง: ตอบช้า 400ms เหมือนงาน I/O จริง
const CALLBACK_STUDENTS = [
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
  { id: 3, name: "Alice Johnson", age: 19 },
];

function fetchStudentByIdCallback(id, callback) {
  setTimeout(() => {
    const student = CALLBACK_STUDENTS.find((s) => s.id === id);
    callback(student); //งานเสร็จค่อยเรียก "โทรกลับ"
  }, 400);
}

fetchStudentByIdCallback("65001", (student) => {
  console.log("ได้ข้อมูล:", student?.name ?? "ไม่พบข้อมูล");
});
console.log("กบรรทัดนี้พิมพ์ก่อนได้ข้อมูล"); //ระบบไม่เคยหยุดรอ

const STUDENTS = [{ id: "6501", name: "สมชาย", score: 78 }];

function fetchStudentById(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(STUDENTS.find((s) => s.id === id)), 400);
  });
}

fetchStudentById("6501")
  .then((student) => {
    console.log("ขั้น 1: ได้นักศึกษา =", student.name);
    return student.score; // สิ่งที่ return = input ของขั้นหน้า
  })
  .then((score) => {
    console.log("ขั้น 2: ได้คะแนน   =", score);
    return score >= 60 ? "B" : "F";
  })
  .then((grade) => {
    console.log("ขั้น 3: ได้เกรด     =", grade);
  });