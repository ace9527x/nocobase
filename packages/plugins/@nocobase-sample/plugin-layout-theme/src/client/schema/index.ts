export const demoSchema = {
  type: 'void',
  'x-decorator': 'BlockItem',
  'x-toolbar-props': {
    initializer: false,
  },
  'x-component': 'LayoutTheme',
};

export const menuSchema = {
  type: 'void',
  'x-component': 'LayoutTheme',
  'x-decorator': 'BlockItem',
  'x-toolbar-props': {
    initializer: false,
  },
  'x-settings': 'blockSettings:remove',
  properties: {
    menu: {
      type: 'void',
      'x-component': 'Menu',
      'x-initializer': 'addMenu',
      'x-designer': 'Menu.Designer',
      'x-toolbar': 'MyToolbar',
      'x-component-props': {
        mode: 'inline',
        style: {
          width: 260,
        },
      },
    },
  },
};

export function setSchemaValue(_schema, obj, name) {
  const schema = JSON.parse(JSON.stringify(_schema));

  if (name) {
    schema.title = name;
  }
  if (schema.properties) {
    Object.keys(obj).map((key) => {
      const val = obj[key];
      schema.properties[key] = {
        ...schema.properties[key],
        default: val,
      };
    });
  }

  return schema;
}

export const ItemSchema = {
  type: 'object',
  title: '新增页面',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    path: {
      type: 'string',
      title: '路径',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        addonBefore: '/',
      },
    },
    icon: {
      type: 'string',
      title: 'icon',
      'x-decorator': 'FormItem',
      'x-component': 'IconPicker',
    },
  },
};

export const SubSchema = {
  type: 'object',
  title: '新增分组',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    key: {
      type: 'string',
      title: 'key',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    icon: {
      type: 'string',
      title: 'icon',
      'x-decorator': 'FormItem',
      'x-component': 'IconPicker',
    },
  },
};

export const insertSubTemp = (fieldSchema, { name, icon, key }) => ({
  type: 'void',
  title: name,
  name: `${fieldSchema['x-uid']}_${key}`,
  'x-uid': `${fieldSchema['x-uid']}_${key}`,
  'x-decorator': 'ACLMenuItemProvider',
  'x-settings': 'blockSettings:layoutmenu',
  'x-component': 'Menu.SubMenu',
  'x-toolbar-props': {
    initializer: false,
    disableInitializer: true,
  },
  'x-component-props': {
    icon,
    title: name,
    key: `${fieldSchema['x-component-props']['key']}_${key}`,
  },
});

export const insertItemTemp = (fieldSchema, { name, icon, path }) => ({
  type: 'void',
  title: name,
  name: `${fieldSchema['x-uid']}_${path}`,
  'x-uid': `${fieldSchema['x-uid']}_${path}`,
  'x-component': 'Menu.Item',
  'x-decorator': 'ACLMenuItemProvider',
  'x-settings': 'blockSettings:itemMenu',
  'x-toolbar-props': {
    initializer: false,
    disableInitializer: true,
  },
  'x-component-props': {
    icon,
    name,
    path,
  },
});
