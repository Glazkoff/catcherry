export default function(choice, choicesLength) {
  if (Math.abs(choice) === 0) {
    return 0;
  }

  const teen =
    (Math.abs(choice) > 10 && Math.abs(choice) < 20) ||
    (Math.abs(choice) % 100 > 10 && Math.abs(choice) % 100 < 20);
  const endsWithOne = Math.abs(choice) % 10 === 1;

  if (Math.abs(choicesLength) < 4) {
    return !teen && endsWithOne ? 1 : 2;
  }
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && Math.abs(choice) % 10 >= 2 && Math.abs(choice) % 10 <= 4) {
    return 2;
  }

  return Math.abs(choicesLength) < 4 ? 2 : 3;
}
