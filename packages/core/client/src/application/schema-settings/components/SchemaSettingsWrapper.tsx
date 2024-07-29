/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { SchemaSettingsDropdown } from '../../../schema-settings';
import { SchemaSettingOptions } from '../types';
import { SchemaSettingsChildren } from './SchemaSettingsChildren';
import { SchemaSettingsIcon } from './SchemaSettingsIcon';
import React from 'react';
import { useDesignable } from '../../../schema-component';
import { useField, useFieldSchema } from '@formily/react';
import { useFormSchemaComponentContext } from '../../../form-schema-provider';
import { createPortal } from 'react-dom';
import { mountAttr } from '../../utils';

/**
 * @internal
 */
export const SchemaSettingsWrapper: FC<SchemaSettingOptions<any>> = (props) => {
  const { items, Component = SchemaSettingsIcon, name, componentProps, style, ...others } = props;
  const { dn } = useDesignable();
  const field = useField();
  const fieldSchema = useFieldSchema();

  const { checkUid } = useFormSchemaComponentContext();

  const [curr, setCurr] = useState(checkUid);

  const xuid = useMemo(() => document.querySelector(`#${fieldSchema?.['x-uid']}`), [curr]);

  useLayoutEffect(() => {
    setCurr(checkUid);
  }, [checkUid])

  const cProps = useMemo(
    () => ({
      options: props,
      style,
      ...componentProps,
    }),
    [componentProps, props, style],
  );

  if (!xuid) return null;

  const C = (
    <SchemaSettingsDropdown
      title={React.createElement(Component, cProps)}
      dn={dn}
      field={field}
      fieldSchema={fieldSchema}
      {...others}
    >
      <SchemaSettingsChildren>{items}</SchemaSettingsChildren>
    </SchemaSettingsDropdown>
  );

  return mountAttr(fieldSchema?.['x-uid'], C);
};
