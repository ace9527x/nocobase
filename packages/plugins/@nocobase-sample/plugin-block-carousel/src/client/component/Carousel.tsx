import { withDynamicSchemaProps } from '@nocobase/client';
import { Carousel as AntdCarousel, CarouselProps as AntdCarouselProps, Result } from 'antd';
import React, { FC } from 'react';
import { BlockName, BlockNameLowercase } from '../constants';

export interface CarouselProps extends AntdCarouselProps {
  images?: { url: string; title?: string }[];
  /**
   * @default 300
   */
  height?: number;
  /**
   * @default 'cover'
   */
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}

export const Carousel: FC<CarouselProps> = withDynamicSchemaProps((props) => {
  const { images, height = 300, objectFit = 'cover', ...carouselProps } = props;

  console.log(BlockName, BlockNameLowercase, '---> sss');

  return (images && images.length) ? (
    <AntdCarousel {...carouselProps}>
      {images.map((image) => (
        <div key={image.url}>
          <img key={image.title} src={image.url} alt={image.title} style={{ height, width: '100%', objectFit }} />
        </div>
      ))}
    </AntdCarousel>
  ) : <Result status='404' />
}, { displayName: BlockName })
