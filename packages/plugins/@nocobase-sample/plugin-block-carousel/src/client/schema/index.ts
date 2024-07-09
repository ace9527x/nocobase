import { useFieldSchema } from '@formily/react';
import { ISchema } from '@nocobase/client';

import { BlockName, BlockNameLowercase } from '../constants';
import { carouselSettings } from '../settings';

export function useCarouselBlockProps() {
  const fieldSchema = useFieldSchema();
  return fieldSchema.parent?.['x-decorator-props']?.[BlockNameLowercase];
}

export const carouselSchema: ISchema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-decorator-props': {
    [BlockNameLowercase]: {},
  },
  'x-settings': carouselSettings.name,
  properties: {
    carousel: {
      type: 'void',
      'x-component': BlockName,
      'x-use-component-props': 'useCarouselBlockProps',
    },
  },
};
