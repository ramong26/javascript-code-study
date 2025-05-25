// 문제 링크: [더 맵게](https://school.programmers.co.kr/learn/courses/30/lessons/42626)

// 문제 설명
// 매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다.
// 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.
// 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

// Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
// Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때,
// 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.
// 제한 사항
// scoville의 길이는 2 이상 1,000,000 이하입니다.
// K는 0 이상 1,000,000,000 이하입니다.
// scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
// 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

// 실행: node jincheol/week2/study2.js

function solution(scoville, K) {
  const minHeap = new MinHeap();
  for (const item of scoville) {
    minHeap.add(item); // 모든 값을 힙에 추가
  }
  console.log('heap', minHeap);
  let mixCount = 0; // 섞은 횟수
  // 요리의 개수가 2개 이상 && 제일 낮은 스코빌 지수가 K 보다 낮을 때 섞기
  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    const firstMin = minHeap.poll(); // 첫 번째로 낮은 스코빌 음식
    const secondMin = minHeap.poll(); // 두 번째로 낮은 스코빌 음식

    const newFood = firstMin + secondMin * 2; // 두 음식을 섞기
    minHeap.add(newFood); // 섞은 음식은 힙에 추가
    mixCount++; // 섞은 횟수 +
  }

  // 제일 낮은 스코빌이 K보다 크면 섞은 횟수를 return
  if (minHeap.peek() >= K) return mixCount;
  // 제일 낮은 스코빌이 K보다 작으면 -1 return
  return -1;
}

// 최소 힙은 부모가 자식보다 같거나 작아야한다만 지키면 된다.
// 왼쪽 자식이 오른쪽 자식보다 항상 작아야 한다는 규칙은 없다
class MinHeap {
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

  // 힙의 제일 작은 값(최상단)을 확인하기 위한 함수
  peek() {
    if (this.heapContainer.length === 0) return null;
    return this.heapContainer[0];
  }

  // 힙에서 제일 작은 값(최상단)을 추출(제거)하는 함수
  poll() {
    if (this.heapContainer.length === 0) return null; // 힙이 비었으면 null
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

  // 힙을 아래에서부터 위로 (최소값 쪽으로) 정렬하는 함수
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1; // 기준 index가 없으면 제일 마지막 index 기준
    // 부모가 있고 부모의 값이 더 클 때 (부모의 값이 더 작아야하므로 바꿔야함)
    while (
      this.hasParent(currentIndex) &&
      this.parent(currentIndex) > this.heapContainer[currentIndex]
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex)); // 현재 값과 부모를 바꿈
      currentIndex = this.getParentIndex(currentIndex); // 현재 값의 index를 조정 (부모 swap했으니 부모 위치의 index값)
    }
  }

  // 힙을 위에서부터 아래로 (최대값 쪽으로) 정렬하는 함수
  // 기본 값은 0 (루트 노드 = 마지막 원소 -> poll 이후 마지막 원소를 최상단으로 이동하기 때문)
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null; // swap할 index

    // 왼쪽 자식이 있을 경우 (왼쪽 자식이 없는데 오른쪽 자식이 있을 일이 없음 = 자식이 있을 경우)
    // 자식 중 값이 작은 자식과 현재 값을 비교하여 현재 값이 더 크면 아래로 내리는 과정(값이 작은 자식과 swap)
    while (this.hasLeftChild(currentIndex)) {
      // 오른쪽 자식이 왼쪽 자식보다 같거니 작을 경우
      const isRightChildSmallerThanLeftChild =
        this.rightChild(currentIndex) <= this.leftChild(currentIndex);

      // 오른쪽 자식이 있으면서 오른쪽 자식이 왼쪽 자식보다 같거나 작을 경우
      if (
        this.hasRightChild(currentIndex) &&
        isRightChildSmallerThanLeftChild
      ) {
        nextIndex = this.getRightChildIndex(currentIndex); // swap할 index는 오른쪽 자식의 index
      } else {
        // 오른쪽 자식이 없거나 왼쪽 자식이 더 작을 경우
        nextIndex = this.getLeftChildIndex(currentIndex); // swap할 index는 왼쪽 자식의 index
      }

      // 현재 값이 swap할 index의 값보다 작은 경우 종료 (정렬이 완료된 상황)
      if (this.heapContainer[currentIndex] < this.heapContainer[nextIndex]) {
        break;
      }

      this.swap(currentIndex, nextIndex); // 현재 값이 swap할 index의 값보다 크면 아래로 내려야하니 swap
      currentIndex = nextIndex; // 현재 값의 index를 조정 (자식이랑 swap했으니 자식 위치의 index값)
    }
  }

  // 힙의 사이즈를 return
  size() {
    return this.heapContainer.length;
  }
}

const ex_scoville = [1, 2, 3, 9, 10, 12];
const ex_k = 7;

const ex_sol = solution(ex_scoville, ex_k);
// 입출력 예시 결과값: 2
console.log(ex_sol);

// 힙의 값이 어떻게 되는지 확인하기 위한 값
// 힙을 시각화한 이미지 -> ex_heap.png
// [1, 2, 3, 7, 4, 12, 5, 9, 13, 10];
const ex_visualize_heap_val = [1, 2, 3, 9, 10, 12, 5, 7, 13, 4];
const ex_visualize_heap = solution(ex_visualize_heap_val, ex_k);
console.log(ex_visualize_heap);
