/*
기하 - 다각형의 면적 (https://www.acmicpc.net/problem/2166)
2차원 평면상에 N(3 ≤ N ≤ 10,000)개의 점으로 이루어진 다각형이 있다. 이 다각형의 면적을 구하는 프로그램을 작성하시오.

*신발끈 공식
면적 = |x₁y₂ - x₂y₁ + x₂y₃ - x₃y₂ + ... + xₙy₁ - x₁yₙ| / 2

*/
function solution(input) {
  const lines = input.split('\n');
  const n = parseInt(lines[0]);
  const points = [];
  
  for (let i = 1; i <= n; i++) {
    const [x, y] = lines[i].split(' ').map(Number);
    points.push([x, y]);
  }

  // 면적 계산
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;  // 마지막 인덱스 구하기 (마지막 점 다음은 첫번째 점)
    
    // xᵢ × yᵢ₊₁ 더하기
    sum += points[i][0] * points[next][1];

    // xᵢ₊₁ × yᵢ 빼기 
    sum -= points[next][0] * points[i][1];
  }

  const area = Math.abs(sum) / 2;  // 절댓값을 취하고 2로 나누기

  return area.toFixed(1);  // 소수점 첫째 자리까지 출력
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));