<template>
  <navbar />
  <div class="container-fluid">
    <div class="row pt-2" v-if="isLoading">
      <div class="col-3 m-auto">
        <div class="alert-info text-center p-2">
          <h4>Please Wait...</h4>
          <h5 class="mt-2">
            <i class="fa fa-sync fa-spin"></i>
          </h5>
        </div>
      </div>
    </div>
    <div class="row pt-2" v-else>
      <div class="col-4">
        <entry-list />
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
  <!-- <fab @on:click="createEntry" /> -->

</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  name: 'DaybookLayout',
  components: {
    Navbar: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DaybookNavbar" */ "@/modules/daybook/components/Navbar"
      )
    ),
    EntryList: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DaybookEntryList" */ "@/modules/daybook/components/EntryList"
      )
    ),
    // Fab: defineAsyncComponent(() =>
    //   import(
    //     /* webpackChunkName: "DaybookFab" */ "@/modules/daybook/components/Fab"
    //   )
    // ),
  },
  computed: {
    ...mapState("journal", ["isLoading"]),
  },
  methods: {
    ...mapActions("journal", ["fetchEntries"]),
    
  },
  created() {
    this.fetchEntries();
  },
};
</script>

<style>
</style>