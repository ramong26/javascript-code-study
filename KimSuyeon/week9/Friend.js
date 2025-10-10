// https://www.acmicpc.net/problem/1058
// 친구 - 실버 2

// 입력을 한 줄씩 읽어와 배열로 저장
const input = require('fs')
  .readFileSync("./KimSuyeon/week9/input3.txt", "utf-8")
  .trim()
  .split('\n');
// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

const N = +input[0];
const friends = input.slice(1).map((line) => line.split(''));

// 직접 친구이거나, 친구의 친구인 사람의 수를 구해야 함
// 즉, 2-친구의 수를 구해야 함
// Y면 친구, N이면 친구 아님
let maxCount = 0;

for (let i = 0; i < N; i++) {
  // i번 사람의 2-친구를 체크할 배열
  const visited = Array(N).fill(false);

  for (let j = 0; j < N; j++) {
    if (i === j) continue; // 자기 자신 제외

    // 1단계 친구이거나
    if (friends[i][j] === 'Y') {
      visited[j] = true;
    } else {
      // 2단계 친구인지 확인
      for (let k = 0; k < N; k++) {
        if (friends[i][k] === 'Y' && friends[k][j] === 'Y') {
          visited[j] = true;
          break;
        }
      }
    }
  }
  // i번 사람의 2-친구 수 계산
  const count = visited.filter(Boolean).length;
  maxCount = Math.max(maxCount, count);
}

console.log(maxCount);

// input 예시
// 10
// NNNNYNNNNN
// NNNNYNYYNN
// NNNYYYNNNN
// NNYNNNNNNN
// YYYNNNNNNY
// NNYNNNNNYN
// NYNNNNNYNN
// NYNNNNYNNN
// NNNNNYNNNN
// NNNNYNNNNN
