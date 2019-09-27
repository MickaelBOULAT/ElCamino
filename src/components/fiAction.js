import { Component, h } from "splay";
import "@css/components/detail.less";

class FiAction extends Component {
  render() {
    return (
      <div className="fi__actions">
        <div className="fi__actions-focus"></div>
        <ul className="fi__actions-list">
          <li className="fi__actions-play">Reprendre la lecture</li>
          <li className="fi__actions-replay">
            Reprendre la lecture depuis le début
          </li>
          <li className="fi__actions-suggestions">Titre similaire</li>
          <li className="fi__actions-languages">Audio et sous-titres</li>
          <li className="fi__actions-watch-list">Ajouter à ma liste</li>
        </ul>
      </div>
    );
  }
}

export default FiAction;
