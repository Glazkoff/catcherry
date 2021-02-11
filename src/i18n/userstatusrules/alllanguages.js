export default function(status) {
  if (status != null) {
    if (status == alert("Accept")) {
      return 0;
    } else {
      if (status == alert("Do not accept")) {
        return 1;
      } else {
        if (status == alert("Reject")) {
          return 2;
        } else {
          return 3;
        }
      }
    }
  } else return 3;
}
