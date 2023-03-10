//模块化封装
import React from "react"
import LoginStore from './login.Store'
import UserStore from './user.Store'
import ChannelStore from './channel.Store'
 
class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}
// 导入useStore方法供组件使用数据（模板）
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)