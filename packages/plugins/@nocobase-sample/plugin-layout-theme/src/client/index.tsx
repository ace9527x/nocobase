import { Plugin, SchemaInitializer, SchemaSettings, SchemaToolbar } from '@nocobase/client';
import LayoutTheme from './component/layout';
import { InsertGroupInitializer, InsertPageInitializer, layoutMenuItemInitializer } from './initializer';
import { editPage, InsertGroup, InsertPage } from './settings';
import './style';

import { useFieldSchema } from '@formily/react';
import React from 'react';

const addMenu = new SchemaInitializer({
  name: 'addMenu',
  title: '添加菜单',
  // 插入位置
  insertPosition: 'beforeEnd',
  items: [
    {
      name: '新增分组',
      title: '新增分组',
      Component: InsertGroupInitializer,
    },
    {
      name: '新增页面',
      title: '新增页面',
      Component: InsertPageInitializer,
    },
  ],
});

const MyToolbar = (props) => {
  const fieldSchema = useFieldSchema();
  return <SchemaToolbar title="这是标题" settings={fieldSchema['x-settings']} {...props} initializer={false} />;
};
export class PluginLayoutThemeClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    this.app.addComponents({ LayoutTheme, MyToolbar });
    this.app.schemaInitializerManager.addItem(
      'page:addBlock',
      layoutMenuItemInitializer.name,
      layoutMenuItemInitializer,
    );

    const setting = new SchemaSettings({
      name: 'blockSettings:layoutmenu',
      items: [
        {
          name: 'group',
          Component: InsertGroup,
        },
        {
          name: 'page',
          Component: InsertPage,
        },
        {
          type: 'remove',
          name: '删除',
        },
      ],
    });

    const settingRemove = new SchemaSettings({
      name: 'blockSettings:remove',
      items: [
        {
          type: 'remove',
          name: '删除',
        },
      ],
    });

    const settingItemMenu = new SchemaSettings({
      name: 'blockSettings:itemMenu',
      items: [
        {
          name: '编辑',
          Component: editPage,
        },
        {
          type: 'remove',
          name: '删除',
        },
      ],
    });

    this.app.schemaSettingsManager.add(setting);
    this.app.schemaSettingsManager.add(settingRemove);
    this.app.schemaSettingsManager.add(settingItemMenu);
    this.app.schemaInitializerManager.add(addMenu);
  }
}

export default PluginLayoutThemeClient;
