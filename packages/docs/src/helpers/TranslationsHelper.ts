function translateInterpolation (code: string, $t: (s: string) => string) {
  const replaces = code.match(/{{\s*?(?:\$t)\(.*?\)\s*?}}/g) || []

  return replaces.reduce((acc, source) => {
    const translation = source.replace(/({{\s*|\$t|'|\(|\)|\[\d\])|\s*}}/gi, '')
    return acc.replace(source, $t(translation))
  }, code)
}

function translateOthers (code: string, $t: (s: string) => string) {
  const replaces = code.match(/(?:\$t)\(.*?\)/g) || []

  return replaces.reduce((acc, source) => {
    const translation = source.replace(/(\$t|'|\(|\)|\[\d\])/gi, '')
    return acc.replace(source, `'${$t(translation)}'`)
  }, code)
}

function translateComments (code: string, $t: (s: string) => string) {
  const slashReplaces = code.match(/(?:\/\/\s\$t)\(.*?\)/g) || []
  const dashReplaces = code.match(/(?:\s-\s\$t)\(.*?\)/g) || []

  const replacedSlashCode = slashReplaces.reduce((acc, source) => {
    const translation = source.replace(/(\/\/\s\$t|'|\(|\)|\[\d\])/gi, '')
    return acc.replace(source, `// ${$t(translation)}`)
  }, code)

  return dashReplaces.reduce((acc, source) => {
    const translation = source.replace(/(\s-\s\$t|'|\(|\)|\[\d\])/gi, '')
    return acc.replace(source, ` - ${$t(translation)}`)
  }, replacedSlashCode)
}

/**
 * Find `$t` inside a code and replace it with translation by regex.
 * origin: `... $t('to replace') ...`
 * output: `... translated ...`
 */
export function applyTranslations (this: any, code: string) {
  return translateOthers(translateInterpolation(translateComments(code, this.$t), this.$t), this.$t)
}
