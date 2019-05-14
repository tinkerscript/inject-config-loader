const assert = require('assert')
const loader = require('../source')

describe('loader', () => {
  const context = {
    addContextDependency: () => {}
  }

	it('should be a function', () => {
    assert.equal(typeof loader, 'function')
  })

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

  it('should register context dependency', () => {
    let counter = 0;
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    const source = loader.call({
      addContextDependency: () => counter += 1,
      query: {
        field: 'front'
      },
    })

    assert.equal(source, expected)
    assert.equal(counter, 1)
  })
})
