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

const DEFAULT_STATE = {
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
  static defaultProps = {
    options: {}
  }

  video = null
  state = DEFAULT_STATE

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

  resetUrl() {
    const sources = ObjectPath(this.props).get('options.sources') || []

    sources[0] && this.player.src(sources[0].src);
    this.player.poster(this.props.options.poster);
  }

  initialize() {
    // 添加行内播放
    if (this.state.playInline) {
      this.video.setAttribute('webkit-playsinline', true);
      this.video.setAttribute('playsInline', true);
      this.video.setAttribute('x5-playsinline', true);
      this.video.setAttribute('x5-video-player-type', 'h5');
      this.video.setAttribute('x5-video-player-fullscreen', false);
    }

    // 跨域视频请求
    if (this.state.crossOrigin !== '') {
      this.video.crossOrigin = this.state.crossOrigin;
      this.video.setAttribute('crossOrigin', this.state.crossOrigin);
    }

    // 防止出现报错： "VIDEOJS: ERROR: Unable to find plugin: __ob__"
    if (this.state.options.plugins) {
      this.setState((prevState) => {
        delete prevState.plugins.__ob__;
        return prevState;
      })
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

        // 监听事件
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

        // 监听事件更新事件
        this.on('timeupdate', function () {
          if (typeof context.props.timeupdate === 'function') context.props.timeupdate(this.currentTime());
        });
      });
    });
  }

  render() {
    const { subtitles, defaultSubtitle } = this.state.options;

    return (
      <div className="react-awesome-player-container">
        <video className="video-js react-awesome-player" ref={ video => { this.video = video } }>
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
      </div>
    )
  }
}

ReactAwesomePlayer.propTypes = {
  options: PropTypes.object,
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
