<template>
  <li
    ref="stepElement"
    class="va-stepper__step-button"
    :class="computedClass"
    @click="!$props.navigationDisabled && $props.stepControls.setStep($props.stepIndex)"
    @keyup.enter="!$props.navigationDisabled && $props.stepControls.setStep($props.stepIndex)"
    @keyup.space="!$props.navigationDisabled && $props.stepControls.setStep($props.stepIndex)"
    v-bind="ariaAttributesComputed"
  >
    <div class="va-stepper__step-button__icon">
      <va-icon
        v-if="step.icon"
        :name="step.icon"
        size="1.3rem"
      />
      <template v-else>
        {{ $props.stepIndex + 1 }}
      </template>
    </div>
    {{ step.label }}
  </li>
</template>
<script lang="ts" setup>
import { computed, nextTick, PropType, shallowRef, watch } from 'vue'
import { VaIcon } from '../va-icon'
import { useBem, useColors, useTranslation } from '../../composables'
import type { Step, StepControls } from './types'
import { unFunction } from '../../utils/un-function'
import { isStepHasError } from './step'

defineOptions({
  name: 'VaStepperStepButton',
})

const props = defineProps({
  modelValue: { type: Number, required: true },
  step: {
    type: Object as PropType<Step>,
    required: true,
  },
  color: { type: String, required: true },
  stepIndex: { type: Number, required: true },
  navigationDisabled: { type: Boolean, required: true },
  nextDisabled: { type: Boolean, required: true },
  focus: { type: Object, required: true },
  stepControls: { type: Object as PropType<StepControls>, required: true },
})

const emit = defineEmits(['update:modelValue'])

const stepElement = shallowRef<HTMLElement>()
const hasError = computed(() => isStepHasError(props.step))
const displayError = computed(() => hasError.value && props.modelValue === props.stepIndex)
const { getColor } = useColors()
const stepperColor = computed(() => getColor(hasError.value ? 'danger' : props.color))

const isNextStepDisabled = (index: number) => props.nextDisabled && index > props.modelValue

const { t } = useTranslation()

const computedClass = useBem('va-stepper__step-button', () => ({
  active: props.modelValue >= props.stepIndex,
  disabled: props.step.disabled || isNextStepDisabled(props.stepIndex),
  'navigation-disabled': props.navigationDisabled,
  error: displayError.value,
}))

watch(() => props.focus, () => {
  if (props.focus.trigger) {
    nextTick(() => stepElement.value?.focus())
  }
}, { deep: true })

const ariaAttributesComputed = computed(() => ({
  tabindex: props.focus.stepIndex === props.stepIndex && !props.navigationDisabled ? 0 : undefined,
  'aria-disabled': props.step.disabled || isNextStepDisabled(props.stepIndex) ? true : undefined,
  'aria-current': props.modelValue === props.stepIndex ? t('step') as 'step' : undefined,
}))
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-stepper {
  &__step-button {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--va-stepper-step-button-gap);
    flex-shrink: 0;
    padding: var(--va-stepper-step-button-padding);

    @include keyboard-focus-outline($radius: var(--va-stepper-step-border-radius));

    &::after {
      content: "";
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: v-bind(stepperColor);
      transition: opacity 0.3s;
      opacity: 0;
      border-radius: var(--va-stepper-step-border-radius);
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--va-stepper-step-button-icon-size);
      width: var(--va-stepper-step-button-icon-size);
      font-size: var(--va-stepper-step-button-number-size);
      color: white;
      background: var(--va-stepper-step-button-inactive-color);
      border-radius: var(--va-stepper-step-button-icon-border-radius);
    }

    &--active {
      color: v-bind(stepperColor);

      .va-stepper__step-button__icon {
        background: v-bind(stepperColor);
      }
    }

    &--disabled {
      opacity: var(--va-stepper-step-button-disabled-opacity);
      pointer-events: none;
    }

    &:hover::after {
      opacity: var(--va-stepper-step-button-hover-highlight-opacity);
    }

    &--navigation-disabled::after {
      display: none;
    }

    &--error {
      color: var(--va-danger);

      .va-stepper__step-button__icon {
        background: var(--va-danger);
      }
    }
  }
}
</style>
