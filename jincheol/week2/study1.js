// 문제 링크: [올바른 괄호](https://school.programmers.co.kr/learn/courses/30/lessons/12909)

// 문제 설명
// 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다.
// 예를 들어
// "()()" 또는 "(())()" 는 올바른 괄호입니다.
// ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고,
// 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.
// 제한사항
// 문자열 s의 길이 : 100,000 이하의 자연수
// 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

// 실행: node jincheol/week2/study1.js

function solution(s) {
  if (s[0] === ')') return false; // 첫 글자가 ) 면 false

  let answer = false;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const str = s[i]; // 현재 문자
    const top = stack[stack.length - 1]; // 스택의 제일 위의 문자

    // 빈 스택일 경우
    if (!top) {
      stack.push(str); // 스택에 문자열 추가
      continue;
    }

    // 스택의 제일 위 문자와 현재 문자가 올바른 괄호 짝일 때
    if (str === ')' && top === '(') {
      stack.pop(); // 스택에서 제일 위의 문자를 제거
    } else {
      stack.push(str); // 스택에 현재 문자 추가
    }
  }

  if (stack.length === 0) answer = true; // 스택이 비었으면 true

  return answer;
}

const ex_s_one = '()()';
const ex_s_two = '(())()';
const ex_s_three = ')()(';
const ex_s_four = '(()(';

const ex_sol_one = solution(ex_s_one);
const ex_sol_two = solution(ex_s_two);
const ex_sol_three = solution(ex_s_three);
const ex_sol_four = solution(ex_s_four);
// 입출력 예시 결과값: true, true, false, false
console.log(ex_sol_one, ex_sol_two, ex_sol_three, ex_sol_four);
