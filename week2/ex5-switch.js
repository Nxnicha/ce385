function getMenuPrice(menu) {
    switch (menu) {
        case "ข้าวผัด":
        case "ข้าวมันไก่":
        case "ข้าวหมูแดง":
            return 50;

        case "ผัดไทย":
            return 60;

        case "ต้มยำกุ้ง":
            return 120;

        default:
            return 0;
    }
}


function getSizeMultiplier(size) {
    switch (size) {
        case "ธรรมดา":
            return 1;

        case "พิเศษ":
            return 1.5;

        case "จัมโบ้":
            return 2;

        default:
            return 1;
    }
}


const orders = [
    { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
    { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
    { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
    { menu: "ข้าวมันไก่", size: "พิเศษ", qty: 2 },
    { menu: "ข้าวหมูแดง", size: "ธรรมดา", qty: 1 },
    { menu: "พิซซ่า", size: "พิเศษ", qty: 1 } // เมนูไม่มีในรายการ ทดสอบ default
];


let total = 0;

orders.forEach(order => {
    const menuPrice = getMenuPrice(order.menu);
    const sizeMultiplier = getSizeMultiplier(order.size);

    const price = menuPrice * sizeMultiplier * order.qty;

    console.log(
        `${order.menu} (${order.size}) x${order.qty} = ${price} บาท`
    );

    total += price;
});


console.log(`ราคารวมทั้งบิล = ${total} บาท`);