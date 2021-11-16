<template>
  <navbar />
  <div class="container-fluid">
  <div class="row pt-2">
    <div class="col-4">
      <entry-list />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
  <fab />
</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "DaybookNavbar" */ '@/modules/daybook/components/Navbar')),
    EntryList: defineAsyncComponent(() => import(/* webpackChunkName: "DaybookEntryList" */ '@/modules/daybook/components/EntryList')),
    Fab: defineAsyncComponent(() => import(/* webpackChunkName: "DaybookFab" */ '@/modules/daybook/components/Fab')),
  }
}
</script>

<style>

</style>