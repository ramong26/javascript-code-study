/*
연도 진행바(https://www.acmicpc.net/problem/1340)
문제
문빙이는 새해를 좋아한다. 하지만, 이제 새해는 너무 많이 남았다. 그래도 문빙이는 새해를 기다릴 것이다.

어느 날 문빙이는 잠에서 깨면서 스스로에게 물었다. “잠깐, 새해가 얼마나 남은거지?”

이 문제에 답하기 위해서 문빙이는 간단한 어플리케이션을 만들기로 했다. 연도 진행바라는 것인데, 이번 해가 얼마나 지났는지를 보여주는 것이다.

오늘 날짜가 주어진다. 이번 해가 몇%지났는지 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 Month DD, YYYY HH:MM과 같이 주어진다. Month는 현재 월이고, YYYY는 현재 연도이다. 숫자 네자리이다. DD, HH, MM은 모두 2자리 숫자이고, 현재 일, 시, 분이다.

Month는 January, February, March, April, May, June, July, August, September, October, November, December 중의 하나이고, 연도는 1800보다 크거나 같고, 2600보다 작거나 같다. 항상 올바른 날짜와 시간만 입력으로 주어진다.
*/

function solution(input) {
  const parts = input.trim().split(' ')
  const monthName = parts[0];        // Month
  const day = parseInt(parts[1]);    // DD
  const year = parseInt(parts[2]);   // YYYY
  const [hour, minute] = parts[3].split(':').map(Number); // HH:MM (시,분)

  const monthMap = {
    'January': 1, 'February': 2, 'March': 3,
    'April': 4, 'May': 5, 'June': 6,
    'July': 7, 'August': 8, 'September': 9,
    'October': 10, 'November': 11, 'December': 12
  };

  const month = monthMap[monthName]; 

  // 윤년 판별 함수
  const isLeapYear = (y) => {
    //400으로 나누어떨어지면 윤년
    if (y % 400 === 0) return true;
    // 100으로 나누어떨어지면 평년
    if (y % 100 === 0) return false;
    // 4로 나누어떨어지면 윤년
    if (y % 4 === 0) return true;
    // 그외는 평년
    return false;
  };

  // 각 달의 일수
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 윤년이면 2월을 29일로 수정
  if (isLeapYear(year)) {
    daysInMonth[2] = 29;
  }

  // 지나간 시간 계산 (분단위)
  let elapsedMinutes = 0;

  // 1. 지나간 달 더하기
  for (let m = 1; m < month; m++) {
    elapsedMinutes += daysInMonth[m - 1] * 24 * 60;
  }

  // 2. 현재달의 지나간 일 더하기
  elapsedMinutes += (day - 1) * 24 * 60;

  // 3. 오늘의 지나간 시간 더하기
  elapsedMinutes += hour * 60;

  // 4. 남은 분
  elapsedMinutes += minute;

  const totalDays = isLeapYear(year) ? 366 : 365;
  const totalMinutes = totalDays * 24 *  60;

  const percentage = (elapsedMinutes / totalMinutes) * 100;

  return percentage;
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));