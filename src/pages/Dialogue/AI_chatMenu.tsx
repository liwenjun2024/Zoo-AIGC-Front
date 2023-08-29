import { BellOutlined, GiftOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';

const items: MenuProps['items'] = [
  {
    label: '公告',
    key: 'Notice',
    icon: <BellOutlined />,
  },
  {
    label: '消息',
    key: 'Message',
    icon: <MailOutlined />,
  },
  {
    label: '充值',
    key: 'Recharge',
    icon: <GiftOutlined />,
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      theme="light"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ position: 'fixed', top: 0, width: '100%', zIndex: 99 }}
    />
  );
};

export default App;
