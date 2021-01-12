<template>
  <span>
    <card v-if="item" :key="item.Id" :item="item" />
  </span>
</template>

<script lang="ts">
import { BaseItemDto } from '@jellyfin/client-axios';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      item: undefined as undefined | BaseItemDto
    };
  }
});
</script>
