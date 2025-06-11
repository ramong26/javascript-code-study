//프로그래머스 탐욕법 lvl 1 체육복 입니다.
//https://school.programmers.co.kr/learn/courses/30/lessons/42862

function gymWare(n, lost, reserve) {
  const realLost = lost.filter((l) => !reserve.includes(l));
  const realReserve = reserve.filter((r) => !lost.includes(r));

  realLost.sort((a, b) => a - b);
  realReserve.sort((a, b) => a - b);

  for (let i = 0; i < realLost.length; i++) {
    const lostStudent = realLost[i];
    const lender = realReserve.find((r) => Math.abs(r - lostStudent) === 1);

    if (lender !== undefined) {
      realReserve.splice(realReserve.indexOf(lender), 1);
      realLost[i] = null;
    }
  }

  const notCovered = realLost.filter((v) => v !== null).length;
  return n - notCovered;
}

console.log(gymWare(5, [2, 4], [1, 3, 5]));
console.log(gymWare(5, [2, 4], [3]));
console.log(gymWare(3, [3], [1]));
