function solution(citations) {
  citations.sort((a, b) => b - a); //배열을 내림차순으로 정렬렬
  let hIndex = 0;
  while (hIndex + 1 <= citations[hIndex]) {
    //지금까지 인용된 h-index를 배열값과 비교교
    hIndex++; //true라면 hIndex를 카운트트
  }
  return hIndex;
}

console.log(solution([3, 0, 6, 1, 5]));
