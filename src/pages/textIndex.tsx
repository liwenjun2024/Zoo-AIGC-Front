import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import { useState } from 'react';
import complexMenu from './_defaultProps';

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  //设置menu缩小样式
  const menuProps: ProLayoutProps = {
    ...props,
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
  };
  return (
    <ProLayout
      {...menuProps}
      siderWidth={200}
      location={{
        pathname: '/home/overview',
      }}
      postMenuData={(menuData) => {
        return [
          {
            name: '',
            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
            onTitleClick: () => {
              setCollapsed(!collapsed);
            },
          },
          ...(menuData || []), // 将原始的菜单数据追加到返回的数组中
        ];
      }}
      fixSiderbar={true}
      route={{
        routes: complexMenu,
      }}
      style={{}}
      menu={{
        hideMenuWhenCollapsed: false,
      }}
      menuHeaderRender={false}
    ></ProLayout>
  );
};
