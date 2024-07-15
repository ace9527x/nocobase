import { withDynamicSchemaProps } from '@nocobase/client';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutContextStyle, LayoutHeaderStyle } from '../style';
import { mockMenu, transformUsmMenu } from '../utils';
const LayoutTheme = (props) => {
  const { toolsBtn, title = 'zebras', schema, menu = mockMenu } = props;

  const params = useParams<any>();

  const sideMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sideMenuRef.current) {
      const isSettingPage = location?.pathname.includes('/settings');
      if (isSettingPage) {
        sideMenuRef.current.style.display = 'none';
      } else {
        sideMenuRef.current.style.display = 'block';
      }
    }
  }, [params.name, sideMenuRef]);

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
      <LayoutContextStyle />
      <LayoutHeaderStyle />
      <Layout.Header>
        <div className="tool-header">
          <h3
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            {title}
          </h3>
          <div className="tool-btn">
            {Object.keys(toolsBtn || {}).map((key) => {
              const ToolBtn = toolsBtn[key];
              /** @ts-ignore */
              return <ToolBtn key={key} />;
            })}
          </div>
        </div>
      </Layout.Header>
      <Layout.Sider width={260} ref={sideMenuRef}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={siderMenu} />
      </Layout.Sider>
    </>
  );
};

export default withDynamicSchemaProps(LayoutTheme);
