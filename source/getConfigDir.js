const path = require('path')

module.exports = () => {
  if (process.env.NODE_CONFIG_DIR) {
    return process.env.NODE_CONFIG_DIR
  }

  return path.join(process.cwd(), 'config')
}
