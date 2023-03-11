//组件——路由鉴权组件
//1.判断token是否存在
//2.存在——正常渲染，不存在——重定向登录路由

//高阶组件：把一个组件当作另一个组件的参数传入
//然后通过一定判断，返回新组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute({ children }){
  //如果token存在（合法用户登录）
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    // Navigate重定向组件
    return <Navigate to="/login" replace />
  }
}

// <AuthRoute> <Layout/> </AuthRoute>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

export {AuthRoute}