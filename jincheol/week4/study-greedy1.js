// 문제 링크: [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883?language=javascript)

// 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.
// 예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다.
// 이 중 가장 큰 숫자는 94 입니다.
// 문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다.
// number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.
// 제한 조건
// number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
// k는 1 이상 number의 자릿수 미만인 자연수입니다.

// 실행: node jincheol/week4/study-greedy1.js

// 가장 큰 수는 앞 자리부터 커야함
function solution(number, k) {
  let answer = '';
  const numbers = []; // 작은 수를 제거하면서 큰 수를 저장할 스택
  let deleteCount = k; // 남은 제거 횟수

  for (let num of number) {
    // 스택에 숫자가 있고, 남은 제거 횟수가 있고, 스택의 마지막 숫자가 num보다 작을 때
    while (numbers.length && deleteCount && numbers.at(-1) < num) {
      numbers.pop(); // 스택의 마지막 요소를 제거
      deleteCount--; // 제거 횟수 --
    }

    numbers.push(num); // 스택에 남은 수는 현재 num보다 같거나 큰 수기에 push
  }

  // numbers는 내림차순으로 정렬되어 있는 상태
  // 남은 제거 횟수가 있을 경우
  while (deleteCount) {
    numbers.pop(); // 마지막 요소(제일 작은 수)제거
    deleteCount--; // 제거 횟수 감소
  }

  answer = numbers.join(''); // answer에 numbers 배열을 문자열로 만든 값을 할당

  return answer;
}

const ex_number_one = '1924';
const ex_number_two = '1231234';
const ex_number_three = '4177252841';

const ex_k_one = 2;
const ex_k_two = 3;
const ex_k_three = 4;

const ex_sol_one = solution(ex_number_one, ex_k_one);
const ex_sol_two = solution(ex_number_two, ex_k_two);
const ex_sol_three = solution(ex_number_three, ex_k_three);
// 입출력 예시 결과값: '94', '3234', '775841'
console.log(ex_sol_one, ex_sol_two, ex_sol_three);
