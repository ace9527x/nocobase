import {
  SchemaInitializer,
  SchemaInitializerActionModal,
  SchemaInitializerItemTypeWithoutName,
  useSchemaInitializer,
  useSchemaInitializerItem,
} from '@nocobase/client';
import React from 'react';
import { insertItemTemp, insertSubTemp, ItemSchema, menuSchema, SubSchema } from '../schema';

/** 添加菜单 items */
export const layoutMenuItemInitializer: SchemaInitializerItemTypeWithoutName = {
  type: 'item',
  name: '菜单',
  sort: 1,
  useComponentProps() {
    const { insert } = useSchemaInitializer();
    return {
      title: '菜单',
      onClick: () => {
        insert(menuSchema);
      },
    };
  },
};

/** 分组 items */
export function InsertGroupInitializer() {
  const itemConfig = useSchemaInitializerItem();
  // 调用插入功能
  const { insert } = useSchemaInitializer();

  return (
    <SchemaInitializerActionModal
      isItem
      title={itemConfig.title}
      buttonText={itemConfig.title}
      schema={SubSchema}
      onSubmit={(props) => {
        insert(insertSubTemp(props));
      }}
    />
  );
}

/** 分页 items */
export function InsertPageInitializer() {
  const itemConfig = useSchemaInitializerItem();
  const { insert } = useSchemaInitializer();

  return (
    <SchemaInitializerActionModal
      isItem
      title={itemConfig.title}
      buttonText={itemConfig.title}
      schema={ItemSchema}
      onSubmit={(props) => {
        insert(insertItemTemp(props));
      }}
    />
  );
}

export const addMenu = new SchemaInitializer({
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
