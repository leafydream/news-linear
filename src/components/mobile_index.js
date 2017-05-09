import React,{ Component } from 'react';

import { Tabs, Carousel } from 'antd';

const TabPane = Tabs.TabPane;

import 'antd/dist/antd.css';
import '../styles/mobile.css';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';


class MobileIndex extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      sliderToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="头条" key="1">
            <div className="carousel">
              <Carousel autoplay {...settings}>
                <div><img src="../images/banner1.jpg" alt=""/></div>
                <div><img src="../images/banner2.jpg" alt=""/></div>
                <div><img src="../images/banner3.jpg" alt=""/></div>
                <div><img src="../images/banner4.jpg" alt=""/></div>
                <div><img src="../images/banner5.jpg" alt=""/></div>
              </Carousel>
            </div>
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type="yule"/>
          </TabPane>
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>
    );
  }
}


export default MobileIndex;
