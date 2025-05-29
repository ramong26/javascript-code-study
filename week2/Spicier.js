function Spicier(scoville, K) {
  let count = 0;

  scoville.sort((a, b) => a - b);

  while (scoville.length >= 2 && scoville[0] < K) {
    const first = scoville.shift();
    const second = scoville.shift();
    const newFood = first + second * 2;

    scoville.push(newFood);
    scoville.sort((a, b) => a - b);
    count++;
  }

  return scoville[0] >= K ? count : -1;
}

console.log(Spicier([1, 2, 3, 9, 10, 12], 7));
