// 문제 링크: [로또](https://www.acmicpc.net/problem/6603)

// 실행: node jincheol/week10/study-bruteForce1.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week10/input1.txt')
  .toString()
  .trim()
  .split('\n');

const lottos = []; // input을 재가공한 새로운 input

let answer = ''; // 최종 정답 문자열

// input 재가공
for (const numbers of input) {
  const [len, ...number] = numbers.split(' ').map(Number);
  if (len !== 0) {
    lottos.push({ len, number });
  }
}

const combi = (len, numbers) => {
  const resultCombi = []; // 로또 조합을 저장할 배열
  const curCombi = []; // 현재 로또 조합

  /**
   *
   * @param {number} start 다음 시작 숫자 인덱스
   * @param {number} count 현재 로또 번호 개수
   * @returns
   */
  const dfs = (start, count) => {
    // 모든 숫자를 선택했을 경우
    if (count === 6) {
      resultCombi.push([...curCombi]); // 현재 로또 조합을 복사하여 저장
      return;
    }

    // 시작 숫자 인덱스 부터 남은 숫자를 순회
    for (let i = start; i < len; i++) {
      curCombi.push(numbers[i]); // 현재 숫자를 현재 로또에 추가
      dfs(i + 1, count + 1); // 다음 탐색 재귀
      curCombi.pop(); // 백트래킹
    }
  };

  dfs(0, 0); // 탐색 시작

  // 최종 출력 가공
  resultCombi.forEach((com) => {
    answer += com.join(' ') + '\n'; // 조합에 공백을 추가 + 마지막에 줄바꿈
  });

  answer += '\n'; // 다음 테스트 케이스 사이에 빈 줄을 출력하기 위함
};

for (const { len, number } of lottos) {
  combi(len, number); // 각 테스트 케이스 별로 조합 생성
}

console.log(answer.trim()); // 제일 마지막 빈 줄을 삭제하기 위함
