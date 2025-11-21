/*
week25 자료구조 - 최소 힙
배열에 자연수 x를 넣는다.
배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.
*/

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return 0;
    if (this.heap.length === 2) return this.heap.pop();

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIndex = Math.floor(index / 2);

    while (parentIndex >= 1 && this.heap[index] < this.heap[parentIndex]) {
      [this.heap[index], this.heap[parentIndex]] =
        [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
    }
  }

  bubbleDown() {
    let index = 1;
    const length = this.heap.length;

    while (index * 2 < length) {  // 왼쪽 자식이 있는지 확인
      let leftChild = index * 2;
      let rightChild = index * 2 + 1;
      let smallerChild = leftChild;

      // 오른쪽 자식이 존재하고 더 작으면
      if (rightChild < length && this.heap[rightChild] < this.heap[leftChild]) {
        smallerChild = rightChild;
      }

      // 추가 안전장치
      if (smallerChild >= length) break;

      // 부모가 자식보다 작거나 같으면 종료
      if (this.heap[index] <= this.heap[smallerChild]) break;

      // 교환
      [this.heap[index], this.heap[smallerChild]] =
        [this.heap[smallerChild], this.heap[index]];
      index = smallerChild;
    }
  }
}

function solution(input) {
  const lines = input.trim().split('\n');
  const N = parseInt(lines[0]);
  const heap = new MinHeap();
  const result = [];

  for (let i = 1; i <= N; i++) {
    const x = parseInt(lines[i]);

    if (x === 0) {
      result.push(heap.pop());
    } else {
      heap.push(x);
    }
  }

  return result.join('\n');
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));