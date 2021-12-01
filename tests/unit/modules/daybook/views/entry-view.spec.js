import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Swal from 'sweetalert2';
import { daybookState } from '../../../mocks/daybook-state';
import journalStore from '@/modules/daybook/store/';
import EntryView from '@/modules/daybook/views/EntryView';

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journalStore,
      state: { ...initialState }
    },
  }
});

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn()
})); // Crea un mock de la instancia de la libreria y retorna l;as funciones y datos del objeto

describe('Entry View', () => {
  const store = createVuexStore(daybookState);
  store.dispatch = jest.fn();
  let wrapper;

  const mockRouter = {
    push: jest.fn(),
  };


  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: daybookState.entries[0].id
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store]
      }
    });
  })

  test('Should to redirect if id doesn\'t exists', () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'id not found'
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store]
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test('Should to show the entry correctly and match with last snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });


  test('Should to delete the entry and the exit', (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    const button =  wrapper.find('.btn-danger');
    button.trigger('click');
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Are you sure?",
      text: "Once you did it you can't recover data",
      showDenyButton: true,
      confirmButtonText: "I'm sure",
    });
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MojfF3krYcTW3t1GL6Z')
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  })
});
