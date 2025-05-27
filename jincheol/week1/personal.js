// 문제 링크: [유연근무제](https://school.programmers.co.kr/learn/courses/30/lessons/388351?language=javascript)

// 문제 설명
// 프로그래머스 사이트를 운영하는 그렙에서는 재택근무와 함께 출근 희망 시각을 자유롭게 정하는 유연근무제를 시행하고 있습니다.
// 제도 정착을 위해 오늘부터 일주일 동안 각자 설정한 출근 희망 시각에 늦지 않고 출근한 직원들에게 상품을 주는 이벤트를 진행하려고 합니다.
// 직원들은 일주일동안 자신이 설정한 출근 희망 시각 + 10분까지 어플로 출근해야 합니다.
// 예를 들어 출근 희망 시각이 9시 58분인 직원은 10시 8분까지 출근해야 합니다. 단, 토요일, 일요일의 출근 시각은 이벤트에 영향을 끼치지 않습니다.
// 직원들은 매일 한 번씩만 어플로 출근하고, 모든 시각은 시에 100을 곱하고 분을 더한 정수로 표현됩니다. 예를 들어 10시 13분은 1013이 되고 9시 58분은 958이 됩니다.
// 당신은 직원들이 설정한 출근 희망 시각과 실제로 출근한 기록을 바탕으로 상품을 받을 직원이 몇 명인지 알고 싶습니다.
// 직원 n명이 설정한 출근 희망 시각을 담은 1차원 정수 배열 schedules, 직원들이 일주일 동안 출근한 시각을 담은 2차원 정수 배열 timelogs, 이벤트를 시작한 요일을 의미하는 정수 startday가 매개변수로 주어집니다.
// 이때 상품을 받을 직원의 수를 return 하도록 solution 함수를 완성해주세요.

// 실행: node jincheol/week1/personal.js

function solution(schedules, timelogs, startday) {
  let answer = 0;

  for (let i = 0; i < schedules.length; i++) {
    let fullSafe = true; // 일주일 동안 정한 시간 내에 출근했는지
    const targetTime = schedules[i]; // 출근 희망 시각
    const arrivalTimes = timelogs[i]; // 출근 시각
    const safeTime = getSafeTime(targetTime); // 출근 희망 시각 + 10분

    for (let j = 0; j < arrivalTimes.length; j++) {
      const isWeekend = [0, 6].includes((startday + j) % 7); // 주말인지 확인
      if (isWeekend) continue; // 주말이면 다음 날 확인

      const isLate = safeTime < arrivalTimes[j]; // 지각했는지 확인
      if (isLate) {
        fullSafe = false; // 지각했으면 이벤트 당첨 x
        break; // 다음 사람 확인
      }
    }

    if (fullSafe) answer++; // 시간 확인 후 정해진 시간 내에 모두 출근했으니 이벤트 당첨
  }

  return answer;
}

const getSafeTime = (targetTime) => {
  let result = 0;

  const hour = Math.floor(targetTime / 100);
  const minute = targetTime % 100;

  const hopeMinute = minute + 10;
  if (hopeMinute >= 60) {
    result = (hour + 1) * 100 + (hopeMinute - 60);
  } else {
    result = hour * 100 + hopeMinute;
  }

  return result;
};

const ex_schedules_one = [700, 800, 1100];
const ex_timelogs_one = [
  [710, 2359, 1050, 700, 650, 631, 659],
  [800, 801, 805, 800, 759, 810, 809],
  [1105, 1001, 1002, 600, 1059, 1001, 1100],
];
const ex_startday_one = 5;

const ex_schedules_two = [730, 855, 700, 720];
const ex_timelogs_two = [
  [710, 700, 650, 735, 700, 931, 912],
  [908, 901, 805, 815, 800, 831, 835],
  [705, 701, 702, 705, 710, 710, 711],
  [707, 731, 859, 913, 934, 931, 905],
];
const ex_startday_two = 1;

const ex_sol_one = solution(ex_schedules_one, ex_timelogs_one, ex_startday_one);
const ex_sol_two = solution(ex_schedules_two, ex_timelogs_two, ex_startday_two);
// 입출력 예시 결과값: 3, 2
console.log(ex_sol_one, ex_sol_two);
