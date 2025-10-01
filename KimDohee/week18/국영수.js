/**
 * 정렬 - 국영수
 * 
국어 점수가 감소하는 순서로
국어 점수가 같으면 영어 점수가 증가하는 순서로
국어 점수와 영어 점수가 같으면 수학 점수가 감소하는 순서로
모든 점수가 같으면 이름이 사전 순으로 증가하는 순서로 (단, 아스키 코드에서 대문자는 소문자보다 작으므로 사전순으로 앞에 온다.)
 */

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const students = [];

  for (let i = 1; i <= N; i++) {
    const parsedLines = lines[i].split(' ');
    const student = {
      name: parsedLines[0],
      korean: parseInt(parsedLines[1]),
      english: parseInt(parsedLines[2]),
      math: parseInt(parsedLines[3])
    };
    
    students.push(student);
  }

  // 정렬
  students.sort((a, b) => { 
  // 1. 국어 점수 내림차순
  if (a.korean !== b.korean) {
    return b.korean - a.korean;
  }

  // 2. 영어 점수 오름차순
  if (a.english !== b.english) {
    return a.english - b.english;
  }

  // 3. 수학 점수 내림차순
  if (a.math !== b.math) {
    return b.math - a.math;
  }

  // 4, 이름 사전순
  if (a.name !== b.name) {
    // return a.name.localeCompare(b.name);
    return a.name < b.name ? -1 : 1;
  }
})

  return students.map(student => student.name).join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));