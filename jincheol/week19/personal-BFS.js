// 문제 링크: [적록색약](https://www.acmicpc.net/problem/10026)

// 실행: node jincheol/week19/personal-BFS.js

const fs = require('fs');
const input = fs
  // .readFileSync('/dev/stdin')
  .readFileSync('./jincheol/week19/input4.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 일반적인 그림과 적록색약이 보는 그림 2가지 경우로 탐색
 * @param {number} N 그림의 크기
 * @param {string[][]} picture 그림의 배열
 */
const solution = (N, picture) => {
  /**
   * 그림의 구역을 BFS를 사용하여 확인하는 함수
   * @param {string[][]} picture 구역을 확인할 그림
   * @returns {number} 구역의 수
   */
  const countArea = (picture) => {
    // 영역의 방문 여부를 확인할 배열
    const visited = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => false)
    );

    // 편의를 위해 상하좌우 이동
    const move = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    let areaCount = 0; // 그림의 영역 개수

    // 그림의 모든 영역을 순회
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (visited[row][col]) continue; // 방문한 영역이면 건너뛰기

        areaCount++; // 영역 개수 ++ (아래 BFS 탐색을 통해 전까지의 영역과 연결된 곳은 다 탐색했으니 새로운 영역임)
        const curColor = picture[row][col]; // 현재 영역의 색
        const queue = [[row, col]]; // BFS를 위한 큐
        visited[row][col] = true; // 방문 처리
        let curIndex = 0; // shift나 pop 연산을 하지 않고 index로 큐에 접근

        // BFS 탐색
        while (curIndex < queue.length) {
          const [curRow, curCol] = queue[curIndex]; // 탐색하는 영역 추출
          curIndex++; // index++ (shift 연산 대신)

          // 이동 할 영역 탐색
          for (const [moveRow, moveCol] of move) {
            const nextRow = curRow + moveRow; // 이동 할 다음 row index
            const nextCol = curCol + moveCol; // 이동 할 다음 col index
            // 이동할 다음 영역이 그림을 벗어나는지 확인
            if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= N)
              continue;
            // 이동할 다음 영역이 방문한 영역인지 확인
            if (visited[nextRow][nextCol]) continue;
            // 이동할 다음 영역이 현재 색과 다른지 확인(같은 영역인지 확인)
            if (picture[nextRow][nextCol] !== curColor) continue;
            // 같은 색(영역)일 경우
            visited[nextRow][nextCol] = true; // 방문처리
            queue.push([nextRow, nextCol]); // 큐에 다음 영역 추가
          }
        }
      }
    }

    return areaCount; // 그림의 영역 개수 return
  };

  // 적록색약이 보는 그림으로 변환 (새로운 배열)
  const rgChangedPicture = picture.map((row) =>
    row.map((color) => (color === 'G' ? 'R' : color))
  );
  const normalAreaCount = countArea(picture); // 일반 영역 개수 확인
  const rgChangedAreaCount = countArea(rgChangedPicture); // 적록색약 영역 개수 확인

  return `${normalAreaCount} ${rgChangedAreaCount}`; // 변환하여 정답 return
};

const N = parseInt(input.shift());
const picture = input.map((v) => v.trim().split(''));
console.log(solution(N, picture));
