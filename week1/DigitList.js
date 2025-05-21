function solution(digits) {
  const phoneSet = new Set(digits); // 모든 번호를 Set에 저장

  for (let number of digits) {
    for (let i = 1; i < number.length; i++) {
      const prefix = number.slice(0, i); // 접두어 추출

      if (phoneSet.has(prefix)) {
        return false; // 접두어가 존재하면 false 반환
      }
    }
  }

  return true;
}

console.log(solution(["119", "97674223", "1195524421"]));
console.log(solution(["123", "456", "789"]));
console.log(solution(["12", "123", "1235", "567", "88"]));
