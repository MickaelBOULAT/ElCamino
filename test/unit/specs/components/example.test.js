import Example from '@components/example'

describe('Example', () => {
  test('render', done => {
    const example = new Example({ master: true })
    example.isReady.then(() => {
      expect(example.$el.classList.contains('example')).toBeTruthy()
      done()
    })
  })
})
