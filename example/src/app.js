import React from 'react'
import { render } from 'react-dom'
import ReactAwesomePlayer from '../../src'

class App extends React.Component {
  state = {
    options: {
      poster: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=854361313,3188166359&fm=26&gp=0.jpg",
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
  error() {
    console.log('error')
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({

  //       options: {
  //         poster: "https://public.myhbp.org.cn/resourceimages/insightimage/kS2tsBPjWMwxNS8G66aZaJ4iN2EbjFAj.jpg",
  //         sources: [{
  //           type: "'application/x-mpegURL'",
  //           src: "https://video.myhbp.org.cn/lesson/2dfe64cfe229b23df1c7ab2969d618a0/sd/video.m3u8?OSSAccessKeyId=LTAI7hc8DeH5YRB8&Expires=1562817520&Signature=lhD6pMFBaWOfm8DuYE2fGxfZHD4%3D"
  //         }],
  //         subtitles: [{
  //             language: 'zh',
  //             url: "https://resource.myhbp.org.cn/subtitlevtt/zh_cn/difficult%20interactions.vtt?OSSAccessKeyId=LTAI7hc8DeH5YRB8&Expires=1563073120&Signature=6bn6O4%2Byxy4Ii%2BgHy5beSkK3rVA%3D",
  //             label: "中文"
  //           },
  //           {
  //             language: 'en',
  //             url: "https://resource.myhbp.org.cn/subtitlevtt/en/difficult%20interactions.vtt?OSSAccessKeyId=LTAI7hc8DeH5YRB8&Expires=1563073120&Signature=3atEE9wrLDoqly%2B8wkIlSYlUoew%3D",
  //             label: "EN"
  //         }],
  //         defaultSubtitle: 'en'
  //       }
  //     })
  //   }, 3000)
  // }

  render () {
    const { options } = this.state
    return <div className="test-demo">
      <ReactAwesomePlayer
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
    </div>
  }
}

render(<App />, document.getElementById('root'))
