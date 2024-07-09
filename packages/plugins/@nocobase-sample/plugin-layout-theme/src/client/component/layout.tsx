import { IWrapperLayoutProps, SchemaComponent, withDynamicSchemaProps } from '@nocobase/client';
import { Layout } from 'antd';
import React from 'react';
import '../style';

const LayoutTheme = (props: IWrapperLayoutProps) => {
  const { toolsBtn, title = 'zebras', schema } = props;

  return (
    <>
      <Layout.Header>
        <div className="tool-header">
          <h3>{title}</h3>
          <div className="tool-btn">
            {Object.keys(toolsBtn || {}).map((key) => {
              const ToolBtn = toolsBtn[key];
              /** @ts-ignore */
              return <ToolBtn key={key} />;
            })}
          </div>
        </div>
      </Layout.Header>
      <Layout.Sider>
        <SchemaComponent schema={schema}></SchemaComponent>
      </Layout.Sider>
    </>
  );
};

export default withDynamicSchemaProps(LayoutTheme);
