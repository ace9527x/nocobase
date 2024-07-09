import createGlobalStyle from '.';

createGlobalStyle(
  'layoutThemeHeader',
  `
  .ant-layout-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: var(--nb-header-height);
    line-height: var(--nb-header-height);
    padding: 0;
  }

  .tool-header {
    height: 100%;
    width: 100%;
    justify-content: space-between;
    background: rgba(0, 0, 0, .6);
    display: flex;
    color: #fff;
    padding: 0 24px;
  }
`,
);
