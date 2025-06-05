// 문제 링크: [모음사전](https://school.programmers.co.kr/learn/courses/30/lessons/84512)

// 문제 설명
// 사전에 알파벳 모음 'A', 'E', 'I', 'O', 'U'만을 사용하여 만들 수 있는, 길이 5 이하의 모든 단어가 수록되어 있습니다.
// 사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA"이며, 마지막 단어는 "UUUUU"입니다.
// 단어 하나 word가 매개변수로 주어질 때, 이 단어가 사전에서 몇 번째 단어인지 return 하도록 solution 함수를 완성해주세요.
// 제한사항
// word의 길이는 1 이상 5 이하입니다.
// word는 알파벳 대문자 'A', 'E', 'I', 'O', 'U'로만 이루어져 있습니다.

// 실행: node jincheol/week3/study-bruteForce.js

function solution(word) {
  const raw = ['A', 'E', 'I', 'O', 'U'];
  const wordList = {}; // 생성된 단어와 인덱스를 저장할 객체
  let wordNum = 0; // 단어 순서 카운트

  // 현재까지 만들어진 단어, 현재 단어의 길이
  const makeWord = (currentWord, len) => {
    // 단어의 길이가 5초과면 중단
    if (5 < len) return;

    // 현재 단어와 단어 순서 카운트를 wordList에 추가
    wordList[currentWord] = wordNum++; // 현재 wordNum을 추가하고 다음 단어를 위해 값 1 증가

    // 각 모음을 현재 단어 뒤에 추가하여 생성, 재귀호출
    raw.forEach((str) => {
      makeWord(currentWord + str, len + 1);
    });
  };

  // 빈 문자열, 0으로 시작
  makeWord('', 0);

  // 주어진 word를 wordList에서 찾기
  const answer = wordList[word];

  return answer;
}

const ex_word_one = 'AAAAE';
const ex_word_two = 'AAAE';
const ex_word_three = 'I';
const ex_word_four = 'EIO';

const ex_sol_one = solution(ex_word_one);
const ex_sol_two = solution(ex_word_two);
const ex_sol_three = solution(ex_word_three);
const ex_sol_four = solution(ex_word_four);
// 입출력 예시 결과값: 6, 10, 1563, 1189
console.log(ex_sol_one, ex_sol_two, ex_sol_three, ex_sol_four);
