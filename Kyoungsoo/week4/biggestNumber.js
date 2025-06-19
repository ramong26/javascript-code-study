function biggestNumber(number, k) {
  let answer = "";
  let start = 0;
  let targetLength = number.length - k;

  while (answer.length < targetLength) {
    let maxDigit = "0";
    for (let i = start; i <= k + answer.length; i++) {
      if (number[i] > maxDigit) {
        maxDigit = number[i];
        start = i + 1;
      }
      if (i >= number.length - 1) {
        break;
      }
    }
    answer += maxDigit;
  }

  return answer;
}

console.log(biggestNumber("1924", 2));
console.log(biggestNumber("1231234", 3));
console.log(biggestNumber("4177252841", 4));
