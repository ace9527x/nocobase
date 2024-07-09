import { useFieldSchema } from '@formily/react';
import { SchemaSettingsItemType, useDesignable } from '@nocobase/client';

import { BlockNameLowercase } from '../../constants';
import { usePluginTranslation } from '../../locale';

export const imagesSchemaSettingsItem: SchemaSettingsItemType = {
  name: 'images',
  type: 'actionModal',
  useComponentProps() {
    const filedSchema = useFieldSchema();
    const { deepMerge } = useDesignable();
    const { t } = usePluginTranslation();

    return {
      title: t('Edit Images'),
      schema: {
        type: 'object',
        title: t('Edit Images'),
        properties: {
          src: {
            title: t('Images'),
            type: 'string',
            default: filedSchema['x-decorator-props'][BlockNameLowercase]?.images ?? [],
            'x-decorator': 'FormItem',
            'x-component': 'Upload.Attachment',
            'x-component-props': {
              action: 'attachments:create',
              multiple: true,
            },
          },
        },
      },
      onSubmit({ src: images }: any) {
        deepMerge({
          'x-uid': filedSchema['x-uid'],
          'x-decorator-props': {
            ...filedSchema['x-decorator-props'],
            [BlockNameLowercase]: {
              ...filedSchema['x-decorator-props']?.[BlockNameLowercase],
              images,
            },
          },
        });
      },
    };
  },
};
