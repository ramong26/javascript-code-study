// 문제 링크: [H-Index](https://school.programmers.co.kr/learn/courses/30/lessons/42747)

// 문제 설명
// H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다.
// 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다.
// 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.
// 어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면
// h의 최댓값이 이 과학자의 H-Index입니다.
// 어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때,
// 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.
// 제한사항
// 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
// 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

// 실행: node jincheol/week3/study-sort.js

function solution(citations) {
  let answer = 0;
  const sortedCitations = citations.sort((a, b) => b - a); // 내림차순 정렬

  if (sortedCitations[0] === 0) return answer; // 만약 최대 인용 횟수가 0이면 바로 0 return

  for (let i = 0; i < sortedCitations.length; i++) {
    const citationCount = sortedCitations[i]; // (i + 1)번째로 많이 인용된 논문의 인용 횟수, (i + 1)은 현재 논문도 포함
    // 기존에 작성한 조건문 -> H-Index 값을 찾아도 for 루프를 끝까지 순회함
    // if (citationCount <= i) answer = Math.max(answer, citationCount);
    // else answer = Math.max(answer, i);

    // H-Index는 (i + 1)개의 논문이 (i + 1)번 이상 인용됐는지 확인하는 것임
    // 내림차순 정렬을 했기 때문에 sortedCitations[0] ~ sortedCitations[i]까지는 sortedCitations[i]보다 같거나 많이 인용된 논문임
    // 따라서 sortedCitations[i] (citationCount)가 (i + 1)번 이상 인용됐다면 앞의 논문들은 그 앞의 i개의 논문들은 (i + 1)번 이상 인용된 논문

    // H-Index 조건을 만족하지 못하는 순간을 찾아서 break하면 이후 for 루프를 끝까지 순회하지 않아도 됨
    if (citationCount < i + 1) {
      // 조건을 만족하지 않으면 앞의 논문 개수인 i가 answer
      answer = i;
      break;
    }

    // H-Index 조건을 만족하고 있는 경우는 현재 (i + 1)개의 논문은 (i + 1)번 이상 인용된거임
    // 따라서 H-Index는 (i + 1)까지 가능하기에 answer에 할당
    answer = i + 1;
  }

  return answer;
}

const ex_citations_one = [3, 0, 6, 1, 5];
const ex_citations_two = [10, 8, 5, 4, 3];
const ex_citations_three = [9, 7, 6, 2, 1];

const ex_sol_one = solution(ex_citations_one);
const ex_sol_two = solution(ex_citations_two);
const ex_sol_three = solution(ex_citations_three);
// 입출력 예시 결과값: 3, 4, 3
console.log(ex_sol_one, ex_sol_two, ex_sol_three);
