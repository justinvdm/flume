module.exports = require('@oftherivier/tools/eslint/es5')(({ join }) => ({
  overrides: join(overrides =>
    overrides.filter(d =>
      d.plugins.includes('es5')
        ? {
            parserOptions: {
              ...d.parserOptions,
              sourceType: 'module'
            }
          }
        : d
    )
  )
}))
