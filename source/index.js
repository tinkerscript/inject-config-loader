const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const nestedProperty = require('nested-property')

const performLoading = (cache, addContextDependency) => new Promise((resolve, reject) => {
  const config = require('config')

  if (cache) {
    resolve(config.util.toObject(config))
  } else {
    let configDir = path.join(process.cwd(), 'config')

    if (process.env.NODE_CONFIG_DIR) {
      configDir = process.env.NODE_CONFIG_DIR
    }
  
    fs.access(configDir, err => {
      if (err) {
          reject(new Error(`Can't find config folder at ${configDir}`))
          return
      }

      addContextDependency(configDir)
      resolve(config.util.loadFileConfigs(configDir))
    })
  }
})

module.exports = function () {
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}
  const { field, cache = true } = options;

  performLoading(cache, this.addContextDependency).then(config => {
    const data = field ? nestedProperty.get(config, field) : config
    const result = `export default ${JSON.stringify(data)};`
    callback(null, result)
  }).catch(err => {
    callback(err)
  })
}
