import React, { Component } from "react";
import { Cinemagraph } from "react-cinemagraph";

import "./App.css";

import holidayLightsJpg from "./assets/HolidayLights/HolidayLights.jpg";
import holidayLightsMp4 from "./assets/HolidayLights/HolidayLights.mp4";
import holidayLightsWebM from "./assets/HolidayLights/HolidayLights.webm";

class App extends Component {
  state = {
    height: 45,
    maxHeight: 100,
    fallbackImage: holidayLightsJpg,
    fallbackImageAlt: "Holiday Lights",
    mp4Source: holidayLightsMp4,
    webmSource: holidayLightsWebM,
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
          height={this.state.height}
          maxHeight={this.state.maxHeight}
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
          <button
            id="reset-button"
            className="secondary-button"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
