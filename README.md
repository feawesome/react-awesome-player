[![GitHub stars](https://img.shields.io/github/stars/peng666/react-awesome-player.svg?style=flat-square)](https://github.com/peng666/react-awesome-player/stargazers)
[![Build Status](https://travis-ci.org/peng666/react-awesome-player.svg?branch=master)](https://travis-ci.org/peng666/react-awesome-player)
[![GitHub issues](https://img.shields.io/github/issues/peng666/react-awesome-player.svg?style=flat-square)](https://github.com/peng666/react-awesome-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/peng666/react-awesome-player.svg?style=flat-square)](https://github.com/peng666/react-awesome-player/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/peng666/react-awesome-player)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/peng666/react-awesome-player)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/peng666/react-awesome-player.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/peng666/react-awesome-player)

[![NPM](https://nodei.co/npm/react-awesome-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-awesome-player/)
[![NPM](https://nodei.co/npm-dl/react-awesome-player.png?months=9&height=3)](https://nodei.co/npm/react-awesome-player/)


## React-Awesome-Player

[video.js](https://github.com/videojs/video.js) player component for React.

Develop by video.js, perfectly compatible with React , support subtitle display, the live stream of HLS and so on, it is a awesome plugin for playing video in webpage, If something goes wrong during use, you can submit the issue in this repository, or send email to author: **returnzp@gmail.com**

## Example

* [Demo Page](https://peng666.github.io/react-awesome-player)
* Demo Code
```jsx
import React from 'react'
import { render } from 'react-dom'
import ReactAwesomePlayer from '../../src'

class App extends React.Component {
  state = {
    options: {
      poster: "http://pic2.52pk.com/files/130514/1283314_143556_2145.jpg",
      sources: [{
        type: "video/mp4",
        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      }],
      subtitles: [{
          language: 'zh',
          url: "https://resource.myhbp.org.cn/subtitlevtt/zh_cn/difficult%20interactions.vtt?OSSAccessKeyId=LTAI7hc8DeH5YRB8&Expires=1563073120&Signature=6bn6O4%2Byxy4Ii%2BgHy5beSkK3rVA%3D",
          label: "中文"
        },
        {
          language: 'en',
          url: "https://resource.myhbp.org.cn/subtitlevtt/en/difficult%20interactions.vtt?OSSAccessKeyId=LTAI7hc8DeH5YRB8&Expires=1563073120&Signature=3atEE9wrLDoqly%2B8wkIlSYlUoew%3D",
          label: "EN"
      }],
      defaultSubtitle: 'en'
    }
  }
  loadeddata() {
    console.log('loadeddata')
  }
  canplay() {
    console.log('canplay')
  }
  canplaythrough() {
    console.log('canplaythrough')
  }
  play() {
    console.log('play')
  }
  pause() {
    console.log('pause')
  }
  waiting() {
    console.log('waiting')
  }
  playing() {
    console.log('playing')
  }
  ended() {
    console.log('ended')
  }
  erro() {
    console.log('erro')
  }

  render () {
    const { options } = this.state
    return <ReactAwesomePlayer
      options={options}
      loadeddata={this.loadeddata}
      canplay={this.canplay}
      canplaythrough={this.canplaythrough}
      play={this.play}
      pause={this.pause}
      waiting={this.waiting}
      playing={this.playing}
      ended={this.ended}
      erro={this.erro}
    />
  }
}

render(<App />, document.getElementById('root'))

```


## Install
#### NPM

``` bash
npm install react-awesome-player --save
```


## API
- component api:
  * `events` : `[ Array, default: [] ]` : custom videojs event to component
  * `playsinline` : `[ Boolean, default: false ]` : set player not full-screen in mobile device
  * `crossOrigin` : `[ String, default: '' ]` : set crossOrigin to video
  * `customEventName` : `[ String, default: 'statechanged' ]` : custom the state change event name

- video.js api
  * [video.js options](http://docs.videojs.com/tutorial-options.html)
  * [video.js docs](http://docs.videojs.com/)

# videojs plugins

- [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)
- [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
- [videojs-youtube](https://github.com/videojs/videojs-youtube)
- [videojs-vimeo](https://github.com/videojs/videojs-vimeo)
- [videojs-hotkeys](https://github.com/ctd1500/videojs-hotkeys)
- [videojs-flash](https://github.com/videojs/videojs-flash)
- [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads)
- [more plugins...](https://github.com/search?o=desc&q=videojs+plugin&s=stars&type=Repositories&utf8=%E2%9C%93)


# Author
**Peng Zhang**
