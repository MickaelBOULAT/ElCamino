import { Component, h, Router } from "splay";
import MyStore from "@stores/mystore";
import "@css/components/example.less";
import FiAction from "./fiAction";

const CSA_LEVELS = ["Tous public", "10+", "12+", "16+", "18+"];

const SCROLL_DATAS = {
  numberOfElements: 5,
  heightOfElement: 40
};

class Example extends Component {
  init() {
    this.scrollValue = 0;
  }

  setAnimateClasses() {
    const elements = [
      document.querySelector(".fi__synopsis"),
      document.querySelector(".fi__distribution"),
      document.querySelector(".fi__director"),
      document.querySelector(".fi__actions"),
      document.querySelector(".fi__genre")
    ];

    for (let element of elements) {
      if (element) {
        element.classList.add("is-animate");
      }
    }
  }

  hideBackground() {
    const appEl = document.getElementById("app-container");

    if (appEl) {
      setTimeout(() => {
        appEl.classList.add("app-container--hasnt-background");
      }, 15000);
    }
  }

  getData() {
    return MyStore.getSampleData().then(data => {
      this.data = data;
      console.log({ data });
    });
  }

  get dataToSave() {
    return { data: this.data };
  }

  getCSAText(ratingCSA = 1) {
    if (ratingCSA > 5 || ratingCSA <= 0) ratingCSA = 1;
    return CSA_LEVELS[ratingCSA - 1];
  }

  translate(direction) {
    const fiActionFocusEl = document.querySelector(".fi__actions-focus");

    if (fiActionFocusEl) {
      switch (direction) {
        case "down":
          this.scrollValue >=
          SCROLL_DATAS.heightOfElement * (SCROLL_DATAS.numberOfElements - 1)
            ? (this.scrollValue = 0)
            : (this.scrollValue += SCROLL_DATAS.heightOfElement);
          break;

        case "up":
          this.scrollValue === 0
            ? (this.scrollValue =
                SCROLL_DATAS.heightOfElement *
                (SCROLL_DATAS.numberOfElements - 1))
            : (this.scrollValue -= SCROLL_DATAS.heightOfElement);

          break;

        default:
          break;
      }

      fiActionFocusEl.style.transform = `translateY(${this.scrollValue}px)`;
    }
  }

  render() {
    const {
      title = "",
      category = "",
      productionYear = 2019,
      synopsis = "",
      rating = 5,
      ratingCSA = 1,
      productionNationality = "",
      suggestion = 100,
      duration = "1h 00min",
      subtitles = [""],
      audio = [""],
      audioFormats = [""],
      seeAlso = [{ title: "" }],
      directors = [""],
      distribution = [""],
      quality = ""
    } = this.data;
    return (
      <div className="fi">
        <h1 className="fi__title">{title}</h1>
        <div className="fi__info-program">
          <span className="fi__info_promgram_rating">
            Suggéré à {suggestion}%
          </span>
          <span className="fi__info_promgram_year">{productionYear}</span>
          <span className="fi__info_promgram_csa">
            {this.getCSAText(ratingCSA)}
          </span>
          <span className="fi__info_promgram_duration">{duration}</span>
          <span className="fi__info_promgram_quality">{quality}</span>
          <span className="fi__info_promgram_sound">
            {audioFormats.join(" ")}
          </span>
        </div>
        <p className="fi__synopsis">{synopsis}</p>
        <p className="fi__distribution">
          Distribution : {this.data.distribution.join(" ")}}
        </p>
        <p className="fi__director">{directors.join(" ")}</p>
        <p className="fi__genre">{category}</p>
        <FiAction parent={this} />
      </div>
    );
  }

  // Hooks
  mounted() {
    this.focus(this.current);
    this.setAnimateClasses();
    this.hideBackground();
  }

  // Keys
  onKeyUp() {
    this.translate("up");
    this.focus(this.current - 1);
  }

  onKeyDown() {
    this.translate("down");
    this.focus(this.current + 1);
  }

  onKeyEnter() {
    if (this.data[this.current])
      return Router.navigate("detail", { data: this.data[this.current] });
  }
}

export default Example;
