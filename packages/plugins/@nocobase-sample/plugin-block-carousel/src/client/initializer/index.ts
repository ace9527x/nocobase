import { SchemaInitializerItemType, useSchemaInitializer } from '@nocobase/client';

import { BlockName, BlockNameLowercase } from '../constants';
import { usePluginTranslation } from '../locale';
import { carouselSchema } from '../schema';

export const carouselInitializerItem: SchemaInitializerItemType = {
  type: 'item',
  name: BlockNameLowercase,
  icon: 'PlayCircleOutlined',
  useComponentProps() {
    const { insert } = useSchemaInitializer();
    const { t } = usePluginTranslation();
    return {
      title: t(BlockName),
      onClick: () => {
        insert(carouselSchema);
      },
    };
  },
};
