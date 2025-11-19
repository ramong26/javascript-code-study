//https://www.acmicpc.net/problem/1927
// 1927 - 최소 힙 - 실버 1

const input = require("fs")
  .readFileSync("./KimSuyeon/week15/input2.txt", "utf-8")
  .trim()
  .split("\n");
// 백준 제출 시에는 아래 코드 사용ㄴㄴㄴ
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

/*
class 너무 어려웠어요... class생각조차 못했어요...
*/
function solution(input) {
  const N = Number(input[0]);
  const arr = [];

  for (let i = 1; i <= N; i++) {
    arr.push(Number(input[i]));
  }

  const answer = [];
  const heap = new MinHeap();

  for (let i = 0; i < N; i++) {
    const value = arr[i];

    if (value === 0) {
      answer.push(heap.pop());
    } else {
      heap.push(value);
    }
  }

  return answer;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest])
        smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest])
        smallest = right;

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

console.log(solution(input).join("\n"));

// function solution(input) {
//   const N = Number(input[0]);
//   const arr = [];

//   for (let i = 1; i <= N; i++) {
//     arr.push(Number(input[i]));
//   }

//   const answer = [];
//   const heap = [];

//   for (let i = 0; i < N; i++) {
//     const value = arr[i];

//     if (value === 0) {
//       if (heap.length === 0) {
//         answer.push(0);
//       } else {
//         heap.sort((a, b) => a - b);
//         const min = heap.shift();
//         answer.push(min);
//       }
//     } else {
//       heap.push(value);
//     }
//   }

//   return answer;
// }

console.log(solution(input).join("\n"));
