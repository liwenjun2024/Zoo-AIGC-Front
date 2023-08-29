import { sendCode, userRegister } from '@/services/swagger/userController';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormInstance,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Button, message, Space, Tabs } from 'antd';
  import { CSSProperties, useRef } from 'react';
  import { useState } from 'react';
  import {history} from '@umijs/max';

  
  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  
const Register :React.FC = () => {
    const [loginType, setLoginType] = useState('email');

    const handleRegisterSubmit = async (values : any)=>{
        try{
            await userRegister({
                email: values.email,
                password: values.password,
                phone_code: '',
                phone: '',
                invite_code: values.captcha,
                registerIdentity: 'email',
            })
        }catch(error){
            return;
        }
      }
    
      const handleSendEmail = async (email:any)=>{
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (email && emailPattern.test(email)) {
          // 邮箱格式正确
          // 在这里执行发送验证码的逻辑
          try{
            await sendCode({
                email:email,
             })
          }catch(error){
            return;
          }
          message.success('获取验证码成功！请查看邮箱');
        } else {
          // 邮箱格式不正确
          message.error('请输入正确的邮箱格式');
        }
      }

    return (
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            onFinish={handleRegisterSubmit}
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="注册账号"
            subTitle="不停更新的AIGC平台"
            submitter={{
                render:(_,dom) =>(
                    <Button type="primary" size='large' style={{
                        width:'100%',
                    }} htmlType="submit">
                    注册
                  </Button>
                ),
            }}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey)}
            >
              <Tabs.TabPane key={'email'} tab={'邮箱注册'} />
            </Tabs>    
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="email"
                  placeholder={'邮箱'}
                  rules={[
                    {
                      required: true,
                      message: '请输入邮箱！',
                    },
                    {
                      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: '邮箱格式错误！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'密码: '}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                    {
                        min:6,
                        message:'密码长度至少为6个字符',
                    }
                  ]}
                />
                <ProFormText.Password
                  name="confirmPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  dependencies={['password']}
                  placeholder={'再次输入密码: '}
                  rules={[
                    {
                      required: true,
                      message: '请再次输入密码！',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  phoneName={'email'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  
                  onGetCaptcha={(email)=>handleSendEmail(email)}
                />
              </>
           
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <a
                style={{
                  float: 'right',
                }}
                onClick={()=>{
                    history.replace({
                        pathname:'/user/login',
                    })
                }}
              >
                返回登录
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    );
};
export default Register;