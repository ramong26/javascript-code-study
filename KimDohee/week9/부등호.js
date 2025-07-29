// 브루트포스(순열) - 부등호
// 링크: https://www.acmicpc.net/problem/2529

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
