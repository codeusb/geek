//一级页面：基本布局
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {Outlet,useNavigate,useLocation} from 'react-router-dom'
import {useStore} from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {

  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {userStore,loginStore} = useStore()
  //副作用函数获取用户信息
  useEffect(()=>{
    userStore.getUserInfo()
  },[userStore])

  //确定退出
  const onConfirm = ()=>{
    //退出登录,删除token 跳回到登录
    loginStore.clearToken()
    navigate('/login')
  }
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm 
              onConfirm={onConfirm}
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // 高亮原理：defaultSelectedKeys===item.key
            // 思路：获取当前激活的path路径
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                  key: '/',
                  icon: <HomeOutlined />,
                  label: `数据概览`,
                  onClick:()=>{navigate('/')}
              },
              {
                  key: '/article',
                  icon: <DiffOutlined />,
                  label: '内容管理',
                  onClick:()=>{navigate('/article')}
              },
              {
                  key: '/publish',
                  icon: <EditOutlined />,
                  label: '发布文章',
                  onClick:()=>{navigate('/publish')}
              },]}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout) 