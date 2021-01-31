/**
 * Mixin to handle item updates
 *
 * @mixin
 */
import Vue from 'vue';
import { BaseItemDto } from '@jellyfin/client-axios';

declare module '@nuxt/types' {
  interface Context {
    manualUpdate: boolean;
    item: BaseItemDto;
  }

  interface NuxtAppOptions {
    manualUpdate: boolean;
    item: BaseItemDto;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    item: BaseItemDto;
    manualUpdate: boolean;
  }
}

const itemUpdate = Vue.extend({
  props: {
    item: {
      type: Object as () => BaseItemDto,
      required: true
    },
    manualUpdate: {
      type: Boolean
    }
  },
  created() {
    if (!this.manualUpdate) {
      this.$store.subscribe(async (mutation, state) => {
        if (
          this.item.Id &&
          mutation?.type === 'SOCKET_ONMESSAGE' &&
          state.socket.message.MessageType === 'LibraryChanged' &&
          state.socket.message.Data.ItemsUpdated.includes(this.item.Id)
        ) {
          const updatedItem = (
            await this.$api.userLibrary.getItem({
              userId: this.$auth.user?.Id,
              itemId: this.item.Id
            })
          ).data;

          this.$emit('item-updated', { updatedItem });
        }
      });
    }
  }
});

export default itemUpdate;
