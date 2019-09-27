export default class MyStore {
  static getSampleData () {
    return Promise.resolve([
      { name: 'John Doe', work: 'Developer' },
      { name: 'Will Smith', work: 'Actor' },
      { name: 'Borat', work: 'Reporter' }
    ])
  }
}
