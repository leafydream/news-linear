import React,{ Component } from 'react';

import { Row, Col, Menu, Icon, Tabs, message,
  Form, Input, Button, Checkbox, Modal, Carousel
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

import 'antd/dist/antd.css';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products';


class PCNewsContainer extends Component {
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
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel autoplay {...settings}>
                  <div><img src="../images/banner1.jpg" alt=""/></div>
                  <div><img src="../images/banner2.jpg" alt=""/></div>
                  <div><img src="../images/banner3.jpg" alt=""/></div>
                  <div><img src="../images/banner4.jpg" alt=""/></div>
                  <div><img src="../images/banner5.jpg" alt=""/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="新闻" key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="false" />
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false" />
              </TabPane>
              <TabPane tab="社会" key="3">
                <PCNewsBlock count={22} type="shehui" width="100%" bordered="false" />
              </TabPane>
              <TabPane tab="科技" key="4">
                <PCNewsBlock count={22} type="keji" width="100%" bordered="false" />
              </TabPane>
            </Tabs>
            <Tabs className="tabs_product">
              <TabPane tab="NewsHeaderline 产品" key="1">
                <PCProduct />
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={10} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
              <PCNewsImageBlock count={20} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}





export default PCNewsContainer;
