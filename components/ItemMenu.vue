<template>
  <div v-if="actions.length > 0">
    <v-menu absolute>
      <template #activator="{ on, attrs }">
        <v-btn
          class="card-more-button"
          icon
          small
          dark
          v-bind="attrs"
          v-on="on"
          @click.stop.prevent
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(action, index) in actions"
          :key="index"
          @click="action.action"
        >
          <v-list-item-title>{{ action.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <metadata-editor-dialog :dialog.sync="metadataDialog" :item-id="item.Id" />
    <identify-item-dialog :dialog.sync="identifyDialog" :item="item" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BaseItemDto } from '@jellyfin/client-axios';

type MenuItem = {
  title: string;
  action: () => void;
};

export default Vue.extend({
  props: {
    item: {
      type: Object as () => BaseItemDto,
      default: {}
    }
  },
  data() {
    return {
      metadataDialog: false,
      identifyDialog: false
    };
  },
  computed: {
    actions: {
      get(): MenuItem[] {
        const menuItems = [] as MenuItem[];
        if (this.$auth.$state.user.Policy.IsAdministrator) {
          menuItems.push({
            title: this.$t('editMetadata') as string,
            action: () => {
              this.metadataDialog = true;
            }
          });
          menuItems.push({
            title: this.$t('identifyItem') as string,
            action: () => {
              this.identifyDialog = true;
            }
          });
        }
        return menuItems;
      }
    }
  }
});
</script>

<style scoped>
.card-more-button {
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
}
</style>
