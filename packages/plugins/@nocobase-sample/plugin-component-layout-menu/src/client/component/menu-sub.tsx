import { withDynamicSchemaProps } from '@nocobase/client';
import { Menu } from 'antd';

import React from 'react';

export const MenuSub = withDynamicSchemaProps((props) => {
  return <Menu.SubMenu>{props.children}</Menu.SubMenu>;
});
