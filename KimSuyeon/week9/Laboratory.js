// https://www.acmicpc.net/problem/14502
// 연구소 - 골드 5

// 입력을 한 줄씩 읽어와 배열로 저장
// const input = require('fs')
//   .readFileSync('input.txt', 'utf-8')
//   .trim()
//   .split('\n');
const input = require('fs')
  .readFileSync("./KimSuyeon/week9/input2.txt", "utf-8")
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);

// 바이러스가 퍼지지 않게 벽을 세워 안전 영역의 최대 크기를 구해야 함
// 바이러스와 빈 칸 지도를 만들어야 하고
// 벽 3개를 세우는 모든 조합을 탐색하면서 BFS로 바이러스를 퍼뜨리고 안전 영역 크기를 계산해야 함

// 지도 정보
const lab = input.slice(1).map((line) => line.split(' ').map(Number));

// 빈 칸 좌표 저장
const empty = [];
// 바이러스 좌표 저장
const virus = [];

// 빈 칸과 바이러스 위치 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (lab[i][j] === 0) empty.push([i, j]);
    if (lab[i][j] === 2) virus.push([i, j]);
  }
}

let maxSafe = 0; // 안전 영역 최댓값

// 벽 3개를 설치하는 모든 조합 탐색
for (let i = 0; i < empty.length - 2; i++) {
  for (let j = i + 1; j < empty.length - 1; j++) {
    for (let k = j + 1; k < empty.length; k++) {
      // 지도 복사
      const tempLab = lab.map((row) => row.slice());

      // 벽 세우기
      const [x1, y1] = empty[i];
      const [x2, y2] = empty[j];
      const [x3, y3] = empty[k];

      tempLab[x1][y1] = 1;
      tempLab[x2][y2] = 1;
      tempLab[x3][y3] = 1;

      // BFS로 바이러스 퍼뜨리기
      const queue = virus.map((v) => [...v]); // 초기 바이러스 위치
      const dx = [-1, 1, 0, 0];
      const dy = [0, 0, -1, 1];

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];

          // 지도 범위 확인
          if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
            // 빈 칸이면 바이러스 퍼지기
            if (tempLab[nx][ny] === 0) {
              tempLab[nx][ny] = 2;
              queue.push([nx, ny]);
            }
          }
        }
      }

      // 안전 영역 계산
      let safeCount = 0;
      for (let a = 0; a < N; a++) {
        for (let b = 0; b < M; b++) {
          if (tempLab[a][b] === 0) safeCount++;
        }
      }

      // 최댓값 갱신
      maxSafe = Math.max(maxSafe, safeCount);
    }
  }
}

// 결과 출력
console.log(maxSafe);

// input 예시
// 8 8
// 2 0 0 0 0 0 0 2
// 2 0 0 0 0 0 0 2
// 2 0 0 0 0 0 0 2
// 2 0 0 0 0 0 0 2
// 2 0 0 0 0 0 0 2
// 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 0 0
