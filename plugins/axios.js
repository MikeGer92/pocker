import { Message } from 'element-ui'

export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response.status === 402) {
      Message.error('Please activate full version')
      store.dispatch('user/changePaymentPopupState', true)
    } else {
      Message.error(error.response.data.error || error.message)
    }
  })
}
