function solution(n, times) {
  let time = 0;

  while (true) {
    time++;
    let count = 0;

    for (let i = 0; i < times.length; i++) {
      count += Math.floor(time / times[i]);
    }

    if (count >= n) {
      return time;
    }
  }
}

console.log(solution(6, [7, 10]));
