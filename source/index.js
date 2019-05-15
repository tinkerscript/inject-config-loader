const config = require('config')
const loaderUtils = require('loader-utils')
const getConfigDir = require('./getConfigDir')

module.exports = function () {
  const configDir = getConfigDir()
  const options = loaderUtils.getOptions(this) || {}
  const { field, cache = true } = options;
  let targetConfig = config

  if (!cache) {
    targetConfig = config.util.loadFileConfigs(configDir)
    this.addContextDependency(configDir)
  }

  const data = field ? targetConfig[field] : targetConfig
  const result = `export default ${JSON.stringify(data)};`

  this.value = [result]

  return result
}
