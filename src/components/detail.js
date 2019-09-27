import { Component, h } from 'splay'
import '@css/components/detail.less'

class Detail extends Component {
  init ({ postData }) {
    this.data = postData.data
  }

  render () {
    return (
      <div className="detail">
        <h1>Détail</h1>
        <div className="detail-sentence">{this.data.name + ' is ' + this.data.work + ' !'}</div>
        <i>Use Back key for going to previous page</i>
      </div>
    )
  }
}

export default Detail
