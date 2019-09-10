[![GitHub stars](https://img.shields.io/github/stars/feawesome/react-awesome-player.svg?style=flat-square)](https://github.com/feawesome/react-awesome-player/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/feawesome/react-awesome-player.svg?style=flat-square)](https://github.com/feawesome/react-awesome-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/feawesome/react-awesome-player.svg?style=flat-square)](https://github.com/feawesome/react-awesome-player/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/feawesome/react-awesome-player)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/feawesome/react-awesome-player)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/feawesome/react-awesome-player.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/feawesome/react-awesome-player)

[![NPM](https://nodei.co/npm/react-awesome-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-awesome-player/)
[![NPM](https://nodei.co/npm-dl/react-awesome-player.png?months=9&height=3)](https://nodei.co/npm/react-awesome-player/)


## react-awesome-player

[video.js](https://github.com/videojs/video.js) player component for React.

Secondary development based on video.js, perfectly compatible with React , support subtitle display and the live stream of HLS. It is an awesome plugin for playing video on webpage.
If anything goes wrong during using, please submit issues in this repository, or send email to author: **returnzp@gmail.com**

### Example

* [Demo Page](https://feawesome.github.io/react-awesome-player)
* Demo Code
```jsx
import React from 'react'
import { render } from 'react-dom'
import ReactAwesomePlayer from 'react-awesome-player'

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
          url: "https://feawesome.github.io/react-awesome-player/zh.vtt",
          label: "中文"
        },
        {
          language: 'en',
          url: "https://feawesome.github.io/react-awesome-player/en.vtt",
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
  error() {
    console.log('error')
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
      error={this.error}
    />
  }
}

render(<App />, document.getElementById('root'))

```


### Install
#### NPM

``` bash
npm install react-awesome-player --save
```


### API
- component api:

| API | description | type | default |
| -   | -           | -    | -       |
| events   | custom videojs event to component | Array | [] |
| playsInline   | set player not full-screen in mobile device | Boolean | true |
| crossOrigin   | set crossOrigin to video | String | '' |

- video.js api
  * [video.js options](http://docs.videojs.com/tutorial-options.html)
  * [video.js docs](http://docs.videojs.com/)

### videojs plugins

- [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)
- [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
- [videojs-youtube](https://github.com/videojs/videojs-youtube)
- [videojs-vimeo](https://github.com/videojs/videojs-vimeo)
- [videojs-hotkeys](https://github.com/ctd1500/videojs-hotkeys)
- [videojs-flash](https://github.com/videojs/videojs-flash)
- [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads)
- [more plugins...](https://github.com/search?o=desc&q=videojs+plugin&s=stars&type=Repositories&utf8=%E2%9C%93)


### Author
**Peng Zhang**
**returnzp@gmail.com**
