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
 *
 * @param {number} N 그림의 크기
 * @param {string[][]} picture 그림의 배열
 */
const solution = (N, picture) => {
  /**
   *
   * @param {string[][]} picture 구역을 확인할 그림
   * @returns {number} 구역의 수
   */
  const countArea = (picture) => {
    const visited = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => false)
    );

    const move = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    let areaCount = 0;

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (visited[row][col]) continue;

        areaCount++;
        const curColor = picture[row][col];
        const queue = [[row, col]];
        visited[row][col] = true;
        let curIndex = 0;

        while (curIndex < queue.length) {
          const [curRow, curCol] = queue[curIndex];
          curIndex++;

          for (const [moveRow, moveCol] of move) {
            const nextRow = curRow + moveRow;
            const nextCol = curCol + moveCol;
            if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= N)
              continue;
            if (visited[nextRow][nextCol]) continue;
            if (picture[nextRow][nextCol] !== curColor) continue;

            visited[nextRow][nextCol] = true;
            queue.push([nextRow, nextCol]);
          }
        }
      }
    }

    return areaCount;
  };

  const rgChangedPicture = picture.map((row) =>
    row.map((color) => (color === 'G' ? 'R' : color))
  );
  const normalAreaCount = countArea(picture);
  const rgChangedAreaCount = countArea(rgChangedPicture);

  return `${normalAreaCount} ${rgChangedAreaCount}`;
};

const N = parseInt(input.shift());
const picture = input.map((v) => v.trim().split(''));
console.log(solution(N, picture));
