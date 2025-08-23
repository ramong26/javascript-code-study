// 입력을 한 줄씩 읽어와 배열로 저장
const input = require("fs").readFileSync("./KimSuyeon/week2/input1.txt", "utf-8").trim().split("\n");
//const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const line = input.map(line => line.trim());
const basic = line.map((v) => v.split(" ").map(Number));

const S = basic[0]; // 나무의 수, 가져가려는 나무의 길이
const tree = basic[1]; // 각 나무의 높이

const N = S[0]; // 나무의 수
const M = S[1]; // 상근이가 가져가려는 나무의 총 길이

let left = 0;
let right = Math.max(...tree);
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let sum = 0;
  for (let i = 0; i < N; i++) {
    if (tree[i] > mid) {
      sum = sum + (tree[i] - mid);
    }
  }

  if (sum >= M) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);