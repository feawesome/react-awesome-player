/**
 *
 * React-Awesome-Player
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ObjectPath from 'object-path'

import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './index.css'

// as of videojs 7.6.0
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

class ReactAwesomePlayer extends React.Component {
  video = null

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
      subtitles: [], // 字幕
      defaultSubtitle: '' // 默认字幕
      // width: document.documentElement.clientWidth,
    },
    playInline: true,
    crossOrigin: ''
  }

  componentDidMount() {
    const sources = ObjectPath(this.props).get('options.sources') || []
    const isSource = sources.length

    if (!this.player && isSource) {
      this.initialize();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.player && this.props.options !== prevProps.options) {
      this.resetUrl();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  videoRef = video => {
    this.video = video;
  }

  resetUrl() {
    const sources = ObjectPath(this.props).get('options.sources') || []

    sources[0] && this.player.src(sources[0].src);
    this.player.poster(this.props.options.poster);
  }

  initialize() {
    if (this.state.playInline) {
      this.video.setAttribute('webkit-playsinline', true);
      this.video.setAttribute('playsInline', true);
      this.video.setAttribute('x5-playsinline', true);
      this.video.setAttribute('x5-video-player-type', 'h5');
      this.video.setAttribute('x5-video-player-fullscreen', false);
    }

    // cross origin
    if (this.state.crossOrigin !== '') {
      this.video.crossOrigin = this.state.crossOrigin;
      this.video.setAttribute('crossOrigin', this.state.crossOrigin);
    }

    // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
    if (this.state.options.plugins) {
      delete videoOptions.plugins.__ob__;
    }

    this.setState({
      options: {
        ...this.state.options,
        ...this.props.options,
      },
    }, () => {
      const context = this;

      this.player = videojs(this.video, this.state.options, function () {

        // events
        const events = DEFAULT_EVENTS.concat(context.props.events)

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
        this.on('timeupdate', function () {
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

ReactAwesomePlayer.propTypes = {
  sourceType: PropTypes.string,
  subtitlesZh: PropTypes.string,
  subtitlesEn: PropTypes.string,
  options: PropTypes.object,
  subtitles: PropTypes.array,
  defaultSubtitle: PropTypes.string,
  events: PropTypes.array,

  // events props
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

export default ReactAwesomePlayer;
