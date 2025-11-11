// BFS - 물통(https://www.acmicpc.net/problem/2251)

function solution(input) {
  const [A, B, C] = input.trim().split(' ').map(Number);

  const queue = [[0, 0, C]];
  const visited = new Set(); 
  visited.add('0,0,' + C);
  const answer = new Set();

  // from 물통에서 to 물통으로 물을 옮기는 함수
  function pour(state, from, to) {
    const [a, b, c] = state;
    const amounts = [a, b, c]; // 현재 물의 양
    const capacity = [A, B, C];
    
    // 실제로 옮길 수 있는 양 = min(from의 물, to의 남은 공간)
    const move = Math.min(amounts[from], capacity[to] - amounts[to]);
    
    amounts[from] -= move; // from에서 빼고
    amounts[to] += move;   // to에 더하기
    
    return amounts;
  }

  // BFS
  while (queue.length > 0) {
    const current = queue.shift();
    const [a, b, c] = current;

    // A가 비어있을 때 C의 값을 저장
    if (a === 0) {
      answer.add(c);
    }

    // 6가지의 경ㅇ우의 물 옮기기 시도
    for (let from = 0; from < 3; from++) {
      for (let to = 0; to < 3; to++) {
        if (from === to) continue;  // 같은 물통인 경우 건너뛰기

        const next = pour(current, from, to);
        const key = next.join(',');

        // 방문하지 않은 상태면 큐에 추가
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(next)
        }
      }
    }
  }

  return [...answer].sort((a, b) => a - b).join(' ');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));