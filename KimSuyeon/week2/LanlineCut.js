// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs").readFileSync("./KimSuyeon/week2/input2.txt", "utf-8").trim().split("\n")
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const line = input.map(line => line.trim());
const basic = line.map((v) => v.split(" ").map(Number));
const secondLine = basic.slice(1).map(v => v[0]); // [802, 743, 457, 539]
const cleanLine = secondLine.sort((a, b) => (a - b)); // 첫 번째 줄을 제외하고 정렬
//  console.log( `cleanLine: ${cleanLine}`) //cleanLine: 457,539,743,802
const K = basic[0][0]; // 4
const N = basic[0][1]; // 11

let minLine = 1;
let num = 0;
let maxLine = Math.max(...cleanLine);
//  console.log(`num: ${num}`)
for(; minLine <= maxLine; ) {
  let midLine = Math.floor((minLine + maxLine) / 2);
  let sum = 0;
  for(let j = 0; j<=K-1; j++) {  
    sum = sum + Math.floor(cleanLine[j] / midLine);
  }

  if(sum >= N){
    num = midLine;
    minLine = midLine + 1;
  } else {
    maxLine = midLine - 1;
  }
}
console.log(num)

// console.log(max);