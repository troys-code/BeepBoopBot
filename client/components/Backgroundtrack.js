import React, { Component } from 'react'
// Must run setup before using react-sound
soundManager.setup({
  // ignoreMobileRestrictions: true, // for playing multiple tracks at once (not needed)
  preferFlash: false,
  debugMode: false, // disable spammy logs
});
import Sound from 'react-sound'
import cookie from 'react-cookie'
import songs from '../sound'

const volumeForTheme = {
  0: 40,
  1: 20,
  2: 30,
  3: 20,
  4: 20
}

export default class Backgroundtrack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: 0,
      currentSong: songs[0],
      position: 0,
      playStatus: Sound.status.STOPPED
    }
  }

  getStatusText () {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing'
      case Sound.status.PAUSED:
        return 'paused'
      case Sound.status.STOPPED:
        return 'stopped'
      default:
        return '(unknown)'
    }
  }

  componentDidMount () {
    const soundCookie = cookie.load('sound')
    if (soundCookie === undefined) {
      cookie.save('sound', 'OFF')
    }
    if (soundCookie === 'ON') {
      this.setState({ playStatus: Sound.status.PLAYING })
      return
    }
    this.setState({ playStatus: Sound.status.STOPPED })
  }

  componentDidUpdate () {
    let newTheme = 0
    const { currentLevel } = this.props
    if (currentLevel >= 1 && currentLevel < 6) {
      newTheme = 0
    } else if (currentLevel >= 6 && currentLevel < 11) {
      newTheme = 1
    } else if (currentLevel >= 11 && currentLevel < 16) {
      newTheme = 2
    } else if (currentLevel >= 16 && currentLevel < 21) {
      newTheme = 3
    } else {
      newTheme = 4
    }

    if (this.state.theme !== newTheme) {
      this.setState({ theme: newTheme, currentSong: songs[newTheme] })
    }

    const soundCookie = cookie.load('sound')
    const isAlreadySet = this.state.playStatus === Sound.status.PLAYING
    if (soundCookie === 'ON') {
      if (isAlreadySet) return
      this.setState({ playStatus: Sound.status.PLAYING })
    } else {
      if (!isAlreadySet) return
      this.setState({ playStatus: Sound.status.STOPPED })
    }
  }

  render () {
    return (
      <Sound
        url={this.state.currentSong.url}
        playStatus={this.state.playStatus}
        playFromPosition={this.state.position}
        volume={volumeForTheme[this.state.theme]}
        onFinishedPlaying={() => this.setState({ playStatus: Sound.status.PLAYING })}
        loop
      />
    )
  }
}
