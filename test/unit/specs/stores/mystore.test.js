import MyStore from '@stores/mystore'

describe('MyStore', () => {
  test('getSampleData', done => {
    MyStore.getSampleData().then(data => {
      expect(data.length).toEqual(3)
      done()
    })
  })
})
