import {
  SchemaInitializerActionModal,
  SchemaInitializerItemTypeWithoutName,
  useSchemaInitializer,
  useSchemaInitializerItem,
} from '@nocobase/client';
import React from 'react';
import { insertItemTemp, insertSubTemp, ItemSchema, menuSchema, SubSchema } from '../schema';

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
