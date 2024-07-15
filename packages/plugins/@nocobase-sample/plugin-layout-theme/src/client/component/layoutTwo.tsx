import { PinnedPluginList } from '@nocobase/client';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { createGlobalStyle } from 'antd-style';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockMenu, transformUsmMenu } from '../utils';

const HeaderStyle = createGlobalStyle`
  .ant-layout .ant-layout-header {
    color: #fff;
    padding: 0 12px;
    height: 46px;
    line-height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu {
    display: flex;
  }

  .ant-layout .ant-layout-header h2 {
    margin-right: 24px;
  }
`;

const LayoutThemeTwo = (props) => {
  const { toolsBtn, title = 'zebras', menu = mockMenu, onSelect } = props;
  const params = useParams<any>();
  const navigate = useNavigate();

  const siderMenu = useMemo<any>(() => transformUsmMenu(menu), [menu]);

  const [current, setCurrent] = useState<any>();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/admin/${e.key}`, {
      state: {
        name: e.key,
      },
    });
  };

  useEffect(() => {
    if (params.name) {
      setCurrent(params.name);
    }
  }, [params]);

  return (
    <>
      <HeaderStyle />
      <Layout.Header>
        <div className="menu">
          <h2>{title}</h2>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={siderMenu} />
        </div>
        <PinnedPluginList />
      </Layout.Header>
    </>
  );
};

export default LayoutThemeTwo;
