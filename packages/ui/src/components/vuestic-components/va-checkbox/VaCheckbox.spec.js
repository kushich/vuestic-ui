import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import VaCheckbox from './VaCheckbox'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsFormComponent } from '../../vuestic-mixins/testIsFormComponent'
import { testIsSelectableComponent } from '../../vuestic-mixins/testIsSelectableComponent'

Vue.use(ColorThemePlugin)

describe('VaCheckbox', () => {
  // TODO: need fix icon with context-config

  it('default', () => {
    const wrapper = shallowMount(VaCheckbox, {
      propsData: { value: false },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('true value', () => {
    const wrapper = shallowMount(VaCheckbox, {
      propsData: { value: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('is Form Component', () => {
    expect(() => testIsFormComponent(VaCheckbox)).not.toThrow()
  })
  it('is Selected Component', () => {
    expect(() => testIsSelectableComponent(VaCheckbox)).not.toThrow()
  })
})
