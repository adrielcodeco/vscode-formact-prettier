module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0],
    'footer-max-length': [0],
    'header-max-length': [0],
    'scope-enum': [2, 'always', ['deps', 'deps-dev', 'ci', 'devops', 'release']],
  },
}
