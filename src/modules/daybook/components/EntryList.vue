<template>
  <div class="container-fluid entry-list">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Search entry"
        >
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="entry-list-scrollable">
          <entry-item v-for="entry in 100" :key="entry">Hello</entry-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    EntryItem: defineAsyncComponent(() => import(/* webpackChunkName: "DaybookEntryItem" */ '@/modules/daybook/components/EntryItem')),
  }
}
</script>

<style lang="scss" scoped>
  .entry-list {
    border-right: 1px dashed #34495e;
    height: 100%;
  }

  .entry-list-scrollable {
    overflow: scroll;
    height: calc(100vh - 115px);
    width: 100%;
    overflow-x: hidden;
  }
</style>