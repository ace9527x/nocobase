import { Plugin } from '@nocobase/client';
import LayoutTheme from './component/layout';

export class PluginLayoutThemeClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    console.log(this.app, '---- app');
    this.app.addComponents({ LayoutTheme });
    // this.app.addScopes({})
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()
  }
}

export default PluginLayoutThemeClient;
