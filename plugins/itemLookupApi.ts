import { Plugin } from '@nuxt/types';
import { AxiosInstance } from 'axios';
import { ItemLookupApi } from '~/api/api';
import { Configuration } from '~/api/configuration';

declare module '@nuxt/types' {
  interface Context {
    $itemLookupApi: ItemLookupApi;
  }

  interface NuxtAppOptions {
    $itemLookupApi: ItemLookupApi;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $itemLookupApi: ItemLookupApi;
  }
}

const itemLookupApiPlugin: Plugin = (context, inject) => {
  const config = new Configuration();

  const itemLookupApi = new ItemLookupApi(
    config,
    '',
    context.$axios as AxiosInstance
  );
  inject('itemLookupApi', itemLookupApi);
};

export default itemLookupApiPlugin;
