import { useFieldSchema } from '@formily/react';
import { SchemaSettingsModalItem, useDesignable } from '@nocobase/client';
import React from 'react';
import { insertItemTemp, insertSubTemp, ItemSchema, setSchemaValue, SubSchema } from '../schema';
export const InsertGroup = () => {
  const { dn } = useDesignable();

  return (
    <SchemaSettingsModalItem
      title="新增分组"
      schema={SubSchema}
      onSubmit={(props) => {
        const schema = insertSubTemp(props);

        dn.emit('insertAdjacent', {
          position: 'beforeEnd',
          schema,
          onSuccess: (schema) => {
            dn.insertBeforeEnd(schema);
          },
        });
      }}
    />
  );
};

export const InsertPage = () => {
  const { dn } = useDesignable();

  return (
    <SchemaSettingsModalItem
      title="新增页面"
      schema={ItemSchema}
      onSubmit={(props) => {
        dn.emit('insertAdjacent', {
          position: 'beforeEnd',
          schema: insertItemTemp(props),
          onSuccess: (schema) => {
            dn.insertBeforeEnd(schema);
          },
        });
      }}
    />
  );
};

export const editPage = () => {
  const fieldSchema = useFieldSchema();
  const { dn } = useDesignable();

  return (
    <SchemaSettingsModalItem
      title="编辑页面"
      schema={setSchemaValue(ItemSchema, fieldSchema['x-component-props'], '编辑页面参数')}
      onSubmit={(props) => {
        dn.deepMerge({
          ...fieldSchema,
          title: props.name,
          'x-component-props': {
            ...fieldSchema['x-component-props'],
            ...props,
          },
        });
      }}
    />
  );
};

export const editGroup = () => {
  const fieldSchema = useFieldSchema();
  const { dn } = useDesignable();

  return (
    <SchemaSettingsModalItem
      title="编辑分组"
      schema={setSchemaValue(ItemSchema, fieldSchema['x-component-props'], '编辑分组参数')}
      onSubmit={(props) => {
        dn.deepMerge({
          ...fieldSchema,
          title: props.name,
          'x-component-props': {
            ...fieldSchema['x-component-props'],
            ...props,
          },
        });
      }}
    />
  );
};
