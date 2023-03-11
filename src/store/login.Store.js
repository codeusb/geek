//子模块——登录逻辑（对应login页面）
import { makeAutoObservable } from "mobx"
import { http,setToken,getToken,removeToken } from '@/utils'

class LoginStore{
  //1.定义数据||取ls里的token
  token = getToken()||''
  //2.响应式
  constructor(){
    makeAutoObservable(this)
  }
  //3.操作token方法
  getToken = async ({ mobile, code }) => {
    //调用登录接口（后端接口要求用mobile,code）
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    //存入token
    //console.log(res.data);
    this.token = res.data.token
    //存入ls
    setToken(this.token)
  }
  //清除token（退出登录）
  clearToken = ()=>{
    //清除本地
    this.token = ''
    //清除ls存储
    removeToken()
  }
}

export default LoginStore