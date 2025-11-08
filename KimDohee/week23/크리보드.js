/*
DP - 크리보드(https://www.acmicpc.net/problem/11058)
4개의 버튼만 있는 키보드를 N번 눌러서 화면에 출력된 A의 개수를 최대로 하기

1. 화면에 A를 출력한다.
2. Ctrl-A: 화면을 전체 선택한다
3. Ctrl-C: 전체 선택한 내용을 버퍼에 복사한다
4. Ctrl-V: 버퍼가 비어있지 않은 경우에는 화면에 출력된 문자열의 바로 뒤에 버퍼의 내용을 붙여넣는다
*/

function solution(input) {
  const N = Number(input);
  const dp = Array(N + 1).fill(0);

  // i번 버튼을 누를때
  // i = 현재 버튼 누른 횟수
  // j = 복사를 시작할 시점 (j번 누른 후의 상태)
  for (let i = 1; i <= N; i++) {
    dp[i] = dp[i-1] + 1;  // A를 출력하는 경우

    // 과거시점 j에서 복붙 시작 - Ctrl-A, Ctrl-C, Ctrl-V 버튼을 누르는 경우
    for (let j = i - 3; j >= 1; j--) {
      // dp[i] 갱신
      dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
    }
  }

  return dp[N];
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));

/* 
dp[i] = i번 버튼을 눌렀을 때 A의 최대 개수
dp[0] = 0 // 0번 누름 -> 0개
dp[1] = 1 // 1번 누름 -> 1개
dp[2] = 2 // 2번 누름 -> 2개
...
dp[N] = ? // N번 누름 → ?개


Ctrl-V를 k번 누르면 → dp[j] × (k + 1)개

- 원본: dp[j]
- 붙여넣기 k번: dp[j] × k
- 합계: dp[j] + dp[j]×k = dp[j]×(1 + k)

k = Ctrl-V 횟수 = i - j - 2

최종 개수 = dp[j] × (k + 1)
        = dp[j] × (i - j - 2 + 1)
        = dp[j] × (i - j - 1)  ✅
*/