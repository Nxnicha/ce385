const workshopRaw = 48; : กำหนดคะแนนดิบ Workshop (เต็ม 60)

const attendance = 9; : กำหนดคะแนนเข้าเรียน (เต็ม 10)

const project = 17; : กำหนดคะแนนโปรเจกต์ (เต็ม 20)

const midterm = 15; : กำหนดคะแนนสอบกลางภาค (เต็ม 20)

const final = 24; : กำหนดคะแนนสอบปลายภาค (เต็ม 30)

const workshop = (workshopRaw / 60) * 20; : คำนวณแปลงคะแนน Workshop จากเต็ม 60 ให้เหลือสัดส่วนเต็ม 20

const total = workshop + attendance + project + midterm + final; : รวมคะแนนจากทุกส่วนเข้าด้วยกัน

const percentage = total; : กำหนดเปอร์เซ็นต์คะแนน (เนื่องจากคะแนนรวมเต็ม 100)

const missing = 80 - total; : คำนวณคะแนนที่ยังขาดอยู่เพื่อให้ถึงเป้าหมาย 80 คะแนน

console.log('===== สรุปคะแนน ====='); : แสดงหัวข้อสรุปคะแนน

console.log('Workshop = ${workshop.toFixed(2)} คะแนน'); : แสดงคะแนน Workshop ปรับเป็นทศนิยม 2 ตำแหน่ง

console.log('Attendance = ${attendance} คะแนน'); : แสดงคะแนนเข้าเรียน

console.log('Project = ${project} คะแนน'); : แสดงคะแนนโปรเจกต์

console.log('Midterm = ${midterm} คะแนน'); : แสดงคะแนนกลางภาค

console.log('Final = ${final} คะแนน'); : แสดงคะแนนปลายภาค

console.log('คะแนนรวม = ${total.toFixed(2)} คะแนน'); : แสดงคะแนนรวมทั้งหมด ปรับเป็นทศนิยม 2 ตำแหน่ง

console.log('คิดเป็น = ${percentage.toFixed(2)}%'); : แสดงผลเปอร์เซ็นต์คะแนน ปรับเป็นทศนิยม 2 ตำแหน่ง

if (missing > 0) { : ตรวจสอบว่าคะแนนยังไม่ถึง 80 หรือไม่ (ขาดอีกมากกว่า 0)

    console.log('ขาดอีก ${missing.toFixed(2)} คะแนนถึง 80 คะแนน'); : ถ้าคะแนนไม่ถึง ให้แสดงจำนวนคะแนนที่ขาด

} else { : ถ้าคะแนนเท่ากับหรือมากกว่า 80

    console.log('คะแนนถึง 80 แล้ว'); : แสดงข้อความแจ้งว่าคะแนนผ่านเกณฑ์ 80 แล้ว

} : ปิดบล็อกเงื่อนไข if-else
