const getters = {
  cookieName: state => `${state.projectName}-token`,
  is_login: state => state.user_info !== null,
  is_mobile: state => state.user_info && state.user_info.mobile,
  is_email: state =>
    state.user_info &&
    state.user_info.user_email &&
    state.user_info.user_email.is_avaiable,
  is_github: state => state.user_info && state.user_info.github_user,
  getName: state => type => {
    return state.setting.length > 0
      ? state.setting.find(i => i.code === type)
        ? state.setting.find(i => i.code === type).value
        : `{{${type}}}`
      : `{{${type}}}`
  },
  getList: state => type => {
    return state.setting.length > 0
      ? state.setting.filter(i => i.code === type).map(item => item.value)
      : []
  }
}
export default getters
