import { Plugin } from '@nocobase/client';

import { Carousel } from './component';
import { carouselInitializerItem } from './initializer';
import { useCarouselBlockProps } from './schema';
import { carouselSettings } from './settings';

export class PluginBlockCarouselClient extends Plugin {
  async load() {
    this.app.addComponents({ Carousel });
    this.app.schemaSettingsManager.add(carouselSettings);
    this.app.addScopes({ useCarouselBlockProps });

    this.app.schemaInitializerManager.addItem('page:addBlock', `otherBlocks.${carouselInitializerItem.name}`, carouselInitializerItem)


    this.app.router.add('admin.carousel-component', {
      path: '/admin/carousel-component',
      Component: () => {
        const images = [{ url: 'https://picsum.photos/id/1/1200/300' }, { url: 'https://picsum.photos/id/2/1200/300' }];
        return <>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Carousel />
          </div>

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Carousel images={images} />
          </div>

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Carousel images={images} height={100} />
          </div>

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Carousel images={images} objectFit='contain' />
          </div>


          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Carousel images={images} autoplay />
          </div>
        </>
      }
    });
  }

}

export default PluginBlockCarouselClient;
