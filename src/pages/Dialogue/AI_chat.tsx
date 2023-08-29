import { selectSession } from '@/services/swagger/messageController';
import { DesktopOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, PlusCircleOutlined, SearchOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Input, Layout, Menu, MenuProps, Space, theme } from 'antd';
import Search from 'antd/es/input/Search';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useRef, useState } from 'react';
import AIMenu from './AI_chatMenu';
import SendMsg from './AI_Dialogue';

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const { initialState} = useModel('@@initialState');

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const handleNewMenu = (menu: boolean) => {
    if (menu) {
      setItems([]);
      fetchData();
    }
  }


  const fetchData = async () => {
    try {
      const res = await selectSession({
        uid: initialState?.currentUser?.id,
      });
      const newItems = res?.data?.map((session: any) => {
        return getItem(session.title, session.id, <UserOutlined />);
      });
      if (newItems) {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  //search功能
  const onSearch = (value: string) => console.log(value);

  const handleItemClick = (key: string) => {
      setSelectedItemId(key);
      setDataLoaded(true);
  }

  const newMessageClick = ()=>{
    setSelectedItemId(null);
    setRerenderFlag(flag => !flag);
  }

  

  return (
    <Layout style={{ minHeight: '100vh' }} key={rerenderFlag.toString()}>
      <Sider
        collapsible
        collapsed={collapsed}
        theme="light"
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        <div className="demo-logo-vertical" >
          <Search placeholder="搜索" onSearch={onSearch} />
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={newMessageClick} size={'large'} style={{
            width: '80%',
            marginInline: '10%',
            marginTop: '2px'

          }} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={({ key }) => handleItemClick(key)}
        />
      </Sider>
      <Layout>
        <PageContainer style={{ minHeight: '93vh' }}>
          <Header style={{ height: 6 }}>
            <AIMenu />
          </Header>
          <Content
            style={{
              paddingInline: 100,
              overflowY: dataLoaded ? 'auto' : 'hidden',
              height: 'calc(100vh - 150px)',
              flex: 2,
            }}
          >
            <SendMsg selectedItemId={selectedItemId} onNewMenu={handleNewMenu} key='sendmsg' />
          </Content>
        </PageContainer>
      </Layout>
    </Layout>
  );
};
