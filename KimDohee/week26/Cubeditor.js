/* 문자열 알고리즘 - Cubeditor(https://www.acmicpc.net/problem/1701)
Cubelang에서 필요한 기능은 어떤 문자열 내에서 부분 문자열이 두 번 이상 나오는 문자열을 찾는 기능이다. 이때, 두 부분 문자열은 겹쳐도 된다.

예를 들어, abcdabc에서 abc는 두 번 나오기 때문에 검색이 가능하지만, abcd는 한 번 나오기 때문에 검색이 되지를 않는다.

이렇게 어떤 문자열에서 두 번 이상 나오는 부분 문자열은 매우 많을 수도 있다. 이러한 부분 문자열 중에서 가장 길이가 긴 것을 구하는 프로그램을 작성하시오.

예를 들어, abcabcabc에서 abc는 세 번 나오기 때문에 검색할 수 있다. 또, abcabc도 두 번 나오기 때문에 검색할 수 있다. 하지만, abcabca는 한 번 나오기 때문에 검색할 수 없다. 따라서, 두 번 이상 나오는 부분 문자열 중에서 가장 긴 것은 abcabc이기 때문에, 이 문자열이 답이 된다.
 */

function solution(input) {
  const str = input.trim();
  const n = str.length;
  
  let left = 0;
  let right = str.length;
  let answer = 0;

  // 이진 탐색으로 최대 길이 찾기
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 길이 mid인 부분 문자열이 두번 이상 나타나는지 확인
    const seen = new Set();
    let found = false;  // 가능한 문자열을 찾았는지

    for (let i = 0; i <= n - mid; i++) {
      const substr = str.substring(i, i + mid);
      if (seen.has(substr)) {
        found = true;
        break;
      }
      seen.add(substr);
    }

    if (found) {
      answer = mid;
      left = mid + 1;  // 더 긴 것도 시도
    } else {
      right = mid - 1;  // 불가능이면 더 짧은 것 시도
    }
  }

  return answer;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));