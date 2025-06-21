// 문제 링크: [단어 변환](https://school.programmers.co.kr/learn/courses/30/lessons/43163)

// 실행: node jincheol/week6/personal-DFS_BFS.js

function solution1(begin, target, words) {
  const changedWord = []; // 변환한 단어를 저장할 배열
  const queue = [[begin, 0]]; // 변환할 단어를 저장할 큐 [단어, 변환 횟수]

  // 단어를 1글자만 바꿔서 변환할 수 있는지 확인하는 함수
  const check = (before, after) => {
    let count = 0; // 다른 글자를 체크할 카운트
    const len = after.length; // 글자 수는 같아서 아무거나 상관 x

    // 단어 길이만큼 순회
    for (let i = 0; i < len; i++) {
      // 단어의 글자가 다르면 count++
      if (before[i] !== after[i]) count++;
    }

    if (count === 1) return true; // count가 1이면 1글자만 바뀐 것이라 true

    return false; // 아니면 false
  };

  // 변환할 단어가 남아있을 경우
  while (queue.length) {
    const [before, count] = queue.shift(); // 큐에서 단어와 count를 추출

    if (before === target) return count; // 단어가 target이면 count를 바로 return

    // 단어들을 순회
    words.forEach((after) => {
      if (changedWord.includes(after)) return; // 변환된 단어에 포함되어 있으면 return(건너뜀)

      const canChange = check(before, after); // 단어를 변환할 수 있는지 확인
      if (canChange) {
        queue.push([after, count + 1]); // 큐에 단어와 카운트 추가
        changedWord.push(after); // 변환한 단어 배열에 추가
      }
    });
  }

  return 0; // while문으로 count를 return하지 않으면 변환이 불가능이기에 0 return
}

function solution2(begin, target, words) {
  if (!words.includes(target)) return 0; // 만약 words에 target이 없으면 0 return

  const queue = [[begin, 0]]; // BFS를 위한 큐, [단어, 변환 횟수]
  const changedWord = new Set(); // 변환된 단어들 저장 (시간 복잡도를 줄이기 위해 배열대신 Set 사용)
  changedWord.add(begin); // 첫 단어 추가

  // 단어를 1글자만 바꿔서 변환할 수 있는지 확인하는 함수
  const check = (before, after) => {
    let count = 0;
    const len = after.length;

    for (let i = 0; i < len; i++) {
      if (before[i] !== after[i]) count++;
    }

    if (count === 1) return true;

    return false;
  };

  // 큐에 단어가 있을 때
  while (queue.length) {
    const [before, count] = queue.shift(); // 큐에서 단어와 카운트 추출

    if (before === target) return count; // 단어가 target이면 count를 바로 return

    // words를 순회
    words.forEach((after) => {
      // 변환이 가능한지 확인, 변환했던 단어인지 확인
      const canChange = check(before, after) && !changedWord.has(after);
      if (canChange) {
        queue.push([after, count + 1]); // 큐에 단어와 카운트 추가
        changedWord.add(after); // 변환한 단어에 단어 추가
      }
    });
  }

  return 0; // while문으로 count를 return하지 않으면 변환이 불가능이기에 0 return
}
