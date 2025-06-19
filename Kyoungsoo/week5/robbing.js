//프로그래머스 동적계획법 lvl 4 도둑질 문제입니다.
// https://school.programmers.co.kr/learn/courses/30/lessons/42897
// 털수 있는 집의 개수는 money.length 나누기 3 + 1 이라는 공식을 기반으로 풀이했습니다.

function robbing(money) {
  const count = Math.floor(money.length / 3) + 1; //money.length /3 + 1만큼 집을 털 수 있다

  let maxTotal = 0;

  // 모든 조합 중 count개를 뽑되, 인접한 집은 제외
  function dfs(index, selected, total) {
    if (selected.length === count) {
      if (total > maxTotal) {
        maxTotal = total;
      }
      return;
    }
    if (index >= money.length) return; //배열 범위를 넘으면 종료

    // 현재 집 선택할 경우
    dfs(index + 2, [...selected, index], total + money[index]);

    // 현재 집 선택 안할 경우
    dfs(index + 1, selected, total);
  }

  dfs(0, [], 0);

  return maxTotal;
}

console.log(robbing([1, 2, 3, 1]));
