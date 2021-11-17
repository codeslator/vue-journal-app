<template>
  <div class="container-fluid entry-list">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Search entry"
          v-model="term"
        />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <button
          class="btn btn-secondary btn-full"
          @click="$router.push({ name: 'entry', params: { id: 'new' } })"
        >
          <i class="fa fa-plus-circle"></i>
          New Entry
        </button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="entry-list-scrollable">
          <entry-item
            v-for="entry in filteredEntries"
            :key="entry.id"
            :entry="entry"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EntryItem: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DaybookEntryItem" */ "@/modules/daybook/components/EntryItem"
      )
    ),
  },
  data() {
    return {
      term: "",
    };
  },
  computed: {
    ...mapGetters("journal", {
      entries: "getEntriesByTerm",
    }),
    filteredEntries() {
      return this.entries(this.term);
    },
  },
};
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

.btn-full {
  width: 100%;
}
</style>