/**
브루트포스(순열) - 부등호
링크: https://www.acmicpc.net/problem/2529
두 종류의 부등호 기호 ‘<’와 ‘>’가 k개 나열된 순서열 A가 있다. 
우리는 이 부등호 기호 앞뒤에 서로 다른 한 자릿수 숫자를 넣어서 모든 부등호 관계를 만족시키려고 한다. 
예를 들어, 제시된 부등호 순서열 A가 다음과 같다고 하자. 
A ⇒ < < < > < < > < >

부등호 기호 앞뒤에 넣을 수 있는 숫자는 0부터 9까지의 정수이며 선택된 숫자는 모두 달라야 한다. 아래는 부등호 순서열 A를 만족시키는 한 예이다. 
3 < 4 < 5 < 6 > 1 < 2 < 8 > 7 < 9 > 0

여러분은 제시된 k개의 부등호 순서를 만족하는 (k+1)자리의 정수 중에서 최댓값과 최솟값을 찾아야 한다. 
앞서 설명한 대로 각 부등호의 앞뒤에 들어가는 숫자는 { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }중에서 선택해야 하며 선택된 숫자는 모두 달라야 한다. 
 */

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const k = parseInt(input[0]);
const inequality = input[1].split(' ');

// 문자열로 초기화
let max = '';
let min = '';
let visited = Array(10).fill(false);

function backtrack(currentNumber, numberCount) {
    if (numberCount === k + 1) {
        // 첫 번째로 완성된 숫자라면 초기값으로 설정
        if (max === '') {
            max = currentNumber;
            min = currentNumber;
        } else {
            // k+1자리 고정이므로 문자열 비교 = 숫자 크기 비교
            if (currentNumber > max) max = currentNumber;
            if (currentNumber < min) min = currentNumber;
        }
        return;
    }
    
    for (let digit = 0; digit < 10; digit++) {
        if (!visited[digit]) {
            // 첫 번째 숫자이거나 부등호 조건을 만족하는 경우
            if (numberCount === 0 || 
                (inequality[numberCount - 1] === '<' && currentNumber[numberCount - 1] < digit.toString()) ||
                (inequality[numberCount - 1] === '>' && currentNumber[numberCount - 1] > digit.toString())) {
                
                visited[digit] = true;
                backtrack(currentNumber + digit, numberCount + 1);
                visited[digit] = false;
            }
        }
    }
}

for (let startDigit = 0; startDigit < 10; startDigit++) {
    visited[startDigit] = true;
    backtrack(startDigit.toString(), 1);
    visited[startDigit] = false;
}

// 문자열 그대로 출력 (앞의 0 유지)
console.log(max);
console.log(min);
