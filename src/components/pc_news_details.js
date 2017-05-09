import React,{ Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block'
import CommonComments from './common_comments';

class PCNewsDetails extends Component {
  constructor(){
    super();
    this.state = {
      newsItem: ''
    };
  }

  createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
  };

  componentDidMount(){
    var myFetchOptions = {
      method: 'get'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({newsItem: json});
        document.title = this.state.newsItem.title + " - NewsHeaderline | Headerline 驱动的新闻平台";
    });
  };

  render(){
    return(
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <CommonComments uniquekey={this.props.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={60} type="top" width="100%" cardTitle="相关新闻" imageWidth="210px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop />
      </div>
    );
  }
}

export default PCNewsDetails;

















