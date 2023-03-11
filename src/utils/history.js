//工具模块——token失效跳转回登录页面（非组件环境使用路由）
// https://github.com/remix-run/react-router/issues/8264
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}