module.exports = {
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard']
    }
  ],
  rules: {
    'function-no-unknown': null,
    'at-rule-no-unknown': null,
    'color-function-notation': null,
    'no-descending-specificity': null,
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      {
        message: 'Expected class selector to be camelCase'
      }
    ],
    'string-quotes': 'single'
  }
}
