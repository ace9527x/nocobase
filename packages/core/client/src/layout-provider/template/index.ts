import { merge } from 'lodash';

export const mergeLayoutTemp = (temp, config) => {
  return merge(temp, config);
};
