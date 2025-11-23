/*
문자열 알고리즘 - 전화번호 목록(https://www.acmicpc.net/problem/5052)
입력
첫째 줄에 테스트 케이스의 개수 t가 주어진다. (1 ≤ t ≤ 50) 각 테스트 케이스의 첫째 줄에는 전화번호의 수 n이 주어진다. (1 ≤ n ≤ 10000) 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 길어야 10자리이며, 목록에 있는 두 전화번호가 같은 경우는 없다.
출력
각 테스트 케이스에 대해서, 일관성 있는 목록인 경우에는 YES, 아닌 경우에는 NO를 출력한다.
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const t = parseInt(lines[0]);
  let currentLine = 1;  // 현재 보고있는 라인
  const result = [];   // 각 테스트 케이스 결과를 저장할 배열

  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[currentLine]);
    currentLine++;

    const phones = [];
    for (let j = 0; j < n; j++) {
      phones.push(lines[currentLine]);
      currentLine++;
    }

    // 각 테스트케이스마다 set과 isConsistent 초기화
    const phoneSet = new Set(phones);
    let isConsistent = true;

    for (const phone of phones) {
      for (let len = 1; len < phone.length; len++) {
        const prefix = phone.substring(0, len);

        // 3. 접두어가 다른 전화번호로 존재하는지 확인
        if (phoneSet.has(prefix)) {
          isConsistent = false;
          break;
        } 
      }
      if (!isConsistent) break;
    }
    result.push(isConsistent ? 'YES' : 'NO');
  }
  return result.join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));