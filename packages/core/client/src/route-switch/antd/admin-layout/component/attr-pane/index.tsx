import React from 'react';
import { createGlobalStyle } from 'antd-style';
import { useFormSchemaComponentContext } from '../../../../../form-schema-provider';
import { Button } from 'antd';

const ComponentStyle = createGlobalStyle`
  .nocobase_attr-pane {
    position: fixed;
    position-anchor: --anchor-page;
    top: anchor(top);
    bottom: anchor(bottom);
    right: 0;
    width: 0;
    z-index: 99;
    background: #fff;
    transition: width 0.1s, box-shadow 0.5s;
    overflow: hidden;
  }

  .nocobase_attr-pane.visible {
    width: 400px;
    padding: 24px;
    box-shadow: 0 0 12px 0 #0042ff77;
  }
`

const AttrPane = (props) => {
  const { attrVisible, cancelAttrPane, checkUid } = useFormSchemaComponentContext();

  return (
    <>
      <ComponentStyle />
      <div id={checkUid} className={`nocobase_attr-pane ${attrVisible ? 'visible' : ''}`} onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
        
        <Button onClick={() => cancelAttrPane()}>关闭</Button>
      </div>
    </>
  );
};

export default AttrPane;
