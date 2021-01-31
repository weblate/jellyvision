<template>
  <client-only>
    <swiper-section
      :title="section.name"
      :items="items"
      :shape="section.shape"
      :loading="$fetchState.pending"
      @item-updated="onItemUpdate"
    />
  </client-only>
</template>

<script lang="ts">
import { BaseItemDto } from '@jellyfin/client-axios';
import { findIndex } from 'lodash';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { HomeSection } from '~/store/homeSection';

export default Vue.extend({
  props: {
    section: {
      type: Object as () => HomeSection,
      required: true
    }
  },
  async fetch() {
    switch (this.section.type) {
      case 'libraries': {
        await this.getLibraries();
        break;
      }
      case 'resume': {
        await this.getVideoResumes();
        break;
      }
      case 'resumeaudio': {
        await this.getAudioResumes();
        break;
      }
      case 'upnext': {
        await this.getUpNext({
          parentId: this.section.libraryId
        });
        break;
      }
      case 'latestmedia': {
        await this.getLatestMedia({
          parentId: this.section.libraryId
        });
        break;
      }
      default:
        break;
    }
  },
  computed: {
    ...mapGetters('homeSection', ['getHomeSectionContent']),
    items(): BaseItemDto[] {
      return this.getHomeSectionContent(this.section);
    }
  },
  methods: {
    ...mapActions('homeSection', {
      getVideoResumes: 'getVideoResumes',
      getAudioResumes: 'getAudioResumes',
      getUpNext: 'getUpNext',
      getLatestMedia: 'getLatestMedia',
      getLibraries: 'getLibraries'
    }),
    onItemUpdate({ updatedItem }: { updatedItem: BaseItemDto }): void {
      const index = findIndex(this.items, { Id: updatedItem.Id });

      this.items.splice(index, 1, updatedItem);
    }
  }
});
</script>
