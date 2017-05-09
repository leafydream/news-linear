import React,{ Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { Row, Col, Menu, Icon, Tabs, message,
  Form, Input, Button, Checkbox, Modal
} from 'antd';

import 'antd/dist/antd.css';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;


class PCHeader extends Component {
  constructor(){
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  }

  setModalVisible (value){
    this.setState({modalVisible: value});
  };

  handleClick = (e)=>{
    if(e.key=="register"){
      this.setState({current: "register"});
      this.setModalVisible(true);
    }else{
      this.setState({current: e.key});
    }
  };

  handleSubmit = (e)=>{
    e.preventDefault();
    let myFetchOptions = {
      method: "get"
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = values;
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
          + "&username="+formData.userName+"&password="+formData.password
          +"&r_userName=" + formData.r_userName + "&r_password="
          + formData.r_password + "&r_confirmPassword="
          + formData.r_confirmPassword, myFetchOptions)
          .then(response => response.json())
          .then(json => {
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
          });
        if (this.state.action=="login") {
          this.setState({hasLogined: true});
        }
        message.success("请求成功！");
        this.setModalVisible(false);
        console.log('formValues: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = (hasLogined)=>{
      if(hasLogined){
        return(
          <Menu.Item key="logout" className="register">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link target="_blank" to={`/usercenter`} style={{display:"inline-block"}}>
              <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button">退出</Button>
          </Menu.Item>
        );
      }else{
        return(
          <Menu.Item key="register" className="register">
            <Icon type="appstore" />注册/登录
          </Menu.Item>
        );
      }
    };
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="images/news.png" alt=""/>
              <span>NewsHeaderline</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国际
              </Menu.Item>
              <Menu.Item key=" tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow(this.state.hasLogined)}
            </Menu>
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                   onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
              <Tabs type="card">
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label="账号">
                      {getFieldDecorator('r_userName', {
                        rules: [{ required: true, message: '请输入您的账号' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_password', {
                        rules: [{ required: true, message: '请输入您的密码' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的密码" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [{ required: true, message: '请再次输入您的密码' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请再次输入您的密码" />
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}


export default Form.create()(PCHeader);;
