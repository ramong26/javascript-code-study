function vowelDictionary(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  const weights = [781, 156, 31, 6, 1];

  let answer = 0;

  for (let i = 0; i < word.length; i++) {
    const idx = vowels.indexOf(word[i]);
    answer += idx * weights[i] + 1;
  }

  return answer;
}

console.log(vowelDictionary("AAAAE"));
console.log(vowelDictionary("AAAE"));
console.log(vowelDictionary("I"));
console.log(vowelDictionary("EIO"));
