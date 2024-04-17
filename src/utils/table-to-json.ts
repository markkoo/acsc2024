import { stringToUnicode } from './string-to-unicode'

export const tableToJson = (
  cols: Array<Record<string, any>>,
  rows: Array<Record<string, Array<any>>>
) => {
  const response = []

  for (const x of rows) {
    const data: Record<string, any> = {
      id: rows.indexOf(x)
    }

    for (let y = 0; y < x.c.length; y++) {
      // const keyText = `${cols[y].id}${rows.indexOf(x)}`

      const key = cols[y].label
      const value = x.c[y]?.f ?? x.c[y]?.v

      if (key != '') {
        data[key] = value
      }
    }

    response.push(data)
  }

  return response
}
