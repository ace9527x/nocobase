import { createGlobalStyle } from 'antd-style';

export const LayoutContextStyle = createGlobalStyle`
  .ant-layout-content, .ant-layout-sider {
    margin-top: var(--nb-header-height);
    height: calc(100vh - var(--nb-header-height));
    overflow-y: auto;
  }

  .ant-menu-inline .ant-menu-submenu-title, .ant-menu-inline.ant-menu-root .ant-menu-submenu-title >.ant-menu-title-content, .ant-menu-inline .ant-menu-item, .ant-menu-inline.ant-menu-root .ant-menu-item >.ant-menu-title-content {
    overflow: visible;
  }

  .ant-layout-sider-children {
    background: #fff;
    display: inline-flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .ant-layout-sider-children .ant-input-wrapper {
    padding: 6px;
  }
`;
