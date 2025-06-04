// 스택/큐의 주식가격 lvl 2 문제입니다.
// https://school.programmers.co.kr/learn/courses/30/lessons/42584

function StockPrice(prices) {
  const answer = [];

  for (let i = 0; i < prices.length; i++) {
    let seconds = 0;
    for (let j = i + 1; j < prices.length; j++) {
      seconds++;
      if (prices[j] < prices[i]) break;
    }
    answer.push(seconds);
  }

  return answer;
}

console.log(StockPrice([1, 2, 3, 2, 3]));
