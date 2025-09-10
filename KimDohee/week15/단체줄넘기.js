/**
 * 그리디 알고리즘 - 단체줄넘기 (https://www.acmicpc.net/problem/30457)
 * N명의 학생들이 단체줄넘기를 하려고 한다. 단체줄넘기를 하기 위해서는 한 줄로 나란히 서야 하고, 학생들은 각자 줄을 잡은 양쪽 방향 중 한 곳을 바라보고 서야 한다.

학생들은 각자 바라보는 방향에 자신보다 키가 크거나 같은 사람이 있다면 점프할 타이밍을 놓쳐 줄에 걸릴 수 있다. 학생들은 최대한 많이 단체줄넘기를 뛰고 싶어 하기 때문에, 줄에 걸릴 수 있는 상황을 만들지 않으려고 한다. 즉 자신이 바라보는 방향에 자신보다 키가 작은 학생들만 앞에 오도록 줄을 서려고 한다.

학생들의 키를 알고 있을 때, 이 중 최대 몇 명의 학생이 단체줄넘기에 참여할 수 있을까? 줄을 돌리는 사람은 주어진 학생에 포함되지 않는다.
 */

function solution(input) {
  const lines = input.trim().split('\n')
  const N = parseInt(lines[0]);
  const heights = lines[1].split(' ').map(Number);

  // 키 순서대로 정렬
  heights.sort((a, b) => a - b);

  // 같은 키를 가진 학생수를 카운트
  const heightCount = new Map();
  heights.forEach(height => {
      heightCount.set(height, (heightCount.get(height) || 0) + 1);
  });
  
  // 각 키 그룹에서 최대 2명까지 선택
  let maxParticipants = 0;
  heightCount.forEach(count => {
      maxParticipants += Math.min(count, 2);
  });
  
  return maxParticipants;

  return N;
}

// 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString();

console.log(solution(input));
