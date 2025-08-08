/** 로또
 * 독일 로또는 {1, 2, ..., 49}에서 수 6개를 고른다.

로또 번호를 선택하는데 사용되는 가장 유명한 전략은 49가지 수 중 k(k>6)개의 수를 골라 집합 S를 만든 다음 그 수만 가지고 번호를 선택하는 것이다.

예를 들어, k=8, S={1,2,3,5,8,13,21,34}인 경우 이 집합 S에서 수를 고를 수 있는 경우의 수는 총 28가지이다. ([1,2,3,5,8,13], [1,2,3,5,8,21], [1,2,3,5,8,34], [1,2,3,5,13,21], ..., [3,5,8,13,21,34])

집합 S와 k가 주어졌을 때, 수를 고르는 모든 방법을 구하는 프로그램을 작성하시오.
 */
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
.readFileSync(filePath)
.toString()
.trim()
.split("\n")

input.pop(); // 마지막 '0' 제거

const answer = [];

for (let element of input) {
  const group = [];           // 모든 조합 저장
  const current = [];         // 현재 만들고 있는 조합
  const [k, ...S] = element.split(' ').map(Number);

  const recursive = () => {
    // 6개를 모두 선택했으면 조합 완성
    if (current.length === 6) {
      const result = current.join(' ');
      group.push(result);
      return;
    }

    for (let i = 0; i < k; i++) {
      // 오름차순 조건: 이전에 선택한 수보다 작거나 같으면 건너뛰기
      if (current.length >= 1 && current[current.length - 1] >= S[i]) continue;
      
      current.push(S[i]);       // 선택 (배열 끝에 추가)
      recursive();              // 재귀 함수 호출
      current.pop();            // 백트래킹 (배열 끝에서 제거)
    }
  };

  recursive();
  answer.push(group.join('\n'));
}

console.log(answer.join('\n\n'));
