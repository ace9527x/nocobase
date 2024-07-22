/*
 * @Author: 肖兴(xiaox) 349560971@qq.com
 * @Date: 2024-07-22 14:51:14
 * @LastEditors: 肖兴(xiaox) 349560971@qq.com
 * @LastEditTime: 2024-07-22 14:59:06
 * @FilePath: \my-nocobase-app\packages\core\client\src\schema-component\core\RemoteSchemaComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createForm } from '@formily/core';
import { Schema } from '@formily/react';
import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { useRequest } from '../../api-client';
import { useHistoryContext } from '../../history-operation-provider';
import { useSchemaComponentContext } from '../hooks';
import { FormProvider } from './FormProvider';
import { SchemaComponent } from './SchemaComponent';

export interface RemoteSchemaComponentProps {
  scope?: any;
  uid?: string;
  onSuccess?: any;
  components?: any;
  schemaTransform?: (schema: Schema) => Schema;
  render?: any;
  hidden?: any;
  onlyRenderProperties?: boolean;
  noForm?: boolean;
}

const defaultTransform = (s: Schema) => s;

const RequestSchemaComponent: React.FC<RemoteSchemaComponentProps> = (props) => {
  const {
    noForm,
    onlyRenderProperties,
    hidden,
    scope,
    uid,
    components,
    onSuccess,
    schemaTransform = defaultTransform,
  } = props;
  const { reset } = useSchemaComponentContext();
  const historyContext = useHistoryContext();

  const conf = {
    url: `/uiSchemas:${onlyRenderProperties ? 'getProperties' : 'getJsonSchema'}/${uid}`,
  };
  const form = useMemo(() => createForm(), [uid]);
  const { loading } = useRequest<{
    data: any;
  }>(conf, {
    refreshDeps: [uid],
    onSuccess(data) {
      historyContext.push(data?.data);
      onSuccess && onSuccess(data);
      reset && reset();
    },
  });

  if (loading) {
    return <Spin />;
  }
  if (hidden) {
    return <Spin />;
  }

  /** TODO: 插入布局 */
  return noForm ? (
    <SchemaComponent
      components={components}
      scope={scope}
      key={historyContext.forceReload}
      schema={schemaTransform(historyContext.currentSchema || {})}
    />
  ) : (
    <FormProvider form={form}>
      <SchemaComponent
        components={components}
        key={historyContext.forceReload}
        scope={scope}
        schema={schemaTransform(historyContext.currentSchema || {})}
      />
    </FormProvider>
  );
};

export const RemoteSchemaComponent: React.FC<RemoteSchemaComponentProps> = (props) => {
  return props.uid ? <RequestSchemaComponent {...props} /> : null;
};
