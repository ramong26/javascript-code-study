/*
그리디 - 물건팔기(https://www.acmicpc.net/problem/1487)
문제: 세준이는 오랜 연구기간 끝에 신상품을 내놓았다. 세준이는 오랜 시간이 걸린 만큼 이 상품을 최대 이익에 팔려고 한다.
세준이는 이 상품을 사려고 하는 사람들이 총 몇 명이나 되는지 알아봤다. 무려 N명이나 살 의향을 보였다. 각각의 사람은 자기가 지불할 생각이 있는 최대 한도가 있다. 따라서, 어떤 사람이 20원까지 지불할 생각이 있는데, 세준이가 가격을 30원으로 책정하면 이 사람은 절대 안 살 것이고, 15원으로 책정하면 이 사람은 이 상품을 15원에 살 것이다. (단, 세준이가 안 팔수도 있다.)
N명의 사람과, 각각의 사람이 지불할 용의가 있는 최대 금액과 배송비가 주어졌을 때, 세준이의 이익을 최대로 하는 가격을 출력하는 프로그램을 작성하시오.
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const n = Number(lines[0]);  // 구매할 의향이 있는 사람의 수
  
  // 각 사람이 지불할 최대금액과 배송비
  const customers = [];
  for (let i = 1; i <= n; i++) {
    const [maxPrice, deliveryCost] = lines[i].split(' ').map(Number);
    customers.push({ maxPrice, deliveryCost });
  }

  // 후보 가격: 각 고객의 최대 지불 금액
  const candidatePrices = customers.map(c => c.maxPrice);

  let maxProfit = 0;
  let bestPrice = 0;

  // 각 후보 가격에 대해 이익 계산
  for (const price of candidatePrices) {
    let profit = 0;

    // 현재 가격에서 구매 가능한 고객들의 이익 합산
    for (const customer of customers) {
      // 고객이 구매 가능하고, 이익이 나는 경우만
      if (customer.maxPrice >= price) {
        const individualProfit = price - customer.deliveryCost;
        if (individualProfit > 0) {
          profit += individualProfit;
        }
      }
    }

    // 최대 이익 갱신 (이익이 같으면 더 낮은 가격 선택)
    if (profit > maxProfit || (profit === maxProfit && price < bestPrice)) {
      maxProfit = profit;
      bestPrice = price;
    }
  }

  return bestPrice;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));