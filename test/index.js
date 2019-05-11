const assert = require('assert')
const loader = require('../source')

describe('loader', () => {
	it('should be a function', () => {
    assert.equal(typeof loader, 'function')
  })

  it('should return full config when no field specified', () => {
    const expected = `export default {"build":{"progress":"minimal"},"front":{"logging":true,"version":"0.0.7"}};`
    const source = loader()
    assert.equal(source, expected)
  })

  it('should return value of the specified field', () => {
    const expected = `export default {"logging":true,"version":"0.0.7"};`
    const source = loader.call({
      query: {
        field: 'front'
      }
    })

    assert.equal(source, expected)
  })
})
