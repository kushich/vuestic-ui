<template>
  <component
    :is="tagComputed"
    ref="rootElement"
    class="va-tab"
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="$props.disabled || parentDisabled"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classComputed"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div
      class="va-tab__content"
      :tabindex="tabIndexComputed"
      @focus="onFocus"
      @click="onTabClick"
      @keydown.enter="onTabKeydown"
      v-on="keyboardFocusListeners"
    >
      <slot>
        <va-icon
          v-if="icon"
          class="va-tab__icon"
          size="small"
          :name="icon"
        />
        <span
          class="va-tab__label"
          v-text="label"
        />
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import {
  useComponentPresetProp,
  useKeyboardOnlyFocus,
  useRouterLink, useRouterLinkProps,
  useColors,
} from '../../../../composables'

import { TabsViewKey, TabsView, TabComponent } from '../../types'

import { VaIcon } from '../../../va-icon'
import { unwrapEl } from '../../../../utils/unwrapEl'

defineOptions({
  name: 'VaTab',
})

const props = defineProps({
  ...useRouterLinkProps,
  ...useComponentPresetProp,
  selected: { type: Boolean, default: false },
  color: { type: String, default: '' },
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean },
  name: { type: [String, Number] },
  tag: { type: String, default: 'div' },
})

const emit = defineEmits(['click', 'keydown-enter', 'focus'])

const rootElement = shallowRef<HTMLElement>()
const tabElement = computed(() => unwrapEl(rootElement.value))

const isActive = ref(false)
const hoverState = ref(false)
const rightSidePosition = ref(0)
const leftSidePosition = ref(0)

const { keyboardFocusListeners, hasKeyboardFocus } = useKeyboardOnlyFocus()

const { tagComputed, hrefComputed, isActiveRouterLink } = useRouterLink(props)
const classComputed = computed(() => ({ 'va-tab--disabled': props.disabled }))
const {
  parentDisabled,
  selectTab,
  moveToTab,
  registerTab,
  unregisterTab,
} = inject<TabsView>(TabsViewKey, {
  parentDisabled: false,
  tabsList: [],
  selectTab: (tab: TabComponent) => tab,
  moveToTab: (tab: TabComponent) => tab,
  registerTab: (tab: TabComponent) => tab,
  unregisterTab: (tab: TabComponent) => tab,
})
const tabIndexComputed = computed(() => (props.disabled || parentDisabled) ? -1 : 0)

const { getColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

const computedStyle = computed(() => ({
  color: hoverState.value || isActive.value ? colorComputed.value : 'inherit',
}))

const updateHoverState = (isHover: boolean) => {
  hoverState.value = isHover
}

const updateSidePositions = () => {
  const componentOffsetLeft = tabElement.value?.offsetLeft || 0
  const componentOffsetWidth = tabElement.value?.offsetWidth || 0

  rightSidePosition.value = componentOffsetLeft + componentOffsetWidth
  leftSidePosition.value = componentOffsetLeft
}

const onTabClick = () => {
  selectTab(tabComponent)
  emit('click')
}

const onTabKeydown = () => {
  selectTab(tabComponent)
  emit('keydown-enter')
}

const onFocus = () => {
  if (hasKeyboardFocus.value) {
    moveToTab(tabComponent)
  }

  emit('focus')
}

const tabComponent: TabComponent = {
  name: computed(() => props.name),
  id: null,
  tabElement,
  isActive,
  tabIndexComputed,
  isActiveRouterLink,
  rightSidePosition,
  leftSidePosition,
  onTabClick,
  onTabKeydown,
  onFocus,
  updateSidePositions,
}

onMounted(() => {
  registerTab(tabComponent)
})

onBeforeUnmount(() => {
  unregisterTab(tabComponent)
})
</script>

<style lang="scss">
@import "../../../../styles/resources";
@import 'variables';

.va-tab {
  align-items: var(--va-tab-align-items);
  display: var(--va-tab-display);
  flex: var(--va-tab-flex);
  font-weight: var(--va-tab-font-weight);
  line-height: var(--va-tab-line-height);
  height: var(--va-tab-height);
  max-width: var(--va-tab-max-width);
  text-align: var(--va-tab-text-align);
  vertical-align: var(--va-tab-vertical-align);
  color: var(--va-tab-color);

  &__content {
    align-items: var(--va-tab-content-align-items);
    color: var(--va-tab-content-color);
    display: var(--va-tab-content-display);
    flex: var(--va-tab-content-flex);
    height: var(--va-tab-content-height);
    justify-content: var(--va-tab-content-justify-content);
    max-width: var(--va-tab-content-max-width);
    text-decoration: var(--va-tab-content-text-decoration);
    transition: var(--va-tab-content-transition);
    user-select: var(--va-tab-content-user-select);
    white-space: var(--va-tab-content-white-space);
    padding: var(--va-tab-content-padding);
    cursor: var(--va-tab-content-cursor);

    @include keyboard-focus-outline($radius: 2px, $offset: -2px);
  }

  &__icon {
    margin-right: var(--va-tab-icon-margin-right);
  }

  &.va-tab--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
