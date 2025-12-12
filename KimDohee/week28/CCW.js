/*
기하 알고리즘 - CCW(https://www.acmicpc.net/problem/11758)
P1, P2, P3를 순서대로 이은 선분이 반시계 방향을 나타내면 1, 시계 방향이면 -1, 일직선이면 0을 출력한다.

CCW (Counter ClockWise) 공식: sum = x1*y2 + x2*y3 + x3*y1 - y1*x2 - y2*x3 - y3*x1;
*/

function solution(input) {
  const lines = input.split('\n');
  const [x1, y1] = lines[0].split(' ').map(Number);
  const [x2, y2] = lines[1].split(' ').map(Number);
  const [x3, y3] = lines[2].split(' ').map(Number);

  const ccw = (x1, y1, x2, y2, x3, y3) => {
    const arr = [[x1, y1], [x2, y2], [x3, y3], [x1, y1]];
    
    let result = 0;
    for (let i = 0; i < 3; i++) {
      const x_current = arr[i][0];  // 현재 점의 x
      const y_current = arr[i][1];  // 현재 점의 y
      const x_next = arr[i + 1][0];  // 다음 점의 x
      const y_next = arr[i + 1][1];  // 다음 점의 y

      result += x_current*  y_next - x_next * y_current;
    }  
    return result > 0 ? 1 : result < 0 ? -1 : 0;
  }

  return ccw(x1, y1, x2, y2, x3, y3);
}

// function solution(input) {
//     const lines = input.split('\n');
//     const [x1, y1] = lines[0].split(' ').map(Number);
//     const [x2, y2] = lines[1].split(' ').map(Number);
//     const [x3, y3] = lines[2].split(' ').map(Number);

//     const result = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);

//     return result > 0 ? 1 : result < 0 ? -1 : 0;

// }


// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));