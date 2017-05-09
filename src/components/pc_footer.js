import React,{ Component } from 'react';

import { Row, Col, Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class PCFooter extends Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="footer">
            &copy;&nbsp;2016 NewsHeaderline. All Rigths Reserved.
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
    );
  }
}


export default PCFooter;
