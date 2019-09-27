import { Component, h, Router } from "splay";
import MyStore from "@stores/mystore";
import "@css/components/example.less";
import FiAction from "./fiAction";

class Example extends Component {
  getData() {
    return MyStore.getSampleData().then(data => {
      this.data = data;
    });
  }

  get dataToSave() {
    return { data: this.data };
  }

  getList() {
    const arr = [];
    for (let i = 0, lgt = this.data.length; i < lgt; i++) {
      arr.push(
        <div className={["example-element", this.focusableClass]}>
          {this.data[i].name}
        </div>
      );
    }
    return arr;
  }

  getDistribution() {
    return;
  }

  render() {
    return (
      <div className="fi">
        {/* <h1 className="example-title">Welcome on Demo app !</h1>
        <i>Use keys Up and Down to select an entry, then use Enter !</i>
        {this.getList()} */}
        <h1 className="fi__title">El Camino</h1>
        <div className="fi__info-program">
          <span className="fi__info_promgram_rating">Suggéré à 83%</span>
          <span className="fi__info_promgram_year">2019</span>
          <span className="fi__info_promgram_csa">13+</span>
          <span className="fi__info_promgram_duration">2H 44min</span>
          <span className="fi__info_promgram_quality">HD</span>
          <span className="fi__info_promgram_sound">5.1</span>
        </div>
        <p className="fi__synopsis">
          Un film Breaking Bad (El Camino: A Breaking Bad Movie) est un film
          américain réalisé par Vince Gilligan, dérivé de la série télévisée
          Breaking Bad du même créateur, dont la diffusion est prévue en 2019
          sur le service de streaming Netflix. Il sera par la suite disponible
          sur AMC.
        </p>
        <p className="fi__distribution">
          Distribution :{this.getDistribution()}
        </p>
        <p className="fi__director">Christopher Nolan</p>
        <p className="fi__genre">Action</p>
        <FiAction parent={this} />
      </div>
    );
  }

  // Hooks
  mounted() {
    this.focus(this.current);
  }

  // Keys
  onKeyUp() {
    this.focus(this.current - 1);
  }

  onKeyDown() {
    this.focus(this.current + 1);
  }

  onKeyEnter() {
    if (this.data[this.current])
      return Router.navigate("detail", { data: this.data[this.current] });
  }
}

export default Example;
