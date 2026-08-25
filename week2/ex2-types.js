const strData = "สวัสดี";
const numData = 100;
const boolData = true;
let undefData;
const nullData = null;
const arrayData = [1, 2, 3];

console.log(`ค่า: ${strData} | ชนิด: ${typeof strData}`);
console.log(`ค่า: ${numData} | ชนิด: ${typeof numData}`);
console.log(`ค่า: ${boolData} | ชนิด: ${typeof boolData}`);
console.log(`ค่า: ${undefData} | ชนิด: ${typeof undefData}`);
console.log(`ค่า: ${nullData} | ชนิด: ${typeof nullData}`);
console.log(`ค่า: ${arrayData} | ชนิด: ${Array.isArray(arrayData) ? 'array' : typeof arrayData}`);

console.log("typeof null ได้ผลว่า:", typeof null);


let unassigned;
console.log("ตัวแปรที่ยังไม่กำหนดค่า มีชนิดเป็น:", typeof unassigned);

const nanValue = Number("abc");
console.log("typeof NaN ได้ผลว่า:", typeof nanValue);

const inputAge = "20";
const inputScore = "85.5";


const totalAge = Number(inputAge) + 5;
console.log("ผลลัพธ์ inputAge + 5 :", totalAge);

const formattedScore = Number(inputScore).toFixed(1);
console.log("inputScore ทศนิยม 1 ตำแหน่ง :", formattedScore);


console.log("inputAge === 20 :", inputAge === 20);
console.log("Number(inputAge) === 20 :", Number(inputAge) === 20);