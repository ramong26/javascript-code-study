/**
 * 그리디 알고리즘 - 잃어버린 괄호 
 * 양수와 +, -로 이루어진 식의 괄호를 모두 지우고 다시 괄호를 적절히 추가해서 이 식의 최소값 구하기
 */

function solution(input) {
  const groups = input.trim().split('-')

  // 각 그룹의 합을 계산하는 함수
  const calcSum = (group) => {
    return group.split('+')
      .map(Number)
      .reduce((sum, num) => sum + num, 0);
  };

  // 첫번째 그룹은 더하기
  let result = calcSum(groups[0]);  

  // 나머지 그룹들은 빼기
  for (let i = 1; i < groups.length; i++) {
    result -= calcSum(groups[i]);
  }
  
  return result;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
