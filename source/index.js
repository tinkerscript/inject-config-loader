const config = require('config')
const loaderUtils = require('loader-utils')

module.exports = function () {
  const options = loaderUtils.getOptions(this) || {}
  const data = options.field ? config.get(`${options.field}`) : config.util.toObject(config)
  const result = `module.exports = ${JSON.stringify(data)};`
  this.value = [result]
  return result
}
