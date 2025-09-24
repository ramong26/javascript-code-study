const input = require("fs")
  .readFileSync("./KimSuyeon/week7/input.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const example = input[0];
const [N, r, c] = example.trim().split(" ").map(Number); //2 3 1

let size = 2 ** N; // 2^N => 4

let answer = 0;

while (size > 1) {
  size = size / 2; // 2 => 4등분해서 각 사분면의 한 변 길이를 구하는 것
  // 왼쪽 위 1사분면
  if (r < size && c < size) {
    answer = answer + 0;
    // 오른쪽 위 2사분면
  } else if (r < size && c >= size) {
    answer = answer + size * size;
    c = c - size;
    // 왼쪽 아래 3사분면
  } else if (r >= size && c < size) {
    answer = answer + 2 * size * size;
    r = r - size; // 3 = 3-2
    // 오른쪽 아래 4사분면
  } else {
    answer = answer + 3 * size * size;
    r = r - size;
    c = c - size;
  }
}

console.log(answer);

// input example
// 2 3 1
