import { getData, updateData } from '@/apis/spreadsheet'
import { CRUD } from '@/enums'
import { tableToJson } from '@/utils/table-to-json'
import { Ref, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export default {
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isLoading = ref(false)

    const programmeDetail: Ref<any> = ref(null)
    const currentMemberCol: Ref<any> = ref(null)

    const backToPreviousPage = () => {
      router.back()
    }

    const computedDateTime = computed(() => {
      if (programmeDetail.value == null) {
        return ''
      }

      const start_date = programmeDetail.value['start_date']
      const end_date = programmeDetail.value['end_date']
      const start_time = programmeDetail.value['start_time']
      const end_time = programmeDetail.value['end_time']
      const day = programmeDetail.value['day']

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
    })

    const getPageData = async () => {
      const res = await Promise.all([getData('Programmes'), getData('MemberVSProgramme')])

      const programmeResponse = res[0]
      const memberResponse = res[1]

      const parsedProgrammes = tableToJson(
        programmeResponse.table.cols,
        programmeResponse.table.rows
      )
      const parsedMembers = tableToJson(memberResponse.table.cols, memberResponse.table.rows)

      const data = parsedProgrammes
        .filter((e: any) => e.id == route.params.programmeId)
        .map((e: Record<string, any>) => ({
          ...e,
          participants: Object.entries(parsedMembers[parsedProgrammes.indexOf(e)]).filter(
            (e: any) => e[1] === 'TRUE'
          ),
          totalParticipants: Object.values(parsedMembers[parsedProgrammes.indexOf(e)]).filter(
            (e: any) => e === 'TRUE'
          ).length
        }))[0]

      programmeDetail.value = {}

      for (const x of Object.entries(data)) {
        const k = x[0].toLowerCase().replace(/\s/g, '_')
        const v = x[1]
        console.log(k)
        console.log(v)
        programmeDetail.value[k] = v
      }

      programmeDetail.value.joined =
        programmeDetail.value.participants.filter((e: any) => e[0] == route.params.member).length >
        0

      currentMemberCol.value = memberResponse.table.cols.filter(
        (e: any) => e.label == route.params.member
      )[0]
    }

    onMounted(() => {
      getPageData()
    })

    const toggleJoin = async (bool: boolean) => {
      isLoading.value = true

      try {
        const row = parseInt(`${route.params.programmeId}`) + 2
        const col = currentMemberCol.value.id
        await updateData(CRUD.update, 'MemberVSProgramme', {
          coor: `${col}${row}`,
          value: bool
        })
        await getPageData()
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
        throw error
      }
    }

    const hasExpired = computed(() => {
      if (programmeDetail.value != null) {
        let startDate = dayjs(programmeDetail.value['start_date'].split('-').reverse().join('-'))
        startDate = startDate.set(
          'hour',
          parseInt(programmeDetail.value['start_time'].replace(/[^\d]{1,}$/g, '').split('.')[0]) +
            parseInt(programmeDetail.value['start_time'].includes('PM') ? `12` : `0`)
        )
        startDate = startDate.set(
          'minute',
          programmeDetail.value['start_time'].replace(/[^\d]{1,}$/g, '').split('.')[1]
        )

        let endDate = dayjs(programmeDetail.value['end_date'].split('-').reverse().join('-'))
        endDate = endDate.set(
          'hour',
          parseInt(programmeDetail.value['end_time'].replace(/[^\d]{1,}$/g, '').split('.')[0]) +
            parseInt(programmeDetail.value['end_time'].includes('PM') ? `12` : `0`)
        )
        endDate = endDate.set(
          'minute',
          programmeDetail.value['end_time'].replace(/[^\d]{1,}$/g, '').split('.')[1]
        )

        if (startDate.isBefore(dayjs()) && endDate.isBefore(dayjs())) {
          // Expired event
          return true
        }
      }

      return false
    })

    return {
      backToPreviousPage,
      computedDateTime,
      programmeDetail,
      toggleJoin,
      isLoading,
      hasExpired
    }
  }
}
