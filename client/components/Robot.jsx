import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import WinContainer from '../containers/WinContainer'
import classNames from 'classnames'
import { JUMP_UP, MOVE_FORWARD, SOUND, TOGGLE_SOUND, TURN_LEFT, TURN_RIGHT } from '../reducers/action'

const defaultScale = 85
class Robot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scale: defaultScale
    }
  }

  calcCenter () {
    const y = this.props.robot.positionY.toString()
    const x = this.props.robot.positionX.toString()
    const bounds = this.props.tileInfo[y + x].getBoundingClientRect()
    const centerX = (bounds.right + bounds.left) / 2
    const centerY = (bounds.top + bounds.bottom) / 2
    return [centerX, centerY]
  }

  componentDidMount () {
    window.onresize = () => { this.forceUpdate(() => {}) }
  }

  componentWillUnmount () {
    window.onresize = null
  }

  /** Set scale based on robot props */
  componentDidUpdate (_prevProps) {
    const onBoxScale = 115
    if (!this.props.robot.isAlive) {
      if (this.state.scale !== 10) {
        this.setState({ scale: 10 })
      }
      return
    }
    const commandExecuted = this.props.commandQueue[this.props.executeCommandIndex - 1]
    switch (commandExecuted) {
      case JUMP_UP:
        if (this.state.scale !== onBoxScale) {
          this.setState({ scale: onBoxScale })
        }
        break
      case MOVE_FORWARD:
        if (this.state.scale !== defaultScale) {
          this.setState({ scale: defaultScale })
        }
        break
      case TURN_LEFT, TURN_RIGHT, TOGGLE_SOUND, SOUND:
        // do nothing
        break
      default: {
        // when you retry etc, reset robot scale
        if (this.state.scale !== defaultScale) {
          this.setState({ scale: defaultScale })
        }
      }
    }
  }

  render () {
    const centerPoints = this.calcCenter()
    let precisionStrength = 1
    let opacity = 1.0
    if (!this.props.robot.isAlive) {
      precisionStrength = 0.1
      opacity = 0.4
    }
    return (
      <div>
        <Motion
          defaultStyle={{
            scale: this.state.scale,
            x: centerPoints[0],
            y: centerPoints[1],
            rot: 0
          }}
          style={{
            scale: spring(this.state.scale, { precision: precisionStrength }),
            x: spring(centerPoints[0]),
            y: spring(centerPoints[1]),
            rot: spring(this.props.robot.direction)
          }}
          children={value => <div>
            <div
              className={classNames('robot-container', { 'b3-container-animation': this.props.levelWon })}
              style={{
                height: value.scale,
                width: value.scale,
                top: value.y - 12,
                left: value.x,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <img src='/resources/images/shadow.svg' className={classNames('b3-shadow', { 'b3-shadow-animation': this.props.levelWon })} />
            </div>
            <div
              className={classNames('robot-container', 'up-down-animation', { 'b3-container-animation': this.props.levelWon })}
              style={{
                height: value.scale,
                width: value.scale,
                top: value.y - 12 - value.scale / 2,
                left: value.x - value.scale / 2,
                rotate: `${value.rot}deg`
              }}
            >
              <img src='/resources/images/b3-robot.svg' className='b3-robot' style={{ opacity }} />
            </div>
          </div>}
        />
        <WinContainer />
      </div>
    )
  }
}

export default Robot
