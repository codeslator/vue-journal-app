import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab';

describe('Fab Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Fab);
  });

  test('Should to show default icon', () => {
    const iTag = wrapper.find('i');
    expect(iTag.classes('fa-plus')).toBeTruthy()
  });

  test('Should to show icon sent by arguments', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    });
    const iTag = wrapper.find('i');
    expect(iTag.classes('fa-circle')).toBeTruthy()
  });

  test('Should emit the event when fires ckick', () => {
    wrapper.find('button').trigger('click');
    // console.log(wrapper.emitted('on:click'));
    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});