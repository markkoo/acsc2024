export const stringToUnicode = (s: string) => {
  return s
    .split('')
    .map((c) => {
      if (c.match(/[^\w\d\s]/g)) {
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16).toUpperCase()).slice(-4)
      }

      return c
    })
    .join('')
    .replace(/\\/g, '')
}
