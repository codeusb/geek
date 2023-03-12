import { Card, Breadcrumb, Form, Button,
  Radio, Input, Upload, Space, Select,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useStore} from '@/store'
import { observer } from 'mobx-react-lite'
import {useEffect, useRef, useState} from 'react'
import {http} from '@/utils'

const { Option } = Select

const Publish = () => {
  const navigate = useNavigate()
  //频道列表数据渲染
  const {channelStore} = useStore()

  //上传图片功能
  //上传图片列表数据——hook
  const [fileList, setFileList] = useState([])
  const cacheImgList = useRef()
  // 上传成功回调
  const onUploadChange = info => {
    //console.log(info);
    const fileList = info.fileList.map(file => {
      //上传完毕
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    //3次请求在最后一次response获得url信息
    //使用useRef声明一个暂存仓库
    setFileList(fileList)
    //上传完成同时把图片列表存入仓库
    cacheImgList.current = fileList
  }

  //切换图片上传模式
  const [imgCount,setImgCount] = useState(1)
  const radioChange =(e)=>{
    // console.log(e.target.value);//单图：1，三图：3，无图：0
    const rawValue = e.target.value
    setImgCount(rawValue)
    //从仓库取对应的图片数量，重新渲染图片
    //通过调用setFileLIst
    if(rawValue ===1){
      const img = cacheImgList.current ? cacheImgList.current[0] : []
      setFileList([img])
    }else if(rawValue ===3){
      setFileList(cacheImgList.current)
    }
  }

  //表单提交(发布文章)/更新文章
  const onFinish = async (values)=>{
    // console.log(values);
    //数据二次处理，处理图片的cover字段
    const {channel_id,content,title,type} = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover:{
        type:type,
        images:fileList.map(item => item.url)
      }
    }
    //console.log(params);
    if(id){
      await http.put(`/mp/articles/${id}?draft=false`,params)
    }else{
      await http.post('/mp/articles?draft=false', params)
    }
    //跳转到文章页    
    navigate('/article')
    message.success(`${id?'更新成功':'发布成功'}`)
  }

  //编辑功能
  //文案适配
  const [params] = useSearchParams()
  const id = params.get('id')
  //console.log(id);

  //数据回填 id调用接口 1.表单回调 2.暂存列表 3.upload组件的filelist
  const from = useRef()
  useEffect(()=>{
    const loadDetail = async ()=>{
      const res = await http.get(`/mp/articles/${id}`)
      // console.log(res);
      const { cover, ...formValue } = res.data
      //表单数据回填
      from.current.setFieldsValue({ ...formValue, type: cover.type })
      //调用setFileList方法回填upload
      const imageList = cover.images.map(url => ({ url }))//es6对象简写
      setFileList(imageList)
      //暂存列表
      cacheImgList.current = imageList
    }
    //必须编辑状态才能发送接口请求
    if(id){
      loadDetail()
      // console.log(from.current);
    }else{
      //清理form回填数据
      from.current.resetFields()
      //清理uoload
      setFileList([])
      cacheImgList.current=[]
    }
    
  },[id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb 
          separator=">"
          items={[
            {
              title:<Link to='/'>首页</Link>
            },
            {
              title:`${id?'编辑':'发布'}文章`
            },
          ]}
          >
            {/* <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item> */}
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={from}
          // initialValues={{ type: 1,content:'this is content' }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* <Option value={0}>推荐</Option> */}
              {channelStore.channelList.map(
                item=><Option key={item.id} value={item.id}>{item.name}
                </Option>)}    
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount>0 &&(
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
                // progress={{strokeWidth: 3, showInfo: false}}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
            </Upload>
            )}
          </Form.Item>
          {/* 富文本编辑器的输入内容会在onFinshed事件回调中被获取 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id?'更新':'发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish) 