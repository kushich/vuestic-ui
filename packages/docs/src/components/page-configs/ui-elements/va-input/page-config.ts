import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaInput from 'vuestic-ui/src/components/va-input/VaInput.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-input'

const config: ApiDocsBlock[] = [
  DocsHelper.title('input.title'),
  DocsHelper.paragraph('input.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'input.examples.default.title',
    'input.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.styles.title',
    'input.examples.styles.text',
    configPath,
    'Styles',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.hint.title',
    'input.examples.hint.text',
    configPath,
    'Hint',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.validate.title',
    'input.examples.validate.text',
    configPath,
    'Validate',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.slots.title',
    'input.examples.slots.text',
    configPath,
    'Slots',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.textarea.title',
    'input.examples.textarea.text',
    configPath,
    'Textarea',
  ),
  ...DocsHelper.exampleBlock(
    'input.examples.mask.title',
    'input.examples.mask.text',
    configPath,
    'Mask',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaInput, apiOptions),
]

export default config
