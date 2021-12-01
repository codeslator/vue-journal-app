import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { daybookState } from '../../../mocks/daybook-state';
import journalStore from '@/modules/daybook/store/';
import EntryList from '@/modules/daybook/components/EntryList';

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journalStore,
      state: { ...initialState }
    },
  }
});

describe('Entry List Component', () => {
  // const journalModuleMock = {
  //   namespaced: true,
  //   getters: {
  //     getEntriesByTerm,
  //   },
  //   state: () => ({
  //     isLoading: false,
  //     entries: daybookState.entries
  //   })
  // };

  // const store = createStore({
  //   modules: {
  //     journal: {
  //       ...journalModuleMock,
  //     }
  //   }
  // });

  const store = createVuexStore(daybookState);
  let wrapper;

  const mockRouter = {
    push: jest.fn(),
  };


  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store]
      }
    });
  })

  test('Should match with last snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  })

  test('Should call getEntriesByTerm() without term and show 2 entries', () => {
    expect(wrapper.findAll('entry-item-stub').length).toBe(2);
  });

  test('Should to call getEntriesByTerm() and filter the entries', async () => {
    const input = wrapper.find('input');
    await input.setValue('mundo');
    expect(wrapper.findAll('entry-item-stub').length).toBe(1);
  });

  test('Button should to redirect to new', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } });
  })
})