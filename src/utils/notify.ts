import { notification } from 'ant-design-vue'

export const showSuccess: (arg0: Record<string, any>) => void = ({ title, description }) => {
  notification.success({
    message: title,
    description: description,
    placement: `bottomRight`
  })
}

export const showInfo: (arg0: Record<string, any>) => void = ({ title, description }) => {
  notification.info({
    message: title,
    description: description,
    placement: `bottomRight`
  })
}

export const showWarning: (arg0: Record<string, any>) => void = ({ title, description }) => {
  notification.warning({
    message: title,
    description: description,
    placement: `bottomRight`
  })
}

export const showError: (arg0: Record<string, any>) => void = ({ title, description }) => {
  notification.error({
    message: title,
    description: description,
    placement: `bottomRight`
  })
}
