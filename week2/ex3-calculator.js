const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

const workshop = (workshopRaw / 60) * 20;

const total = workshop + attendance + project + midterm + final;

const percentage = total;

const missing = 80 - total;

console.log(`===== สรุปคะแนน =====`);
console.log(`Workshop = ${workshop.toFixed(2)} คะแนน`);
console.log(`Attendance = ${attendance} คะแนน`);
console.log(`Project = ${project} คะแนน`);
console.log(`Midterm = ${midterm} คะแนน`);
console.log(`Final = ${final} คะแนน`);
console.log(`คะแนนรวม = ${total.toFixed(2)} คะแนน`);
console.log(`คิดเป็น = ${percentage.toFixed(2)}%`);

if (missing > 0) {
    console.log(`ขาดอีก ${missing.toFixed(2)} คะแนนถึง 80 คะแนน`);
} else {
    console.log(`คะแนนถึง 80 แล้ว`);
}