import {Routes,Route} from 'react-router-dom'
// import Login from '@/pages/Login'
// import Layout from '@/pages/Layout'
import {AuthRoute} from '@/components/AuthRoute'
import '@/App.scss'
// import Home from './pages/Home'
// import Article from './pages/Article'
// import Publish from './pages/Publish'
// import Other from './pages/Other'
import { HistoryRouter, history } from './utils/history'
import { Spin } from 'antd';
// 导入懒加载组件
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))
const Other = lazy(() => import('./pages/Other'))

function App() {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div className="loading">
            <Spin size="large" /><br/>
            <p>loading...</p>
          </div>
        }
      >
      <div className="App">
        <Routes>
          {/* 首页一级路由 */}
          {/* <Layout/>需要路由鉴权 */}
          <Route path='/' element={<AuthRoute><Layout/></AuthRoute>}>
            <Route index element={<Home/>}></Route>
            <Route path='article' element={<Article/>}></Route>
            <Route path='publish' element={<Publish/>}></Route>
            <Route path='other' element={<Other/>}></Route>
          </Route>
          {/* 登录一级路由 */}
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
      </Suspense>
    </HistoryRouter>
  );
}

export default App;
