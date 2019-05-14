const config = require('config')
const loaderUtils = require('loader-utils')
const getConfigDir = require('./getConfigDir')

module.exports = function () {
  const configDir = getConfigDir()
  const options = loaderUtils.getOptions(this) || {}
  let targetConfig = config

  if (options.watch) {
    targetConfig = config.util.loadFileConfigs(configDir)
    this.addContextDependency(configDir)
  }

  const data = options.field ? targetConfig[options.field] : targetConfig
  const result = `export default ${JSON.stringify(data)};`

  this.value = [result]

  return result
}
