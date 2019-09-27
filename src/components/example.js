import { Component, h, Router } from 'splay'
import MyStore from '@stores/mystore'
import '@css/components/example.less'

class Example extends Component {
  getData () {
    return MyStore.getSampleData().then(data => { this.data = data })
  }

  get dataToSave () {
    return { data: this.data }
  }

  getList () {
    const arr = []
    for (let i = 0, lgt = this.data.length; i < lgt; i++) {
      arr.push(
        <div className={['example-element', this.focusableClass]}>{this.data[i].name}</div>
      )
    }
    return arr
  }

  render () {
    return (
      <div className="example">
        <h1 className="example-title">Welcome on Demo app !</h1>
        <i>Use keys Up and Down to select an entry, then use Enter !</i>
        { this.getList() }
      </div>
    )
  }

  // Hooks
  mounted () { this.focus(this.current) }

  // Keys
  onKeyUp () { this.focus(this.current - 1) }

  onKeyDown () { this.focus(this.current + 1) }

  onKeyEnter () {
    if (this.data[this.current]) return Router.navigate('detail', { data: this.data[this.current] })
  }
}

export default Example
