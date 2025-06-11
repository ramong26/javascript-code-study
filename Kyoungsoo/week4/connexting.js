function connexting(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);

  const groups = Array.from({ length: n }, (_, i) => i);

  const find = (node) => groups[node];

  const union = (a, b) => {
    const groupA = find(a);
    const groupB = find(b);

    if (groupA === groupB) return false;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i] === groupB) groups[i] = groupA;
    }

    return true;
  };

  let totalCost = 0;
  for (const [a, b, cost] of costs) {
    if (union(a, b)) {
      totalCost += cost;
    }
  }

  return totalCost;
}

console.log(
  connexting(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
