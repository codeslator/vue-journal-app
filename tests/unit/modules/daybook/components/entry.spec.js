import { shallowMount } from '@vue/test-utils';
import EntryItem from '@/modules/daybook/components/EntryItem';
import { daybookState } from '../../../mocks/daybook-state';

describe('Entry Component', () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  }; // Mock del router

  beforeEach(() => {
    wrapper = shallowMount(EntryItem, {
      props: {
        entry: daybookState.entries[0],
      },
      global: { // Configuracion global
        mocks: {
          $router: mockRouter,
        }
      }
    })
  });


  test('Should match with last snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Should to redirect to click in entry-card', () => {
    const entryCard = wrapper.find('.entry-card');
    entryCard.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: daybookState.entries[0].id
      }
    })
  });

  test('Should test computed properties', () => {
    expect(wrapper.vm.day).toBe(3);
    expect(wrapper.vm.month).toBe('Noviembre');
    expect(wrapper.vm.yearDay).toBe('2021, Miércoles');
  });
})