import React, { Component } from "react";
import { Cinemagraph } from "react-cinemagraph";

import "./App.css";

import discoJpg from "./assets/Disco.jpg";
import discoMp4 from "./assets/Disco.mp4";
import discoWebM from "./assets/Disco.webm";

class App extends Component {
  state = {
    fallbackImage: discoJpg,
    fallbackImageAlt: "Disco",
    mp4Source: discoMp4,
    webmSource: discoWebM,
    isBlackAndWhite: false,
    isSepia: false,
    isBlurred: false
  };

  setBlackAndWhite = () => {
    this.setState({
      isBlackAndWhite: true,
      isSepia: false,
      isBlurred: false
    });
  };

  setSepia = () => {
    this.setState({
      isBlackAndWhite: false,
      isSepia: true,
      isBlurred: false
    });
  };

  setBlurred = () => {
    this.setState({
      isBlackAndWhite: false,
      isSepia: false,
      isBlurred: true
    });
  };

  reset = () => {
    this.setState({
      isBlackAndWhite: false,
      isSepia: false,
      isBlurred: false
    });
  };

  render() {
    return (
      <div>
        <Cinemagraph
          fallbackImage={this.state.fallbackImage}
          fallbackImageAlt={this.state.fallbackImageAlt}
          mp4Source={this.state.mp4Source}
          webmSource={this.state.webmSource}
          isBlackAndWhite={this.state.isBlackAndWhite}
          isSepia={this.state.isSepia}
          isBlurred={this.state.isBlurred}
        />
        <div className="button-wrapper">
          <button id="black-and-white-button" onClick={this.setBlackAndWhite}>
            Set to Black and White
          </button>
          <button id="sepia-button" onClick={this.setSepia}>
            Set to Sepia
          </button>
          <button id="blurred-button" onClick={this.setBlurred}>
            Set to Blurred
          </button>
          <button id="reset-button" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
