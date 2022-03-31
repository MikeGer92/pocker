import Vue from 'vue'
import en from '~/langs/en.json'
import ru from '~/langs/ru.json'
import es from '~/langs/es.json'
import cn from '~/langs/cn.json'

const locales = {
  'ru-RU': ru,
  'en-US': en,
  'zh-CN': cn,
  'es-ES': es
}

export default ({ store }) => {
  Vue.filter('localize', function (key) {
    const locale = store.state.auth.user ? store.state.auth.user.language : 'en-US'
    return locales[locale][key] ? locales[locale][key] : locales['en-US'][key]
  })
}
