import '../style/layout-content';
// import '../style/layout-header';

export default function createGlobalStyle(key: string, css: string) {
  if (document.body.querySelector(`style[name="${key}"]`)) {
    return;
  }
  document.body.insertAdjacentHTML('beforeend', `<style name="${key}">${css}</style>`);
}
