import { createStore } from 'vuex';
import journalStore from '@/modules/daybook/store/';
import { daybookState } from '../../../mocks/daybook-state';

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journalStore,
      state: { ...initialState }
    },
  }
});

describe('Daybook Module Vuex Store Test', () => {
  // Configuracion y estado
  test('Should match with initial state', () => {
    const store = createVuexStore(daybookState);
    const { isLoading, entries } = store.state.journal;
    // console.log(store.state)
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(daybookState.entries);
  });
  
  // Mutations ========
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit('journal/setEntries', daybookState.entries);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutation: updateEntry', () => {
    const store = createVuexStore(daybookState);
    const updatedEntry = {
      id: '-MojfF3krYcTW3t1GL6Z',
      date: 1637182378850,
      text: 'Hola mundo desde pruebas'
    };
    store.commit('journal/updateEntry', updatedEntry);

    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  test('mutation: addEntry', () => {
    const store = createVuexStore(daybookState);
    const newEntry = {
      id: 'abc123456',
      date: 1637182378850,
      text: 'Nueva entrada'
    };
    store.commit('journal/addEntry', newEntry);
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(3);
    expect(storeEntries.find((entry) => entry.id === newEntry.id)).toBeTruthy();
    // expect(storeEntries.find((entry) => entry.id === newEntry.id).id).toBe(newEntry.id);
  });

  test('mutation: deleteEntry', () => {
    const store = createVuexStore(daybookState);
    const id = 'abc123';
    store.commit('journal/deleteEntry', id);
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(1);
    expect(storeEntries.find((entry) => entry.id === id)).toBeFalsy();
  });

  // Getters ===========
  test('getter: getEntriesByTerm', () => {
    const store = createVuexStore(daybookState);
    const [entry1, entry2] = daybookState.entries;
    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntriesByTerm']('mundo').length).toBe(1); //mundo
    expect(store.getters['journal/getEntriesByTerm']('mundo')).toEqual([ entry1 ]); //mundo
    expect(store.getters['journal/getEntriesByTerm']('lorem')).toEqual([ entry2 ]); //mundo
  });

  test('getter: getEntriesById', () => {
    const store = createVuexStore(daybookState);
    const [entry1, ] = daybookState.entries;
    expect(store.getters['journal/getEntry'](entry1.id)).toEqual(entry1);
  });


  // Actions ===========

  test('actions: fetchEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch('journal/fetchEntries');
    expect(store.state.journal.entries.length).toBe(3)
  });

  test('actions: updateEntry', async () => {
    const store = createVuexStore(daybookState);
    const updateEntry = {
      id: '-MojfF3krYcTW3t1GL6Z',
      date: 1637182378850,
      picture: 'https://res.cloudinary.com/codeslator/image/upload/v1637182405/journal-app/qzqn1sci7pby0yvcft2s.jpg',
      text: 'Hola mundo por la parte de tests',
      otroCampo: {},
      otroMas: true,
    };
    await store.dispatch('journal/updateEntry', updateEntry);
    const entries = store.state.journal.entries;
    expect(entries.length).toBe(2)
    expect(entries.find((entry) => entry.id === updateEntry.id)).toEqual({
      id: '-MojfF3krYcTW3t1GL6Z',
      date: 1637182378850,
      picture: 'https://res.cloudinary.com/codeslator/image/upload/v1637182405/journal-app/qzqn1sci7pby0yvcft2s.jpg',
      text: 'Hola mundo por la parte de tests',
    });
  });


  test('actions: saveEntry', async () => {
    const store = createVuexStore(daybookState);
    const newEntry = {
      date: new Date().getTime(),
      text: 'New entry from test',
    };
    const id = await store.dispatch('journal/saveEntry', newEntry);
    const entries = store.state.journal.entries;
    expect(typeof id).toBe('string');
    expect(entries.find((entry) => entry.id === id)).toBeTruthy();
  });

  test('actions: deleteEntry', async () => {
    const store = createVuexStore(daybookState);
    const id = 'abc123';
    await store.dispatch('journal/deleteEntry', id);
    const entries = store.state.journal.entries;
    expect(entries.find((entry) => entry.id === id)).toBeFalsy();
  });
});