var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API : '"https://easy-mock.com/mock/5b0c0b531725f034fca4cd00/weishequ/"'
})
