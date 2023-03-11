//子模块——用户信息逻辑（对应layout页面）
import { makeAutoObservable } from "mobx"
import { http} from '@/utils'

class UserStore{
  //1.定义数据
  userInfo = {}
  //2.响应式
  constructor(){
    makeAutoObservable(this)
  }
  //3.数据修改方法
  getUserInfo = async ()=>{
    //调用接口获取数据（用户信息）
    const res = await http.get('/user/profile')
    this.userInfo = res.data
    //console.log(this.userInfo.name);
  }
}

export default UserStore