// 프로그래머스의 완주하지 못한 선수 입니다.
// https://school.programmers.co.kr/learn/courses/30/lessons/42576

function solution(participant, completion) {
  // 동명이인을 방지하기 위해 index로 구분분
  participant.sort();
  completion.sort();

  // participant와 completion을 비교해서 다른 index를 찾기기
  for (let i = 0; i < completion.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i]; // 다르면 이 사람이 미완주자
    }
  }

  // 3. 끝까지 같았으면 마지막 참가자가 미완주자
  return participant[participant.length - 1];
}

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"]));
console.log(
  solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"])
);
