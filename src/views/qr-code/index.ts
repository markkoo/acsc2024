import { getData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'
import { Ref, onMounted, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

export default {
  props: {},
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute()
    const member: Ref<Record<string, any> | null> = ref(null)
    const link: Ref<any> = ref(null)

    onMounted(async () => {
      const response = await getData('Members')

      const parsedMembers = tableToJson(response.table.cols, response.table.rows)

      member.value = parsedMembers.filter((e: any) => e.Name == route.params.member)[0]

      link.value = `https://lh3.googleusercontent.com/d/${member.value.Link.split('/')[5]}=w300`
    })

    return {
      link
    }
  }
}
