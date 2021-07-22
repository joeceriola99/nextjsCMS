export default function numberFormatter(x = 0, fixed = 2) {
  return Number(x).toFixed(fixed);
}
