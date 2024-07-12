import { IWrapperLayoutProps, SchemaComponent, withDynamicSchemaProps } from '@nocobase/client';
import { Layout } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LayoutTheme = (props: IWrapperLayoutProps & { children: any }) => {
  const { toolsBtn, title = 'zebras', schema, onSelect } = props;

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

  return (
    <>
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
      <div>
        <Layout.Sider width={260} ref={sideMenuRef}>
          <SchemaComponent
            scope={{
              onSelect: (props) => {
                console.log(props);
                onSelect(props);
              },
            }}
            schema={{
              ...schema,
              type: 'void',
              'x-component': 'Menu',
              'x-initializer': 'addMenu',
              'x-component-props': {
                defaultSelectedUid: params.name,
                mode: 'inline',
                onSelect: '{{onSelect}}',
                style: {
                  width: 260,
                },
              },
            }}
          ></SchemaComponent>
        </Layout.Sider>
      </div>
    </>
  );
};

export default withDynamicSchemaProps(LayoutTheme);
