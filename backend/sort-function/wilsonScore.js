// calculate the lower bound confidence level of a comment
export function wilsonScore(upVotes, downVotes) {
  const n = upVotes + downVotes;
  if (n === 0) return 0;
  const z = 1.96;
  const phat = upVotes / n;
  const score =
    (phat +
      (z * z) / (2 * n) -
      z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) /
    (1 + (z * z) / n);
  return score;
}
