import { createStore } from 'vuex';
import journalStore from '@/modules/daybook/store';

const store = createStore({
  modules: {
    journal: journalStore,
  }
});

export default store;