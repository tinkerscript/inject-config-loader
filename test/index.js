const assert = require('assert')
const loader = require('../source')

describe('loader', () => {
  const context = {
    addContextDependency: () => assert.fail('addContextDependency is called')
  }

  it('should return full config when no field specified', () => {
    const expected = `export default {"build":{"progress":"minimal"},"front":{"logging":true,"version":"0.0.7"}};`
    const source = loader.call(context)
    assert.equal(source, expected)
  })

  it('should return value of the specified field', () => {
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    const source = loader.call(Object.assign({
      query: {
        field: 'front'
      }
    }, context))

    assert.equal(source, expected)
  })

  it('should register context dependency when watch true', () => {
    let counter = 0;
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    const source = loader.call({
      addContextDependency: () => counter += 1,
      query: {
        field: 'front',
        watch: true,
      },
    })

    assert.equal(source, expected)
    assert.equal(counter, 1)
  })
})
