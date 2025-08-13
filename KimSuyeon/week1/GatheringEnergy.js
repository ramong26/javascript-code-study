// 실행 : node ./KimSuyeon/week1/GatheringEnergy.js

const fs = require("fs");
const input = fs.readFileSync("./KimSuyeon/week1/input1.txt", "utf-8").trim().split("\n");   
const beads = input[1].split(" ").map(Number);

let maxEnergy = 0;

function dfs(arr, energy) {
   // 종료 조건: 최소 3개는 있어야 삭제할 수 있기 때문에 배열이 2개가 되면 종료
   if(arr.length === 2){
     maxEnergy = Math.max(maxEnergy, energy);
     return maxEnergy;
   }
   // 현재 배열 상태 출력: 처음과 마지막은 제외해야하니 i=1, i<arr.length-1 조건 
   for(let i = 1; i < arr.length - 1; i++){
     const deleteEnergy = arr[i-1] * arr[i+1]; // 삭제할 때의 에너지 계산: 각 양쪽 배열을 곱함
     const newArr = arr.slice(0, i).concat(arr.slice(i + 1)); // 새로운 배열 생성: 삭제할 원소를 제외한 나머지
     dfs(newArr, energy + deleteEnergy);
   }
}

dfs(beads, 0);
console.log(maxEnergy);