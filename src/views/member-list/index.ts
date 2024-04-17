import { Ref, computed, onMounted, ref } from 'vue'
import { getData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'

export default {
  props: {},
  setup() {
    const members: Ref<Array<Record<string, any>>> = ref([])
    const memberOptions: Ref<Array<Record<string, any>>> = ref([])

    onMounted(async () => {
      const res = await Promise.all([
        getData('Members'),
        getData('MemberVSProgramme'),
        getData('Programmes')
      ])

      const memberResponse = res[0]
      const memberProgrammesResponse = res[1]
      const programmesResponse = res[2]

      const parsedMembers = tableToJson(memberResponse.table.cols, memberResponse.table.rows)
      const parsedMemberProgrammes = tableToJson(
        memberProgrammesResponse.table.cols,
        memberProgrammesResponse.table.rows
      )
      const parsedProgrammes = tableToJson(
        programmesResponse.table.cols,
        programmesResponse.table.rows
      )

      const temp = parsedMembers.map((e) => ({
        ...e,
        joined_programmes: parsedMemberProgrammes
          .map((e) => ({
            ...e,
            Programe: parsedProgrammes[parsedMemberProgrammes.indexOf(e)].Programe,
            Day: parsedProgrammes[parsedMemberProgrammes.indexOf(e)].Day,
            'Start Date': parsedProgrammes[parsedMemberProgrammes.indexOf(e)]['Start Date'],
            'End Date': parsedProgrammes[parsedMemberProgrammes.indexOf(e)]['End Date'],
            'Start Time': parsedProgrammes[parsedMemberProgrammes.indexOf(e)]['Start Time'],
            'End Time': parsedProgrammes[parsedMemberProgrammes.indexOf(e)]['End Time']
          }))
          .filter((x: any) => x[e.Name] === 'TRUE')
          .map((e) => ({
            Programe: e.Programe,
            Day: e.Day,
            'Start Date': e['Start Date'],
            'End Date': e['End Date'],
            'Start Time': e['Start Time'],
            'End Time': e['End Time']
          }))
      }))

      members.value = []

      for (const x of temp) {
        for (const y of x.joined_programmes) {
          const json: Record<string, any> = {
            ...x,
            ...y
          }

          delete json.joined_programmes

          members.value.push(json)
        }
      }

      memberOptions.value = parsedMembers

      console.log(members.value)
    })

    const computedMembers = computed(() => {
      return members.value.filter(
        (e) =>
          e.Name.includes(searchState.value.member ?? '') &&
          e.Angel.includes(searchState.value.angel ?? '')
      )
    })

    const searchState: Ref<Record<string, any>> = ref({
      member: null,
      angel: null
    })

    return {
      memberOptions,
      computedMembers,
      searchState
    }
  }
}
