/*
 * @Author: 肖兴(xiaox) 349560971@qq.com
 * @Date: 2024-07-23 16:01:00
 * @LastEditors: 肖兴(xiaox) 349560971@qq.com
 * @LastEditTime: 2024-07-25 09:57:42
 * @FilePath: \my-nocobase-app\packages\core\client\src\route-switch\antd\admin-layout\component-tree\component\tree.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { TreeProps } from 'antd';
import { Tree } from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistoryContext } from '../../../../../history-operation-provider';
import { moveSchema } from '../../../../../history-operation-provider/utils';

export const CTree: React.FC = () => {
  const historyContext = useHistoryContext();

  const { t } = useTranslation();

  const onDrop: TreeProps['onDrop'] = async (info) => {
    if (info.dragNode === info.node) return;

    if (info.dragNode && info.node) {
      const schema = await moveSchema(
        info.dragNode,
        info.node,
        info.dropPosition,
        _.cloneDeep(historyContext.currentSchema)
      )

      historyContext.push(schema);
      historyContext.reload((v) => v + 1);
    }
  };

  const [expandedKeys, setExpandedKeys] = useState([]);

  function titleT(title) {
    if (!title) return '';

    const name = title?.replace(/{{\s*t\(\s*"([^"]+)"\s*\)\s*}}/g, "$1")

    if (name) return t(name);

    return '';
  }

  const data = useMemo(() => {
    const schemas = historyContext.currentSchema;
    // 转换properties为数组
    function transformProperties(s, name = s.name) {
      if (!Object.keys(s).length) return [];

      if (s.properties) return {
        name,
        ...s,
        _title: `${s['x-component']}(${titleT(s.title) || s['x-uid']} - ${name})`,
        properties: Object.keys(s.properties).map(ss => transformProperties(s.properties[ss], ss)).sort((a, b) => a['x-index'] - b['x-index'])
      }

      return {
        name,
        ...s,
        _title: `${s['x-component']}(${titleT(s.title) || s['x-uid']} - ${name})`
      };
    }

    return transformProperties(schemas);
  }, [historyContext.currentSchema]);

  function expandAll() {
    // 默认全部展开
    const expandKeys = [];

    function dfs(node) {
      expandKeys.push(node['x-uid']);
      if (node.properties?.length) {
        node.properties.forEach(n => dfs(n));
      }
    }

    dfs(data);

    setExpandedKeys(expandKeys);
  }

  useEffect(() => {
    if (data?.properties?.length) {
      expandAll();
    }
  }, [data]);

  useEffect(() => {
    // 插入style
    const style = document.createElement('style');
    style.setAttribute('name', 'tree-hover');
    document.head.append(style);
    return () => {
      document.head.querySelector('style[name="tree-hover"]')?.remove();
    }
  }, []);

  return (
    <Tree
      className="draggable-tree"
      fieldNames={{
        title: '_title',
        key: 'x-uid',
        children: 'properties'
      }}
      titleRender={(node) => {
        return <div
          onMouseLeave={(e) => {
            const style = document.head.querySelector('style[name="tree-hover"]')
            if (style) style.innerHTML = '';
          }}
          onMouseEnter={(e) => {
            const style = document.head.querySelector('style[name="tree-hover"]')
            if (style) style.innerHTML = `[class*="${node['x-uid']}"]::before {
              content: '';
              position: absolute;
              inset: 0;
              z-index: 999;
              border: 2px solid #ff9c4699;
              border-radius: 4px;
            }`;
          }}>
          {node._title}
        </div>
      }}
      draggable
      blockNode
      onDrop={onDrop}
      onExpand={(expands) => {
        setExpandedKeys(expands)
      }}
      expandedKeys={expandedKeys}
      treeData={data?.properties}
    />
  );
};