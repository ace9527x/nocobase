import { SchemaSettings } from '@nocobase/client';
import { editPage, InsertGroup, InsertPage } from './items';
export const setting = new SchemaSettings({
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

export const settingRemove = new SchemaSettings({
  name: 'blockSettings:remove',
  items: [
    {
      type: 'remove',
      name: '删除',
    },
  ],
});

export const settingItemMenu = new SchemaSettings({
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
