<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No entry selected yet!</h1>
  </div>
  <fab @on:click="createEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: 'NoEntrySelectedView',
  components: {
    Fab: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DaybookFab" */ "@/modules/daybook/components/Fab"
      )
    ),
  },
  methods: {
    createEntry() {
      this.$router.push({ name: 'entry', params: { id: 'new' } })
    }
  }
}
</script>

<style scoped lang="scss">
  div {
    height: 100%;
  }
</style>