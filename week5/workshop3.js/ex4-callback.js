// เครื่องมือจำลองตามโจทย์ (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชันจำลอง Timeout สำหรับสถานการณ์ที่ 4
const timeoutPromise = (ms) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });

async function main() {
  // =========================================================================
  // สถานการณ์ที่ 1: หน้าแรก "โปรไฟล์" + "ตารางเรียน" + "ประกาศ"
  // เลือกใช้: Promise.all
  // เหตุผล: หน้าแรกต้องการข้อมูลครบทุกส่วนถ้าชิ้นใดชิ้นหนึ่งล้มเหลวถือว่าเปิดหน้าไม่ได้ทันที (Fail-fast)
  // =========================================================================
  console.log("=== สถานการณ์ที่ 1: หน้าแรก (Promise.all) ===");

  // 1.1 กรณีสำเร็จทุกชิ้น
  try {
    const data = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log(`เปิดหน้าแรก: ${data.join(", ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  // 1.2 กรณีมีชิ้นใดชิ้นหนึ่งล้ม (ประกาศ willFail=true)
  try {
    const data = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log(`เปิดหน้าแรก: ${data.join(", ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  // =========================================================================
  // สถานการณ์ที่ 2: แจ้งเตือนผลสอบ "อีเมล" + "SMS" + "แอป"
  // เลือกใช้: Promise.allSettled
  // เหตุผล: ต้องรอผลการส่งครบทุกช่องทางเพื่อทำรายงาน และถึงจะมีบางช่องทางล้มเหลวก็ห้ามทำระบบรายงานพัง
  // =========================================================================
  console.log("\n=== สถานการณ์ที่ 2: แจ้งเตือนผลสอบ (Promise.allSettled) ===");

  const notifications = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);

  console.log("รายงานผลการแจ้งเตือน:");
  notifications.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`- ${result.value}: ส่งสำเร็จ`);
    } else {
      console.log(`- ${result.reason.message}`);
    }
  });

  // =========================================================================
  // สถานการณ์ที่ 3: mirror server (mirror-A ล้ม, mirror-B สำเร็จ)
  // เลือกใช้: Promise.any
  // เหตุผล: ต้องการข้อมูลจากเซิร์ฟเวอร์ตัวแรกที่ "สำเร็จ" เท่านั้น และมองข้ามตัวที่ล้มเหลว
  // =========================================================================
  console.log("\n=== สถานการณ์ที่ 3: mirror server (Promise.any) ===");

  try {
    const serverData = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B")
    ]);
    console.log(`ใช้ข้อมูลจาก: ${serverData}`);
  } catch (error) {
    console.log("ทุก mirror server ล้มเหลวทั้งหมด");
  }

  // =========================================================================
  // สถานการณ์ที่ 4: ค้นหาฐานข้อมูล (1200ms) แต่ผู้ใช้รอได้แค่ 800ms
  // เลือกใช้: Promise.race
  // เหตุผล: ต้องการแข่งเวลากับ Timeout ตัวไหนจบก่อน (Resolve หรือ Reject) เอาตัวนั้นทันที
  // =========================================================================
  console.log("\n=== สถานการณ์ที่ 4: ค้นหาฐานข้อมูลจำกัดเวลา (Promise.race) ===");

  try {
    const result = await Promise.race([
      wait(1200, "ข้อมูลจากฐานข้อมูล"),
      timeoutPromise(800)
    ]);
    console.log(`ได้ข้อมูล: ${result}`);
  } catch (error) {
    console.log("ใช้แคชเก่าแทน");
  }
}

main();