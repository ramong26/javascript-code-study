// 문제 링크: [전화번호 목록](https://school.programmers.co.kr/learn/courses/30/lessons/42577)

// 문제 설명
// 전화번호부에 적힌 전화번호 중, 한 번호가 다른 번호의 접두어인 경우가 있는지 확인하려 합니다.
// 전화번호가 다음과 같을 경우, 구조대 전화번호는 영석이의 전화번호의 접두사입니다.
// 구조대 : 119
// 박준영 : 97 674 223
// 지영석 : 11 9552 4421
// 전화번호부에 적힌 전화번호를 담은 배열 phone_book 이 solution 함수의 매개변수로 주어질 때,
// 어떤 번호가 다른 번호의 접두어인 경우가 있으면 false를 그렇지 않으면 true를 return 하도록 solution 함수를 작성해주세요.
// 제한 사항
// phone_book의 길이는 1 이상 1,000,000 이하입니다.
// 각 전화번호의 길이는 1 이상 20 이하입니다.
// 같은 전화번호가 중복해서 들어있지 않습니다.

// 실행: node jincheol/week1/study.js

function solution(phone_book) {
  phone_book.sort(); // 1째 자리가 같아야하니 사전순으로 정렬

  for (let i = 0; i < phone_book.length - 1; i++) {
    const phone = phone_book[i]; // 앞의 번호
    const nextPhone = phone_book[i + 1]; // 뒤의 번호
    const target = nextPhone.slice(0, phone.length); // 앞 번호 길이만큼 뒷번호를 잘라서

    if (phone === target) return false; // 같은면 false 반환
  }

  return true;
}

const ex_phone_book_one = ['119', '97674223', '1195524421'];
const ex_phone_book_two = ['123', '456', '789'];
const ex_phone_book_three = ['12', '123', '1235', '567', '88'];

const ex_sol_one = solution(ex_phone_book_one);
const ex_sol_two = solution(ex_phone_book_two);
const ex_sol_three = solution(ex_phone_book_three);
// 입출력 예시 결과값: false, true, false
console.log(ex_sol_one, ex_sol_two, ex_sol_three);
