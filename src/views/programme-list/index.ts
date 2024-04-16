import { Ref, computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { getData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export default {
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const programmes: Ref<Array<Record<string, any>>> = ref([])

    const computeCardBackground = (item: Record<string, any>) => {
      let startDate = dayjs(item['Start Date'].split('-').reverse().join('-'))
      startDate = startDate.set(
        'hour',
        parseInt(item['Start Time'].replace(/[^\d]{1,}$/g, '').split('.')[0]) +
          parseInt(item['Start Time'].includes('PM') ? `12` : `0`)
      )
      startDate = startDate.set(
        'minute',
        item['Start Time'].replace(/[^\d]{1,}$/g, '').split('.')[1]
      )

      let endDate = dayjs(item['End Date'].split('-').reverse().join('-'))
      endDate = endDate.set(
        'hour',
        parseInt(item['End Time'].replace(/[^\d]{1,}$/g, '').split('.')[0]) +
          parseInt(item['End Time'].includes('PM') ? `12` : `0`)
      )
      endDate = endDate.set('minute', item['End Time'].replace(/[^\d]{1,}$/g, '').split('.')[1])

      if (startDate.isSameOrBefore(dayjs()) && endDate.isSameOrAfter(dayjs())) {
        // Ongoing event
        return 'background-color: #98fb98;'
      } else if (startDate.isBefore(dayjs()) && endDate.isBefore(dayjs())) {
        // Expired event
        return 'background-color: #d3d3d3; opacity: 0.5;'
      } else if (startDate.isAfter(dayjs()) && endDate.isAfter(dayjs())) {
        // Future event
        return 'background-color: white;'
      }

      return ''
    }

    const computeDateTime = (item: Record<string, any>) => {
      const start_date = item['Start Date']
      const end_date = item['End Date']
      const start_time = item['Start Time']
      const end_time = item['End Time']
      const day = item['Day']

      if (
        start_date != null &&
        end_date != null &&
        start_time != null &&
        end_time != null &&
        day != null
      ) {
        return `${start_time} ~ ${end_time} (Day ${day})`
      }

      return `Date time not well specified.`
    }

    const tagOptions: Ref<Array<Record<string, any>>> = ref([])

    onMounted(async () => {
      const res = await Promise.all([
        getData('Programmes'),
        getData('MemberVSProgramme'),
        getData('ProgrammesXTags')
      ])

      const programmeResponse = res[0]
      const memberResponse = res[1]
      const tagResponse = res[2]

      const parsedProgrammes = tableToJson(
        programmeResponse.table.cols,
        programmeResponse.table.rows
      )
      const parsedMembers = tableToJson(memberResponse.table.cols, memberResponse.table.rows)
      const parsedTags = tableToJson(tagResponse.table.cols, tagResponse.table.rows)

      programmes.value = parsedProgrammes.map((e: Record<string, any>) => ({
        ...e,
        tags: Object.entries(parsedTags.filter((t) => t.Programe == e.Programe)[0])
          .filter((x) => x[1] === 'TRUE')
          .map((e) => e[0]),
        isJoined:
          Object.entries(parsedMembers[parsedProgrammes.indexOf(e)]).filter(
            (e: any) => e[0] === route.params.member && e[1] === 'TRUE'
          ).length > 0,
        totalParticipants: Object.values(parsedMembers[parsedProgrammes.indexOf(e)]).filter(
          (e: any) => e === 'TRUE'
        ).length
      }))

      tagOptions.value = Object.keys(parsedTags[0])
        .filter((e) => e != 'id' && e != 'Programe')
        .map((e) => ({
          label: e,
          value: e
        }))
    })

    const totalPoints = computed(() => {
      const hpSumList = programmes.value.map(
        (e) => e.totalParticipants * parseInt(e['HeadPoint'] ?? '0')
      )
      const wpSumList = programmes.value.map((e) => parseInt(e.WinningPoint))
      const lopSumList = programmes.value.map((e) =>
        parseInt(e.totalParticipants > 0 ? e.LoPoint : 0)
      )

      const hpSum =
        hpSumList.length > 1
          ? hpSumList.reduce((a, b) => a + b)
          : hpSumList.length == 1
            ? hpSumList[0]
            : 0
      const wpSum =
        wpSumList.length > 1
          ? wpSumList.reduce((a, b) => a + b)
          : wpSumList.length == 1
            ? wpSumList[0]
            : 0
      const lopSum =
        lopSumList.length > 1
          ? lopSumList.reduce((a, b) => a + b)
          : lopSumList.length == 1
            ? lopSumList[0]
            : 0

      return hpSum + wpSum + lopSum
    })

    const logout = async () => {
      await store.dispatch('logout')

      router.push({
        name: 'index'
      })
    }

    const searchState = ref({
      keyword: '',
      filter: null
    })

    const computedProgrammes = computed(() => {
      return programmes.value.filter(
        (e) =>
          e.Programe.toLowerCase().includes(searchState.value.keyword.toLowerCase()) &&
          (searchState.value.filter != null ? e.tags.includes(searchState.value.filter) : true)
      )
    })

    return {
      programmes,
      dayjs,
      computeDateTime,
      computeCardBackground,
      totalPoints,
      logout,
      tagOptions,
      searchState,
      computedProgrammes
    }
  }
}
