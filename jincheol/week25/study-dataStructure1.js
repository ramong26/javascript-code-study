// 문제 링크: [최대 힙](https://www.acmicpc.net/problem/11279)

// 실행: node jincheol/week25/study-dataStructure1.js

/**
 *
 * @param {number} N
 * @param {number[]} numbers
 */
const solution = (N, numbers) => {
  const answer = [];
  const maxHeap = new MaxHeap();

  for (let num of numbers) {
    if (num === 0) answer.push(maxHeap.poll());
    else maxHeap.add(num);
  }

  return answer.join('\n');
};

class MaxHeap {
  constructor() {
    this.heapContainer = [];
  }

  // 부모, 자식들의 index 값을 찾기 위한 함수들
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  // 부모, 자식을 갖고 있는지 확인하는 함수들
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  // 부모, 자식의 값을 추출하는 함수들
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  // 힙의 값을 서로 바꾸기 위한 함수 (트리 재조정을 위한 헬퍼 함수)
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  // 힙에서 제일 큰 값(최상단)을 추출(제거)하는 함수
  poll() {
    if (this.heapContainer.length === 0) return 0; // 힙이 비었으면 0을 return (문제의 조건)
    if (this.heapContainer.length === 1) return this.heapContainer.pop(); // 힙의 원소가 1개면 pop

    const item = this.heapContainer[0]; // 최상단 값 저장

    this.heapContainer[0] = this.heapContainer.pop(); // 맨 마지막 원소를 최상단으로 이동
    this.heapifyDown(); // 최상단부터 아래로 버블링(힙 유지)

    return item; // 최상단 값 return
  }

  // 힙에 원소를 추가하는 함수
  add(item) {
    this.heapContainer.push(item); // 맨 마지막에 추가
    this.heapifyUp(); // 아래서 부터 버블링 (힙 유지)
    return this;
  }

  // 힙을 아래에서부터 위로 (최대값 쪽으로) 정렬하는 함수
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1; // 기준 index가 없으면 제일 마지막 index 기준
    // 부모가 있고 부모의 값이 더 클작을 때 (부모의 값이 더 커야하므로 바꿔야함)
    while (
      this.hasParent(currentIndex) &&
      this.parent(currentIndex) < this.heapContainer[currentIndex]
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex)); // 현재 값과 부모를 바꿈
      currentIndex = this.getParentIndex(currentIndex); // 현재 값의 index를 조정 (부모 swap했으니 부모 위치의 index값)
    }
  }

  // 힙을 위에서부터 아래로 (최소값 쪽으로) 정렬하는 함수
  // 기본 값은 0 (루트 노드 = 마지막 원소 -> poll 이후 마지막 원소를 최상단으로 이동하기 때문)
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null; // swap할 index

    // 왼쪽 자식이 있을 경우 (왼쪽 자식이 없는데 오른쪽 자식이 있을 일이 없음 = 자식이 있을 경우)
    // 자식 중 값이 큰 자식과 현재 값을 비교하여 현재 값이 더 작으 아래로 내리는 과정(값이 큰 자식과 swap)
    while (this.hasLeftChild(currentIndex)) {
      // 오른쪽 자식이 왼쪽 자식보다 크거나 같을 경우
      const isRightChildBiggerThanLeftChild =
        this.rightChild(currentIndex) >= this.leftChild(currentIndex);

      // 오른쪽 자식이 있으면서 오른쪽 자식이 왼쪽 자식보다 크거나 같을 경우
      if (this.hasRightChild(currentIndex) && isRightChildBiggerThanLeftChild) {
        nextIndex = this.getRightChildIndex(currentIndex); // swap할 index는 오른쪽 자식의 index
      } else {
        // 오른쪽 자식이 없거나 왼쪽 자식이 더 클 경우
        nextIndex = this.getLeftChildIndex(currentIndex); // swap할 index는 왼쪽 자식의 index
      }

      // 현재 값이 swap할 index의 값보다 작은 경우 종료 (정렬이 완료된 상황)
      if (this.heapContainer[currentIndex] >= this.heapContainer[nextIndex]) {
        break;
      }

      this.swap(currentIndex, nextIndex); // 현재 값이 swap할 index의 값보다 크면 아래로 내려야하니 swap
      currentIndex = nextIndex; // 현재 값의 index를 조정 (자식이랑 swap했으니 자식 위치의 index값)
    }
  }

  // 힙의 제일 작은 값(최상단)을 확인하기 위한 함수
  peek() {
    if (this.heapContainer.length === 0) return null;
    return this.heapContainer[0];
  }

  // 힙의 사이즈를 return
  size() {
    return this.heapContainer.length;
  }
}

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');

const N = parseInt(input[0]);
const numbers = input.slice(1).map(Number);
console.log(solution(N, numbers));
