function solution(distance, rocks, n) {
  rocks.push(distance);
  rocks.sort((a, b) => a - b);

  let left = 1;
  let right = distance;
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let prev = 0;
    let removed = 0;

    for (let i = 0; i < rocks.length; i++) {
      const diff = rocks[i] - prev;
      if (diff < mid) {
        // 최소거리 유지 못하면 바위 제거
        removed++;
      } else {
        prev = rocks[i];
      }
    }

    if (removed > n) {
      right = mid - 1;
    } else {
      answer = mid;
      left = mid + 1;
    }
  }

  return answer;
}

console.log(solution(25, [2, 14, 11, 21, 17], 2));
