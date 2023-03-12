//一级页面：登录login
import { Card,Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import {useStore} from '@/store'
import {useNavigate} from 'react-router-dom'
function Login(){
  //注册loginStore实例
  const {loginStore} = useStore()
  
  //路由跳转
  const navigate = useNavigate()

  //登录事件-loginStore
  const onFinish = async (values) => {
    //console.log('Success:', values);
    //登录（接口验证账号密码）
    try{
      await loginStore.getToken({
      mobile:  values.username,
      code: values.password
      })
      navigate('/',{replace:true})
      //提示用户
      message.success("登录成功")
    }catch(e){
      message.error(e.response?.data?.message ||'登录失败')
    }
  };

  return(
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* 子项的事件(失焦和改变)需要在from中声明 */}
        <Form 
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            username: '13811111111',
            remember: true,
            password:'246810'
          }}
          // 获取表单验证数据（用户名和密码）[提交事件]
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { len: 6, message: '请输入6位密码', validateTrigger: 'onBlur' },
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
