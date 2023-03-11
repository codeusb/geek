import {Routes,Route} from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import {AuthRoute} from '@/components/AuthRoute'
import '@/App.scss'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import Other from './pages/Other'
import { HistoryRouter, history } from './utils/history'

function App() {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 首页一级路由 */}
          {/* layout需要鉴权处理 */}
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
    </HistoryRouter>
    
  );
}

export default App;
