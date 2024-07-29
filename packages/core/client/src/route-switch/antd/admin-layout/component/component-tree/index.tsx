/*
 * @Author: 肖兴(xiaox) 349560971@qq.com
 * @Date: 2024-07-23 15:17:15
 * @LastEditors: 肖兴(xiaox) 349560971@qq.com
 * @LastEditTime: 2024-07-24 09:53:04
 * @FilePath: \my-nocobase-app\packages\core\client\src\route-switch\antd\admin-layout\component-tree\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';

import { createGlobalStyle } from 'antd-style';
import _ from 'lodash';
import { CTree } from './component';

const ComponentStyle = createGlobalStyle`
  .nocobase_component-tree {
    position: fixed;
    position-anchor: --anchor-page;
    top: anchor(top);
    bottom: anchor(bottom);
    left: 0;
    width: 0;
    z-index: 99;
    transition: width 0.1s, box-shadow 0.5s;
    overflow: hidden;
    background: #fff;
  }

  .nocobase_component-tree.visible {
    width: 400px;
    padding: 24px;
    box-shadow: 0 0 12px 0 #0042ff77;
  }

  .nocobase_component-tree:before {
    position: absolute;
    content: '';
  }

  .ant-layout {
    height: 100%;
  }

  .ant-layout-content {
    anchor-name: --anchor-page;
  }

  .ant-tree {
    width: 360px;
    height: 100%;
    overflow: auto;
  }

  .ant-tree .ant-tree-indent-unit {
    width: 10px;
  }

  div {
    position: relative;
  }
`

const ComponentTree = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prev) => !prev);
  }

  // 注册 ctrl + M 打开/关闭组件树快捷键
  const toggleTree = _.debounce((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'm') {
      e.preventDefault();
      e.stopPropagation();

      toggle();
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', toggleTree);

    return () => {
      window.removeEventListener('keydown', toggleTree);
    }
  }, [])

  return (
    <>
      <ComponentStyle />
      <div className={`nocobase_component-tree ${visible ? 'visible' : ''}`}>
        <CTree />
      </div>
    </>
  )
}

export default ComponentTree;
