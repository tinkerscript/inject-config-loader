const path = require('path')
const assert = require('assert')

describe('loader', () => {
  const context = {
    addContextDependency: () => assert.fail('addContextDependency is called')
  }

  beforeEach(() => {
    delete require.cache[require.resolve('config')];
  })

  it('should return full config when no field specified', done => {
    process.env.NODE_CONFIG_DIR = 'test/config'

    const loader = require('../source')
    const expected = `export default {"build":{"progress":"minimal"},"front":{"logging":true,"version":"0.0.7"}};`
    
    loader.call(Object.assign({
      async: () => (err, content) => {
        assert.equal(content, expected)
        done()
      }
    }, context))
  })

  it('should return value of the specified field', done => {
    process.env.NODE_CONFIG_DIR = 'test/config'

    const loader = require('../source')
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    
    loader.call(Object.assign({
      query: {
        field: 'front'
      },
      async: () => (err, content) => {
        assert.equal(content, expected)
        done()
      }
    }, context))
  })

  it('should return value of the specified nested field', done => {
    process.env.NODE_CONFIG_DIR = 'test/config'

    const loader = require('../source')
    const expected = `export default "0.0.7";`
    
    loader.call(Object.assign({
      query: {
        field: 'front.version'
      },
      async: () => (err, content) => {
        assert.equal(content, expected)
        done()
      }
    }, context))
  })

  it('should register context dependency when cache is false', done => {
    process.env.NODE_CONFIG_DIR = 'test/config'

    const loader = require('../source')
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    let counter = 0;
    
    loader.call({
      addContextDependency: () => counter += 1,
      async: () => (err, content) => {
        assert.equal(content, expected)
        assert.equal(counter, 1)
        done()
      },
      query: {
        field: 'front',
        cache: false,
      },
    })
  })

  it('should fail to add context dependency when no config folder found', done => {
    delete process.env.NODE_CONFIG_DIR
    process.env.SUPPRESS_NO_CONFIG_WARNING = true

    const loader = require('../source')
    loader.call(Object.assign({
      addContextDependency: () => {},
      async: () => err => {
        assert.equal(
          err.message,
          `Can't find config folder at ${path.join(process.cwd(), 'config')}`
        )
        done()
      },
      query: {
        cache: false
      }
    }))
  })
})
