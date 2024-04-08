import axios from 'axios'
import { CRUD } from '@/enums'

export const getData = async (tabName: string) => {
  try {
    const { data } = await axios.get(
      `https://docs.google.com/spreadsheets/d/1ht974dV3UqR0pcAfLlgQLTeVznvTNb6ZbrXWbHGuu5M/gviz/tq?tqx=out:json&sheet=${tabName}&headers=1`
    )

    return JSON.parse(data.substring(47).slice(0, -2))
  } catch (error) {
    throw error
  }
}

export const updateData = async (crud: CRUD, sheet: string, data: Record<string, any>) => {
  try {
    const body = {
      crud,
      sheet,
      ...data
    }

    const response = await axios.post(
      `https://script.google.com/macros/s/AKfycbx7jT5HlbPMLuwEH9UuVAmOzXhzTeTwaYv4UovcejqKJQOi2GQ5Rcmk9oTWjR7pMU0J6A/exec`,
      JSON.stringify(body)
    )

    return response
  } catch (error) {
    throw error
  }
}
