import React, { Component } from 'react'
import SkyLight from 'react-skylight'
import classNames from 'classnames'
import levels from '../levels'

class Win extends Component {
  constructor (props) {
    super(props)
    const keys = Object.keys(levels).map((key) => {
      return parseInt(key)
    })
    const highestLevel = Math.max(...keys)
    this.state = { highestLevel }
  }

  handleKeyPress (e) {
    if (e.which === 27) {
      this.refs.winBox.hide()
    }
  }

  componentDidMount () {
    document.addEventListener('keyup', this.handleKeyPress.bind(this))
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.handleKeyPress.bind(this))
  }

  componentDidUpdate () {
    this.props.levelWon ? this.refs.winBox.show() : this.refs.winBox.hide()
  }

  _executeBeforeModalClose () {
    this.props.toggleLevelWon()
    const newLevel = this.props.currentLevel === this.state.highestLevel
      ? 1
      : this.props.currentLevel + 1
    this.props.setLevel(newLevel)
  }

  render () {
    let left = window.innerWidth * 0.35
    let top = window.innerHeight * 0.40
    const width = '70%'
    let height = '70%'

    if (window.innerWidth < 850) {
      left = window.innerWidth * 0.35
      top = window.innerHeight * 0.40
      height = '80%'
    }

    const winDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width,
      height,
      left,
      top,
      borderRadius: '2%',
      padding: '15px'
    }

    return (
      <div>
        {this.props.currentLevel === this.state.highestLevel
          ? <SkyLight beforeClose={this._executeBeforeModalClose.bind(this)} hideOnOverlayClicked ref='winBox' dialogStyles={winDialog}>
            <div className='win-notice'>
              <img src='/resources/images/control-room.svg' className='win-game-b3' />
              <h3 className={classNames('modal-heading', 'about-backstory')}>Game Over!</h3>
              <p>Excellent! B3 made it to the control room and stopped the space ship from colliding with Earth!</p>
              <p>You are the saviour of humanity!</p>

              <div className='modal-button-container'>
                <a className='modal-button modal-animate win-action' onClick={() => { this.refs.winBox.hide() }}>
                  Play Again
                </a>
              </div>
            </div>
          </SkyLight>
          : <SkyLight beforeClose={this._executeBeforeModalClose.bind(this)} hideOnOverlayClicked ref='winBox' dialogStyles={winDialog}>
            <div className='win-notice'>
              <img src='/resources/images/happy-b3.svg' className='intro-b3' />
              <h3 className={classNames('win-notice')}>Level Cleared!</h3>
              <p>Nice work, B3 made it to the elevator!</p>
              <p>You're getting closer to the control room.</p>
              <br />
              <div className='modal-button-container'>
                <a className='modal-button modal-animate win-action' onClick={() => { this.refs.winBox.hide() }}>
                  Next Level
                </a>
              </div>
            </div>
          </SkyLight>}
      </div>
    )
  }
}

export default Win
