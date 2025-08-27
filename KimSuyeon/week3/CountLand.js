const fs = require("fs");

// 더 안전한 입력 처리
const input = fs
  .readFileSync("./input3.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const T = Number(input[0]);
let idx = 1;

// 뒤집기 함수
function flip(board, ops) {
  // 깊은 복사
  const b = board.map((row) => [...row]);

  for (const op of ops) {
    switch (op) {
      case 0: // 첫 번째 행
        for (let j = 0; j < 3; j++) {
          b[0][j] = b[0][j] === "H" ? "T" : "H";
        }
        break;
      case 1: // 두 번째 행
        for (let j = 0; j < 3; j++) {
          b[1][j] = b[1][j] === "H" ? "T" : "H";
        }
        break;
      case 2: // 세 번째 행
        for (let j = 0; j < 3; j++) {
          b[2][j] = b[2][j] === "H" ? "T" : "H";
        }
        break;
      case 3: // 첫 번째 열
        for (let i = 0; i < 3; i++) {
          b[i][0] = b[i][0] === "H" ? "T" : "H";
        }
        break;
      case 4: // 두 번째 열
        for (let i = 0; i < 3; i++) {
          b[i][1] = b[i][1] === "H" ? "T" : "H";
        }
        break;
      case 5: // 세 번째 열
        for (let i = 0; i < 3; i++) {
          b[i][2] = b[i][2] === "H" ? "T" : "H";
        }
        break;
      case 6: // 주대각선
        for (let i = 0; i < 3; i++) {
          b[i][i] = b[i][i] === "H" ? "T" : "H";
        }
        break;
      case 7: // 반대각선
        for (let i = 0; i < 3; i++) {
          b[i][2 - i] = b[i][2 - i] === "H" ? "T" : "H";
        }
        break;
    }
  }
  return b;
}

// 모두 같은 면인지 확인
function isAllSame(board) {
  const first = board[0][0];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] !== first) {
        return false;
      }
    }
  }
  return true;
}

// 테스트케이스 처리
for (let t = 0; t < T; t++) {
  // 입력 검증 추가
  if (idx + 2 >= input.length) {
    console.log(-1);
    continue;
  }

  const board = [];
  for (let i = 0; i < 3; i++) {
    const line = input[idx + i];
    if (!line) {
      console.log(-1);
      continue;
    }
    const row = line.split(" ");
    if (row.length !== 3) {
      console.log(-1);
      continue;
    }
    board.push(row);
  }
  idx += 3;

  let minOps = Infinity;

  // 8가지 연산의 모든 조합 (0~255)
  for (let mask = 0; mask < 256; mask++) {
    const ops = [];
    for (let i = 0; i < 8; i++) {
      if (mask & (1 << i)) {
        ops.push(i);
      }
    }

    try {
      const newBoard = flip(board, ops);
      if (isAllSame(newBoard)) {
        minOps = Math.min(minOps, ops.length);
      }
    } catch (error) {
      // 에러 발생 시 무시하고 계속
      continue;
    }
  }

  console.log(minOps === Infinity ? -1 : minOps);
}
