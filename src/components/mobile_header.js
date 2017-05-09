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


class MobileHeader extends Component {
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

  handleLogin = ()=>{
    this.setModalVisible(true);
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
        console.log('表单值: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = hasLogined => {
      if (hasLogined) {
        return (
          <Link to={`/usercenter`}>
            <Icon type="inbox"/>
          </Link>
        )
      } else {
        return (
          <Icon type="setting" onClick={this.handleLogin}/>
        )
      }
    };
    return (
      <div id="mobileheader">
        <header>
          <a href="/">
            <img src="images/news.png" alt=""/>
          </a>
          <span>NewsHeaderline</span>
          {userShow(this.state.hasLogined)}
        </header>
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
      </div>
    );
  }
}


export default Form.create()(MobileHeader);
