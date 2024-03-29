![logo](https://raw.githubusercontent.com/Jac21/react-cinemagraph-demo/master/public/media/logo.png)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
![build workflow](https://github.com/Jac21/react-cinemagraph-demo/actions/workflows/build.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/react-cinemagraph.svg)](https://www.npmjs.com/package/react-cinemagraph)
[![donate](https://img.shields.io/badge/%24-Buy%20me%20a%20coffee-ff69b4.svg)](https://www.buymeacoffee.com/jac21)

Generic [Cinemagraph](https://en.wikipedia.org/wiki/Cinemagraph) component, built for React.

## The problem 🤔

You want a generic, adaptive, React-friendly, and customizable Cinemagraph-style component within your React application.

## This solution ✅

This component - `react-cinemagraph`!

## The demo 📽

Right here - https://jac21.github.io/react-cinemagraph-demo/

## Installation 🎥

```
$ npm i react-cinemagraph
```

## Usage 🎬

```javascript
import React from 'react';
import { Cinemagraph } from 'react-cinemagraph';

class Demo extends Component {
  state = {
    height: 50,
    maxHeight: 100,
    fallbackImage: './demo/assets/Disco.jpg',
    fallbackImageAlt: 'Disco',
    mp4Source: './demo/assets/Disco.mp4',
    webmSource: './demo/assets/Disco.webm',
    isBlackAndWhite: false,
    isSepia: false,
    isBlurred: false
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
      </div>
    );
  }
}
```

Alternatively (and [preferably, if using webpack](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files)):

```javascript
import React from 'react';
import { Cinemagraph } from 'react-cinemagraph';

import discoJpg from './assets/Disco.jpg';
import discoMp4 from './assets/Disco.mp4';
import discoWebM from './assets/Disco.webm';

class Demo extends Component {
  state = {
    height: 50,
    maxHeight: 100,
    fallbackImage: discoJpg,
    fallbackImageAlt: 'Disco',
    mp4Source: discoMp4,
    webmSource: discoWebM,
    isBlackAndWhite: false,
    isSepia: false,
    isBlurred: false
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
      </div>
    );
  }
}
```

## Props 🎞

Every prop from [`react-cinemagraph`](https://github.com/Jac21/react-cinemagraph#props) (height, maxHeight, fallbackImage, fallbackImageAlt, mp4Source, webmSource, isBlackAndWhite, isSepia, isBlurred)

## height

Type: Number **(Is Required)**

Height of Cinemagraph in _VW_ units relative to window's width.

## maxHeight

Type: Number **(Is Required)**

Maximum height of Cinemagraph in _VH_ units relative to window's height.

## fallbackImage

Type: String

File path for the fallback image to be rendered on unsupported browsers.

## fallbackImageAlt

Type: String

'alt' property for the aforementioned fallback image.

## mp4Source

Type: String

File path for the Cinemagraph's mp4 file-type video source

## webmSource

Type: String

File path for the Cinemagraph's WebM file-type video source

## isBlackAndWhite

Type: Boolean

Option to have a black-and-white filter applied to the Cinemagraph

## isSepia

Type: Boolean

Option to have a sepia filter applied to the Cinemagraph

## isBlurred

Type: Boolean

Option to have a blur filter applied to the Cinemagraph
