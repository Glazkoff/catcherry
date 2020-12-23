export default function(choice) {
  if (Math.abs(choice) === 1) {
    return 0;
  }
  if (Math.abs(choice) === 0) {
    return 2;
  } else {
    return 1;
  }
}
