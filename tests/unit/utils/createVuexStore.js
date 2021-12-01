import { createStore } from 'vuex';

export const createVuexStore = (initialState, moduleStore) => createStore({
  modules: {
    journal: {
      ...moduleStore,
      state: { ...initialState }
    },
  }
});