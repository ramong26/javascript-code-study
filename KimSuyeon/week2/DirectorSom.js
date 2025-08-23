// 입력을 한 줄씩 읽어와 배열로 저장
const input = Number(require("fs").readFileSync("./KimSuyeon/week2/input3.txt", "utf-8").trim().split("\n"));
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input);
let count = 0;
let num = 666;

while (true) {
  if (String(num).includes('666')) { // 666이 포함되면 카운트
    count++;
    if (count === N) { // N번째 666이 포함된 수 출력
      console.log(num);
      break;
    }
  }
  num++; // 666부터 1씩 증가시켜 666이 포함되었는지 확인
}