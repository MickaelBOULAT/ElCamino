import { Component, h, Router } from "splay";
import MyStore from "@stores/mystore";
import "@css/components/example.less";
import FiAction from "./fiAction";

const CSA_LEVELS = [
  'Tous public',
  '10+',
  '12+',
  '16+',
  '18+'
]

class Example extends Component {
  getData() {
    return MyStore.getSampleData().then(data => {
      this.data = data;
      console.log({ data })
    });
  }

  get dataToSave() {
    return { data: this.data };
  }

  // getList() {
  //   const arr = [];
  //   for (let i = 0, lgt = this.data.length; i < lgt; i++) {
  //     arr.push(
  //       <div className={["example-element", this.focusableClass]}>
  //         {this.data[i].name}
  //       </div>
  //     );
  //   }
  //   return arr;
  // }

  getDistribution() {
    return this.data.distribution.join(' ')
  }

  getCSAText(ratingCSA = 1) {
    if (ratingCSA > 5 || ratingCSA <= 0) ratingCSA = 1
    return CSA_LEVELS[ratingCSA - 1]
  }

  render() {
    const {
      title = '',
      category = '',
      productionYear = 2019,
      synopsis = '',
      rating = 5,
      ratingCSA = 1,
      productionNationality = '',
      suggestion = 100,
      duration= '1h 00min',
      subtitles = [''],
      audio = [''],
      audioFormats = [''],
      seeAlso = [{ title: ''}],
      directors = [''],
      distribution = [''],
      quality = ''
    } = this.data;
    return (
      <div className="fi">
        {/* <h1 className="example-title">Welcome on Demo app !</h1>
        <i>Use keys Up and Down to select an entry, then use Enter !</i>
        {this.getList()} */}
        <h1 className="fi__title">{title}</h1>
        <div className="fi__info-program">
          <span className="fi__info_promgram_rating">Suggéré à { suggestion }%</span>
          <span className="fi__info_promgram_year">{ productionYear }</span>
          <span className="fi__info_promgram_csa">{ this.getCSAText(ratingCSA) }</span>
          <span className="fi__info_promgram_duration">{ duration }</span>
          <span className="fi__info_promgram_quality">{ quality }</span>
          <span className="fi__info_promgram_sound">{ audioFormats.join(' ') }</span>
        </div>
        <p className="fi__synopsis">
          { synopsis }
        </p>
        <p className="fi__distribution">
          Distribution :{this.getDistribution()}
        </p>
        <p className="fi__director">{ directors.join(' ') }</p>
        <p className="fi__genre">{ category }</p>
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
