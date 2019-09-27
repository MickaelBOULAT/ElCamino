import { Component, h } from "splay";
import "@css/components/detail.less";

class FiAction extends Component {
  // init({ postData }) {
  //   this.data = postData.data;
  // }

  render() {
    return (
      <ul className="fi__actions">
        <li className="fi__actions-play">Reprendre la lecture</li>
        <li className="fi__actions-replay">
          Reprendre la lecture depuis le début
        </li>
        <li className="fi__actions-suggestions">Titre similaire</li>
        <li className="fi__actions-languages">Audio et sous-titres</li>
        <li className="fi__actions-watch-list">Ajouter à ma liste</li>
      </ul>
    );
  }
}

export default FiAction;
