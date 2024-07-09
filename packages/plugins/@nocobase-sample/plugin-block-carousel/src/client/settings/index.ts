import { SchemaSettings, SchemaSettingsBlockTitleItem } from '@nocobase/client';
import { BlockNameLowercase } from '../constants';
import { heightSchemaSettingsItem } from './items/height';
import { imagesSchemaSettingsItem } from './items/images';

export const carouselSettings = new SchemaSettings({
  name: `blockSettings:${BlockNameLowercase}`,
  items: [
    {
      name: 'editBlockTitle',
      Component: SchemaSettingsBlockTitleItem,
    },
    // TODO
    imagesSchemaSettingsItem,
    heightSchemaSettingsItem,
    {
      type: 'remove',
      name: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn: {
          'x-component': 'Grid',
        },
      },
    },
  ],
});
