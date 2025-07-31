// 브루트포스 - 스타트와 링크
// https://www.acmicpc.net/problem/14889
// 축구를 하기위해 모인 사람은 총 N명(짝수)
// N/2명으로 이루어진 스타트팀과 링크팀으로 나눈다.
// Sij는 i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치이다.
// 팀의 능력치는 팀에 속한 모든 쌍의 능력치 Sij의 합이다. 
// Sij는 Sji와 다를 수도 있으며, i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치는 Sij와 Sji이다.
// 축구를 재미있게 하기 위해서 스타트 팀의 능력치와 링크 팀의 능력치의 차이를 최소로 하려고 한다. 

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs
.readFileSync(filePath)
.toString()
.trim()
.split("\n");

const n = parseInt(input[0]);  // 첫번째줄: 선수 수 N 
const abilities = [];   // 능력치 2차원 배열 생성

// input[1]부터 input[n]까지 능력치 데이터 배열에 추가
for (let i = 1; i <= n; i++) {
  abilities.push(input[i].split(' ').map(Number));
}

// 최솟값 minDiff
let minDiff = Infinity;

/// 1. 조합 생성 함수
// N명중 selectNumber명을 선택하는 모든 조합을 생성하는 재귀함수
function getCombinations(arr, selectNumber) {
  const results = [];  // 모든 조합 배열

  // 기저 조건 - 1명만 선택하면 각 원소를 단일 배열로 반환
  //
  if (selectNumber === 1) {
    return arr.map(value => [value]);
  }

  // 배열의 각 원소를 첫번째 원소로 고정하고 나머지에서 조합 생성
  // fixed: 고정한 원소, origin: arr 원본 배열
  arr.forEach((fixed, index, origin) => {
    // 현재 원소 이후의 원소들만 선택 (중복 방지)
    const rest = origin.slice(index+1);

    // 나머지 원소들에서 (selectNumber -1)개를 선택하는 조합 재귀 호출
    const combinations = getCombinations(rest,selectNumber - 1);

    // 고정된 원소와 나머지 조합을 합침
    const attachedCombi = combinations.map(combination => [fixed, ...combination]);

    results.push(...attachedCombi);
  })
  return results;
}

/// 2. 모든 가능한 팀 조합 탐색
const players = Array.from({length: n}, (_, i) => i);  // 선수들을 인덱싱

// N명 중 N/2명을 선택하는 조합 생성
// 스타트팀 조합
const startTeamCombi = getCombinations(players, n/2);

startTeamCombi.forEach(startTeam => {
  const linkTeam = players.filter(player => !startTeam.includes(player))  // 링크팀은 스타트팀에 속하지 않은 나머지 선수들

  // 각 팀의 능력치 계산
  let startAbility = 0;
  for (let i = 0; i < startTeam.length; i++) {
    for (let j = 0; j < startTeam.length; j++) {
      if (i !== j) {
        // 능력치 Sij
        startAbility += abilities[startTeam[i]][startTeam[j]];
      }
    }
  }

  let linkAbility = 0;
  for (let i = 0; i < linkTeam.length; i++) {
    for (let j = 0; j < linkTeam.length; j++) {
      if (i !== j) {
        // 능력치 Sij
        linkAbility += abilities[linkTeam[i]][linkTeam[j]];
      }
    }
  }

  // 두팀의 능력치 차이
  minDiff = Math.min(minDiff, Math.abs(startAbility - linkAbility));  // 현재 최솟값보다 더 작으면 갱신
});

console.log(minDiff);
