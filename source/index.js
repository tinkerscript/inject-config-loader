const config = require('config')
const loaderUtils = require('loader-utils')
const getConfigDir = require('./getConfigDir')

module.exports = function () {
  const configDir = getConfigDir();
  const options = loaderUtils.getOptions(this) || {}
  const fuzzyConfig = config.util.loadFileConfigs(configDir)
  const data = options.field ? fuzzyConfig[options.field] : fuzzyConfig
  const result = `export default ${JSON.stringify(data)};`
  this.addContextDependency(configDir)

  this.value = [result]

  return result
}
