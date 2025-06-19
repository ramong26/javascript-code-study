//삼각형을 위에서부터 아래방향으로 모든 경우의 수를 탐색하여 조합들중 최고의 합을 찾아내는 방식으로 풀이했습니다.

function triangle(number) {
  const height = number.length;
  let maxSum = 0;

  function dfs(row, idx, sum) {
    if (row === height) {
      //row가 height와 같아져 맨 아래에 도달했을때 종료
      if (sum > maxSum) {
        // 합이 maxSum보다 클 경우 그 합을 maxSum에 저장
        maxSum = sum;
      }
      return;
    }

    dfs(row + 1, idx, sum + number[row][idx]); //원래 위치에서 왼쪽 아래를 더하는 경우
    dfs(row + 1, idx + 1, sum + number[row][idx]); // 원래 위치에서 오른쪽 아래를 더하는 경우
  }

  dfs(0, 0, 0); // 꼭대기부터 시작
  return maxSum;
}

console.log(triangle([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]));
