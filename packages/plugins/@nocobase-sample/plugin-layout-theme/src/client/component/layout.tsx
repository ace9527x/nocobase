import { SearchOutlined } from '@ant-design/icons';
import { withDynamicSchemaProps } from '@nocobase/client';
import type { MenuProps } from 'antd';
import { Input, Layout, Menu } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutContextStyle, LayoutHeaderStyle } from '../style';
import { mockMenu, transformUsmMenu } from '../utils';

function findLabel(siderMenu, searchMenuKeyword) {
  return siderMenu.filter((item) => {
    if (item.children) {
      const cl = findLabel(item.children, searchMenuKeyword);

      if (cl.length) {
        return cl;
      }

      return false;
    }

    return item.label.includes(searchMenuKeyword);
  });
}

const LayoutTheme = (props) => {
  const { toolsBtn, title = 'zebras', schema, menu = mockMenu, historyToolbar } = props;

  const params = useParams<any>();

  const sideMenuRef = useRef(null);
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

  const [searchMenuKeyword, setSearchMenuKeyword] = useState<any>('');

  const _menu = useMemo(() => {
    if (!searchMenuKeyword) return siderMenu;

    return findLabel(siderMenu, searchMenuKeyword);
  }, [searchMenuKeyword, siderMenu]);

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
          {historyToolbar && historyToolbar()}
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
        <Input
          value={searchMenuKeyword}
          addonBefore={<SearchOutlined />}
          onChange={(e) => {
            setSearchMenuKeyword(e.target.value);
          }}
          placeholder="请输入搜索菜单"
          allowClear
        />
        <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={_menu} />
      </Layout.Sider>
    </>
  );
};

export default withDynamicSchemaProps(LayoutTheme);
