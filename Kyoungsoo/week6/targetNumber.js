function solution(numbers, target) {
  let count = 0;

  function dfs(index, current) {
    if (index === numbers.length) {
      if (current === target) {
        count++;
      }
      return;
    }

    // 현재 수를 양수로 더한 경우
    dfs(index + 1, current + numbers[index]);

    // 현재 수를 음수로 바꿔 더한 경우
    dfs(index + 1, current - numbers[index]);
  }

  dfs(0, 0); // 시작: index 0부터, 합은 0
  return count;
}

console.log(solution([1, 1, 1, 1, 1], 3));
console.log(solution([4, 1, 2, 1], 4));
