import React,{ Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { Row, Col, Menu, Icon, Tabs, message,
  Form, Input, Button, Checkbox, Modal, Card, notification
} from 'antd';

import 'antd/dist/antd.css';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;


class CommonComments extends Component {
  constructor(){
    super();
    this.state = {
      comments: ''
    };
  }


  componentDidMount(){
    var myFetchOptions = {
      method: 'get'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json()).then(json => {
      this.setState({comments: json});
    });
  };

  handleSubmit = (e)=>{
    e.preventDefault();
    var myFetchOptions = {
      method: 'get'
    };

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = values;
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, myFetchOptions)
          .then(response => response.json()).then(json => {
          this.componentDidMount();
        });
        console.log('formValues: ', values);
      }
    });
  };

  addUserCollectoin = ()=>{
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
      //收藏成功以后进行一下全局的提醒
      notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const { comments } = this.state;
    const commentList = comments.length
      ? comments.map((comment, index) => (
        <Card key={index} title={comment.UserName} extra={<a href="javascript:void(0)">发布于{comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '没有加载到任何评论';
    return(
      <div className="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="您的评论">
                {getFieldDecorator('remark', {
                  rules: [{ required: true, message: '请输入您的密码' }],
                })(
                  <Input type="textarea" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的评论信息" />
                )}
                <Button type="primary" htmlType="submit">提交评论</Button>
                <Button type="primary" htmlType="button" onClick={this.addUserCollectoin}>收藏该文章</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(CommonComments);
