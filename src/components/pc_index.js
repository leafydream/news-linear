import 'normalize.css/normalize.css';
import '../styles/pc.css';
import React,{ Component } from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';






class PCIndex extends Component {
  render() {
    return (
      <div>
        <PCHeader></PCHeader>
        <PCNewsContainer></PCNewsContainer>
        <PCFooter></PCFooter>
      </div>
    );
  }
}




export default PCIndex;
