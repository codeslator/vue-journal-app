import { shallowMount } from '@vue/test-utils';
import About from '@/views/About';

describe('About View', () => {
  test('Should match with last snapshot', () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});