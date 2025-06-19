// [도둑질](https://school.programmers.co.kr/learn/courses/30/lessons/42897)

// 도둑이 어느 마을을 털 계획을 하고 있습니다. 이 마을의 모든 집들은 아래 그림과 같이 동그랗게 배치되어 있습니다.
// 각 집들은 서로 인접한 집들과 방범장치가 연결되어 있기 때문에 인접한 두 집을 털면 경보가 울립니다.
// 각 집에 있는 돈이 담긴 배열 money가 주어질 때, 도둑이 훔칠 수 있는 돈의 최댓값을 return 하도록 solution 함수를 작성하세요.
// 제한사항
// 이 마을에 있는 집은 3개 이상 1,000,000개 이하입니다.
// money 배열의 각 원소는 0 이상 1,000 이하인 정수입니다.

// 실행: node jincheol/week5/personal-dynamicProgramming.js

function solution(money) {
  // 집이 3개면 최댓값 바로 return
  if (money.length === 3) return Math.max(...money);

  const calc = (houseList) => {
    const maxMoney = new Array(houseList.length).fill(0); // dp 테이블, maxMoney[i]는 i번째 집까지 고려했을 때 최대 금액
    maxMoney[0] = houseList[0]; // 0번째 집만 고려했을 때 최대 금액
    maxMoney[1] = Math.max(houseList[0], houseList[1]); // 1째 집까지 고려했을 때의 최대 금액은 두 값 중 더 큰 값을 선택

    // 0, 1까지는 계산했으니 2부터 시작
    for (let i = 2; i < houseList.length; i++) {
      const curMoney = houseList[i];
      const passCurMoney = maxMoney[i - 1]; // 현재 집을 털지 않는 경우 -> 이전 집까지의 최대 금액
      const stealCurMoney = curMoney + maxMoney[i - 2]; // 현재 집을 터는 경우 -> curMoney + 전전 집(i - 2)까지의 최대 금액
      maxMoney[i] = Math.max(passCurMoney, stealCurMoney); // 두 경우 중 큰 값을 저장
    }

    return maxMoney.at(-1); // 마지막 집까지 고려했을 때의 금액을 return
  };

  let answer = 0;

  // 원형이기 때문에 첫 번째 집을 털면 마지막 집은 인접해 있으므로 무조건 털 수 없음. -> money[0]을 털면 money[-1]을 제외하고 계산해야 됨.
  // money[0]째 집을 털지 않은 경우는 money[-1]집도 털 가능성이 있기에 고려해서 계산하게 됨.
  // 답이 어떻든 첫 번째 집을 털었거나 털지 않았거나 둘 중 하나임.
  // 그렇기 때문에 첫 번째 집을 터는 경우와 털지 않는 경우로 나눠서 계산하고 최종적으로 두 경우 중 큰 경우를 선택.
  // 추가로 dp 테이블은 이 문제의 원형 인접 관계를 반영하지 못한다.
  // -> 전까지의 값들을 사용하며 추가해나가기 때문에 마지막 값까지 계산해도 원형으로 인한 [0]과 [-1]의 문제를 해결할 수 없음(= 알 수 없음)
  const startFirstHouse = calc(money.slice(0, money.length - 1)); // 0째 집을 털면 마지막 집을 털 수 없으므로 뒤에서 두 번째 집까지 고려
  const startNotFirstHouse = calc(money.slice(1, money.length)); // 0째 집을 털지 않으면 마지막 집까지 털 수 있으므로 마지막 집까지 고려

  answer = Math.max(startFirstHouse, startNotFirstHouse); // 두 경우 중 큰 경우를 할당

  return answer;
}

const ex_money = [1, 2, 3, 1];

const ex_sol = solution(ex_money);
// 입출력 예시 결과값: 4
console.log(ex_sol);
