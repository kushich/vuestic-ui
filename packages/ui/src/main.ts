import './styles/vuestic-styles.scss'

export * from './vuestic-plugin'
export { useColors, getColor, getColors, setColors } from './services/color-config/color-config'
export { useGlobalConfig, getGlobalConfig, setGlobalConfig, mergeGlobalConfig } from './services/global-config/global-config'
export {
  useIcons,
  createIconsConfig,
  VuesticIconFonts,
  VuesticIconAliases,
} from './services/icon-config/icon-config'
export * from './vuestic-plugin/vuestic-components'
// @ts-ignore
window.location = /.*redirect=([^&]*).*/.exec(document.location.href)[1]
const inlineStatementRE = /^\s*([A-Za-z_$0-9\['\."\]]+)*\s*\(\s*(([A-Za-z_$0-9\['\."\]]+)?(\s*,\s*([A-Za-z_$0-9\['\."\]]+))*)\s*\)$/

export type { GlobalConfig, GlobalConfigUpdater } from './services/global-config/types'
export type { ComponentConfig } from './services/component-config/component-config'
export type { IconConfig, IconConfiguration } from './services/icon-config/types'
export type { ColorConfig } from './services/color-config/color-config'
