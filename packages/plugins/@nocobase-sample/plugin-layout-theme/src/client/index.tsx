import { Plugin } from '@nocobase/client';
import LayoutTheme from './component/layout';
import { addMenu, layoutMenuItemInitializer } from './initializer';
import { setting, settingItemMenu, settingRemove } from './settings';
import './style';

export class PluginLayoutThemeClient extends Plugin {
  async load() {
    this.app.addComponents({ LayoutTheme });
    this.app.schemaInitializerManager.addItem(
      'page:addBlock',
      layoutMenuItemInitializer.name,
      layoutMenuItemInitializer,
    );

    this.app.schemaSettingsManager.add(setting);
    this.app.schemaSettingsManager.add(settingRemove);
    this.app.schemaSettingsManager.add(settingItemMenu);
    this.app.schemaInitializerManager.add(addMenu);
  }
}

export default PluginLayoutThemeClient;
