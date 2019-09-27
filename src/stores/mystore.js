import { infos } from '../_helpers/infos'

export default class MyStore {
  static getSampleData () {
    return Promise.resolve(infos)
  }
}
