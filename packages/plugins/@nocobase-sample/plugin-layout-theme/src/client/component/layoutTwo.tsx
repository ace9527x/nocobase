import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { PinnedPluginList, useHistoryContext } from '@nocobase/client';
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

const HistoryStyle = createGlobalStyle`
  .history-tool {
    display: flex;
    align-items: center;
    gap: 8px;

    .save,
    .redo,
    .undo {
      cursor: pointer;
      span {
        transition: all 0.3s;
      }

      &:hover {
        span {
          background: #fff;
          padding: 4px;
          color: #333;
          border-radius: 4px;
          font-size: 16px;
        }
      }
    }

    .redo-disabled,
    .undo-disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
`;

const LayoutThemeTwo = (props) => {
  const { toolsBtn, title = 'zebras', menu = mockMenu } = props;
  const params = useParams<any>();
  const navigate = useNavigate();

  const siderMenu = useMemo<any>(() => transformUsmMenu(menu), [menu]);

  const [current, setCurrent] = useState<any>();
  const historyContext = useHistoryContext();

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
      <HistoryStyle />
      <Layout.Header>
        <div className="menu">
          <h2>{title}</h2>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={siderMenu} />
        </div>
        <div className="history-tool">
          <div
            title="撤回"
            className={historyContext.hasUndo ? 'undo' : 'undo-disabled'}
            onClick={() => {
              historyContext.back();
            }}
          >
            {historyContext.hasRedo}
            <ArrowLeftOutlined />
          </div>
          <div
            title="恢复"
            className={historyContext.hasRedo ? 'redo' : 'redo-disabled'}
            onClick={() => {
              {
                historyContext.hasUndo;
              }
              historyContext.forward();
            }}
          >
            <ArrowRightOutlined />
          </div>
          {historyContext.length > 1 && (
            <div
              title="保存"
              className="save"
              onClick={() => {
                historyContext.clear();
              }}
            >
              <CheckOutlined />
            </div>
          )}
        </div>
        <PinnedPluginList />
      </Layout.Header>
    </>
  );
};

export default LayoutThemeTwo;
