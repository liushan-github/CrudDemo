import {DefaultFooter} from '@ant-design/pro-layout';
import {Icon} from 'antd';
import React from "react";

const DefaultFooterDom = (
  <DefaultFooter
    copyright="2019 antd by xmky"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <Icon type="github"/>,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
export default DefaultFooterDom;
