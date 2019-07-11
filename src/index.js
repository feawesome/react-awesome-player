/**
 *
 * React-Awesome-Player
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// lib
import 'video.js/dist/video-js.css';
import videojs from 'video.js'
import './index.css'

// as of videojs 6.6.0
const DEFAULT_EVENTS = [
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error',
];

/* eslint-disable react/prefer-stateless-function */
class FlexibleVideo extends React.Component {
  video = null
  reseted = true

  state = {
    options: {
      controls: true, // 是否显示控制条
      controlBar: { // 显示控制条内容
        timeDivider: true, // 时间分割线
        durationDisplay: true, // 显示时间
        remainingTimeDisplay: false, // 剩余时间显示
        fullscreenToggle: true, // 切换全屏
        subtitlesButton: true, // 字幕按钮
      },
      techOrder: [
        'html5',
      ],
      autoplay: false, // 自动播放
      muted: false,
      loop: false, // 循环播放
      preload: 'none', // 预加载
      // language: 'zh', // 展示语言
      aspectRatio: '16:9', // 比例
      fluid: true,
      poster: '', // 封面图
      sources: [],
      subtitles: [],
      defaultSubtitle: ''
      // width: document.documentElement.clientWidth,
    },
  }

  componentDidMount() {
    if (!this.player && this.props.options && this.props.options.sources.length) {
      this.initialize();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) {
      this.resetUrl();
    }
  }

  videoRef = video => {
    this.video = video;
  }

  resetUrl() {
    this.props.options.sources[0] && this.player.src(this.props.options.sources[0].src);
    this.player.poster(this.props.options.poster);
  }

  initialize() {
    this.video.setAttribute('webkit-playsinline', true);
    this.video.setAttribute('playsInline', true);
    this.video.setAttribute('x5-playsinline', true);
    this.video.setAttribute('x5-video-player-type', 'h5');
    this.video.setAttribute('x5-video-player-fullscreen', false);

    // cross origin
    if (this.crossOrigin !== '') {
      this.video.crossOrigin = this.crossOrigin;
      this.video.setAttribute('crossOrigin', this.crossOrigin);
    }

    // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
    if (this.state.options.plugins) {
      delete videoOptions.plugins.__ob__; // eslint-disable-line
    }

    this.setState({
      options: {
        ...this.state.options,
        ...this.props.options,
      },
    }, () => {
      const context = this;
      const videoOptions = Object.assign({}, this.state.options);
      console.log(videoOptions)
      this.player = videojs(this.video, videoOptions, function () { // eslint-disable-line
        // events
        const events = DEFAULT_EVENTS.concat(this.events).concat(this.globalEvents);

        // watch events
        const onEdEvents = {};
        for (let i = 0; i < events.length; i += 1) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (event => {
              onEdEvents[event] = null;
              this.on(event, () => {
                if (typeof context.props[event] === 'function') context.props[event](true);
              });
            })(events[i]);
          }
        }

        // watch timeupdate
        this.on('timeupdate', function () { // eslint-disable-line
          if (typeof context.props.timeupdate === 'function') context.props.timeupdate(this.currentTime());
        });
      });
    });
  }

  render() {
    const { subtitles, defaultSubtitle } = this.state.options;

    return (
      <video className="video-js react-awesome-player" ref={this.videoRef}>
        {subtitles && subtitles.map(
          (item, index) =>
            <track
              key={index}
              src={item.url}
              kind="captions"
              srcLang={item.language}
              label={item.label}
              default={item.language === defaultSubtitle} />
          )}
      </video>
    );
  }
}

FlexibleVideo.propTypes = {
  sourceType: PropTypes.string,
  subtitlesZh: PropTypes.string,
  subtitlesEn: PropTypes.string,
  options: PropTypes.object,
  subtitles: PropTypes.array,
  defaultSubtitle:PropTypes.string,

  // 视频播放事件
  loadeddata: PropTypes.func,
  canplay: PropTypes.func,
  canplaythrough: PropTypes.func,
  play: PropTypes.func,
  pause: PropTypes.func,
  waiting: PropTypes.func,
  playing: PropTypes.func,
  ended: PropTypes.func,
  error: PropTypes.func,
  timeupdate: PropTypes.func,
};

export default FlexibleVideo;
