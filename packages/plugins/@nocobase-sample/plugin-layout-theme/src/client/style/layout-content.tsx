import createGlobalStyle from '.';

createGlobalStyle(
  'layoutThemeContent',
  `
  .ant-layout-content, .ant-layout-sider {
    margin-top: var(--nb-header-height);
    height: calc(100vh - var(--nb-header-height));
    overflow-y: auto;
  }
`,
);
