import { getData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'
import { Ref, onMounted, ref } from 'vue'

export default {
  props: {},
  setup() {
    const dressCodes: Ref<Array<any>> = ref([])

    onMounted(async () => {
      const response = await getData('Dress Codes')

      const parsedDressCodes = tableToJson(response.table.cols, response.table.rows)

      dressCodes.value = parsedDressCodes
    })

    const computeImageLink = (val: string) => {
      return `https://lh3.googleusercontent.com/d/${val.split('/')[5]}=w300`
    }

    return {
      dressCodes,
      computeImageLink
    }
  }
}
