export const preventDefault = (e) => {
  if (e && e.preventDefault) {
    e.preventDefault()
  }
}
