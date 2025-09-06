// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs")
  .readFileSync("./KimSuyeon/week3/input2.txt", "utf-8")
  .trim()
  .split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 11
const M = input.slice(1).map((line) => line.split(" ").map(Number));

// console.log(M);

// 종료시간 기준으로 오름차순 정렬, 종료시간이 같으면 시작시간 기준으로 오름차순 정렬
M.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let count = 0;
let j = 0;
let endTime = 0;

// 길이만큼 while문 돌리기
while (j < N) {
  if (M[j][0] >= endTime) {
    count++;
    endTime = M[j][1]; // 종료시간 갱신
  }
  j++;
}

console.log(count);
