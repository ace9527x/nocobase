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
        onSelect: '{{onSelect}}',
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

export const insertSubTemp = ({ name, icon, key }) => ({
  type: 'void',
  title: name,
  'x-decorator': 'ACLMenuItemProvider',
  'x-settings': 'blockSettings:layoutmenu',
  'x-component': 'Menu.SubMenu',
  'x-toolbar-props': {
    initializer: false,
    disableInitializer: true,
  },
  'x-server-hooks': [
    {
      type: 'onSelfCreate',
      method: 'bindMenuToRole',
    },
    {
      type: 'onSelfSave',
      method: 'extractTextToLocale',
    },
  ],
  'x-component-props': {
    icon,
    title: name,
    key,
  },
});

export const insertItemTemp = ({ name, icon, path }) => ({
  type: 'void',
  title: name,
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
  'x-server-hooks': [
    {
      type: 'onSelfCreate',
      method: 'bindMenuToRole',
    },
    {
      type: 'onSelfSave',
      method: 'extractTextToLocale',
    },
  ],
  properties: {
    page: {
      type: 'void',
      'x-component': 'Page',
      properties: {
        grid: {
          version: '2.0',
          type: 'void',
          'x-component': 'Grid',
          'x-initializer': 'page:addBlock',
          'x-async': false,
          'x-index': 1,
        },
      },
      'x-async': true,
      'x-index': 1,
    },
  },
});
