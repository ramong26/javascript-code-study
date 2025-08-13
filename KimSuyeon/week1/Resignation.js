// 실행 : node ./KimSuyeon/week1/Resignation.js

const fs = require("fs");
const input = fs.readFileSync("./KimSuyeon/week1/input2.txt", "utf-8").trim().split("\n");
const N = Number(input[0]);


let maxMoney = 0;
let T = [];
let P = [];

// T[i]: i번째 날 상담에 걸리는 시간
// P[i]: i번째 날 상담으로 얻는 수익
for (let i = 0; i < N; i++) {
  const [t, p] = input[i + 1].split(" ").map(Number);
  T.push(t);
  P.push(p);

}

function dfs(day, money){
  if(day > N) return; // 상담시간이 N을 초과하면 종료

  if(day === N) { // 마지막 날에 도달했을 때
    maxMoney = Math.max(maxMoney, money);
    return;
  }

  dfs(day + T[day], money + P[day]); // 상담을 하는 경우
  dfs(day + 1, money); // 상담을 하지 않는 경우
}
dfs(0, 0);
console.log(maxMoney);