//프로그래머스 정렬의 가장 큰 수 문제입니다
//https://school.programmers.co.kr/learn/courses/30/lessons/42746

function largestNumber(numbers) {
  numbers.sort((a, b) => {
    const strA = String(a);
    const strB = String(b);
    return strB + strA - (strA + strB);
  });

  const result = numbers.join("");

  return result[0] === "0" ? "0" : result;
}

console.log(largestNumber([6, 10, 2]));
console.log(largestNumber([3, 30, 34, 5, 9]));
console.log(largestNumber([0, 0, 0, 0]));
