import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Table, Tag, Space, Popconfirm } from 'antd'
// import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect,useState } from 'react'
import {http} from '@/utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  //频道列表管理——hook
  //useState管理数据
  const [channeList,setChanneList] = useState([])
  //useEffect网络请求(不可以直接在useEffect进行异步请求)
  useEffect(()=>{
    const loadChanneList = async ()=>{
      const res = await http.get('/channels')
      setChanneList(res.data.channels)
    }
    loadChanneList()
  },[])

  //文章列表管理（统一管理数据）
  const [articleData,setArticleData]= useState({
    list:[],//文章列表
    count:0 //文章数量
  })
  //文章参数管理
  const [params,setParams] = useState({
    page:1,
    pre_page:10
  })
  /*如果异步请求需要依赖一些数据的变化而重新执行（推荐写在内部）
  统一不抽离函数（异步请求函数）到外面，只要涉及到异步请求的函数，放在useEffect内部 
  */
  useEffect(()=>{
    const loadList = async ()=>{
      const res = await http.get('/mp/articles', { params })
      //console.log(res);
      const { results, total_count } = res.data
      setArticleData({
        list: results,
        count: total_count
      })
    }
    loadList()
  },[params])

  //筛选功能（返回接口的数据匹配后端要求）
  const onFinish =(values)=>{
    //console.log(values);
    const { status, channel_id, date } = values
    const _params = {}
    if(status !==-1){
      _params.status = status
    }
    if(channel_id){
      _params.channel_id = channel_id
    }
    if(date){//接口需要的日期格式
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    //修改params数据,引起接口的重新调用（上面的useEffect）[对象的合并是一个新值覆盖旧值]
    setParams({
      ...params,
      ..._params
    })
  }
  //分页功能
  const pageChange = (page)=>{
    setParams({
      ...params,
      page
    })
  }
  //删除功能
  const delArticle = async (data)=>{
    //console.log(data);
    await http.delete(`/mp/articles/${data.id}`)
    // 更新列表
    setParams({
      ...params,
      page: 1,
      per_page: 10
    })
  }
  //编辑跳转功能
  const goPublish = (data)=>{
    navigate(`/publish?id=${data.id}`)
  }
  // 文章列表的表头
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            {/* 编辑按钮 */}
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={()=>goPublish(data)}
              />
            {/* 删除按钮 */}
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />
                }
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // 文章列表数据（初始模拟）
  const data = [
    {
        id: '8218',
        comment_count: 0,
        cover: {
          images:['http://geek.itheima.net/resources/images/15.jpg'],
        },
        like_count: 0,
        pubdate: '2019-03-11 09:00:00',
        read_count: 2,
        status: 2,
        title: 'wkwebview离线化加载h5资源解决方案' 
    }
  ]
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">"
          >
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form 
          onFinish={onFinish}
          initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channeList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}       
              {/* <Option value="lucy">Lucy</Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={articleData.list}
          pagination={{
            pageSize:params.pre_page,
            total:articleData.count,
            onChange:pageChange
          }
          }
          />
      </Card>
    </div>
  )
}

export default Article