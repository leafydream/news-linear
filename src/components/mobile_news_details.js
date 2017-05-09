import React,{ Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';

class MobileNewsDetails extends Component {
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
      <div id="mobileDetailsContainer">
        <MobileHeader></MobileHeader>
        <div className="ucmobileList">
          <Row>
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <CommonComments uniquekey={this.props.params.uniquekey} />
            </Col>
          </Row>
          <MobileFooter></MobileFooter>
          <BackTop />
        </div>
      </div>
    );
  }
}

export default MobileNewsDetails;

















