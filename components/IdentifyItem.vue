<template>
  <div class="identifyItemContainer">
    <h2 class="mb-3">{{ $t('identify') }}</h2>
    <v-text-field
      v-model="itemName"
      outlined
      :label="$t('name')"
      type="text"
      @keyup.enter="lookupData"
    />
    <v-btn
      color="primary"
      :disabled="loading"
      :loading="loading"
      @click="lookupData"
      >{{ $t('search') }}</v-btn
    >
    <v-checkbox v-model="replaceImages" label="Replace Existing Images" />
    <div>
      <v-card
        v-for="result in searchResults"
        :key="result.ProviderIds.Imdb"
        class="mb-5"
        @click="setItem(result)"
      >
        <v-img v-if="result.ImageUrl" :src="getSearchImage(result.ImageUrl)" />
        <v-card-title>{{ result.Name }}</v-card-title>
        <v-card-subtitle>{{ result.SearchProviderName }}</v-card-subtitle>
      </v-card>
      <v-card v-if="!searchResult">
        <v-card-title>{{ $t('noItemsFound') }}</v-card-title>
        <v-card-sub-title>{{ $t('widenQuery') }}</v-card-sub-title>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BaseItemDto, RemoteSearchResult } from '~/api/api';

export default Vue.extend({
  props: {
    item: {
      type: Object as () => BaseItemDto,
      required: true,
      default: {}
    }
  },
  data() {
    return {
      itemName: '',
      searchResults: [] as RemoteSearchResult[],
      replaceImages: true,
      loading: false
    };
  },
  methods: {
    async lookupData() {
      this.loading = true;
      // TODO Add support for searching by IMDB/TVDB/Zap2It
      // TODO Add support for filtering by adding production year

      switch (this.$props.item.Type) {
        case 'Series': {
          const response = await this.$itemLookupApi.getSeriesRemoteSearchResults(
            {
              seriesInfoRemoteSearchQuery: {
                SearchInfo: { Name: this.itemName },
                ItemId: this.$props.itemId
              }
            }
          );
          this.searchResults = response.data;
          break;
        }
        case 'Movie': {
          const response = await this.$itemLookupApi.getMovieRemoteSearchResults(
            {
              movieInfoRemoteSearchQuery: {
                SearchInfo: { Name: this.itemName },
                ItemId: this.$props.itemId
              }
            }
          );
          this.searchResults = response.data;
          break;
        }
      }

      this.loading = false;
    },
    async setItem(info: RemoteSearchResult) {
      try {
        const response = await this.$itemLookupApi.applySearchCriteria({
          remoteSearchResult: info,
          itemId: this.$props.itemId,
          id: this.$props.itemId,
          replaceAllImages: this.replaceImages
        });

        if (response.status === 204) {
          this.$snackbar(this.$t('itemIdentified') as string, 'success');
          this.$emit('identified');
        }
      } catch (error) {
        this.$snackbar(error, 'error');
      }
    },
    getSearchImage(imageUrl: string) {
      return `${this.$axios.defaults.baseURL}/Items/RemoteSearch/Image?imageUrl=${imageUrl}&ProviderName=The%20Open%20Movie%20Database`;
    }
  }
});
</script>

<style lang="scss" scoped>
.identifyItemContainer {
  padding: 0.5em;
}
</style>
