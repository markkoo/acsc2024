import { getData, updateData } from '@/apis/spreadsheet'
import { tableToJson } from '@/utils/table-to-json'
import { Ref, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoImage from '@/assets/images/logo.png'
import { showError } from '@/utils/notify'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from 'vuex'
import { CRUD } from '@/enums'

export default {
  props: {},
  setup() {
    const store = useStore()
    const router = useRouter()
    const formState: Ref<Record<string, any>> = ref({
      member: null,
      pin: ''
    })
    const members: Ref<Array<Record<string, any>>> = ref([])
    const isLoading: Ref<boolean> = ref(false)

    const getMembers = async () => {
      try {
        const response = await getData('Members')

        const parsedMembers = tableToJson(response.table.cols, response.table.rows)

        members.value = parsedMembers
      } catch (error) {
        throw error
      }
    }

    onMounted(async () => {
      isLoading.value = true

      try {
        await getMembers()

        isLoading.value = false
      } catch (error) {
        isLoading.value = false
        throw error
      }
    })

    const saveAuthData = async (row: number, user: Record<string, any>) => {
      try {
        const token = uuidv4()

        await store.dispatch('postLogin', {
          user,
          token
        })
        await updateData(CRUD.update, 'Members', {
          coor: `H${row}`,
          value: token
        })
      } catch (error) {
        throw error
      }
    }

    const onSubmit = async () => {
      isLoading.value = true

      try {
        await getMembers()

        const currentSelectedUser = members.value.filter(
          (e: any) => e.Name === formState.value.member
        )

        if (currentSelectedUser.length > 0 && currentSelectedUser[0].Pin === formState.value.pin) {
          await saveAuthData(
            members.value.indexOf(currentSelectedUser[0]) + 2,
            currentSelectedUser[0]
          )

          isLoading.value = false
          router.push({ name: 'programme-list', params: { member: formState.value.member } })
        } else {
          showError({
            title: 'User PIN verification error',
            description: 'Please confirm your PIN code and try again.'
          })
          isLoading.value = false
        }
      } catch (error) {
        showError({
          title: 'User PIN verification error',
          description: 'Please confirm your PIN code and try again.'
        })
        isLoading.value = false

        throw error
      }
    }

    const dm = (number: string) => {
      return `https://wa.me/${number}`
    }

    return {
      formState,
      members,
      onSubmit,
      LogoImage,
      dm,
      isLoading
    }
  }
}
