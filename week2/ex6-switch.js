function login(inputUser, inputPass, role, isActive, age) {

    if (inputUser !== "admin" || inputPass !== "ce385pass") {
        return "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (401)";
    }

    if (isActive === false) {
        return "บัญชีนี้ถูกระงับการใช้งาน (403)";
    }

    if (age < 18) {
        return "อายุไม่ถึงเกณฑ์";
    }

    if (role === "อาจารย์") {
        return "เข้าสู่ระบบสำเร็จ (สิทธิ์ผู้ดูแล) (200)";
    }

    if (role === "นักศึกษา") {
        return "เข้าสู่ระบบสำเร็จ (สิทธิ์ทั่วไป) (200)";
    }
}

console.log(`========================`);

console.log(login("admin", "ce385pass", "อาจารย์", true, 30));

console.log(login("admin", "ce385pass", "นักศึกษา", true, 20));

console.log(login("admin", "wrongpass", "นักศึกษา", true, 20));

console.log(login("wronguser", "ce385pass", "นักศึกษา", true, 20));

console.log(login("admin", "ce385pass", "นักศึกษา", false, 20));

console.log(login("admin", "ce385pass", "นักศึกษา", true, 16));

console.log(`========================`);

