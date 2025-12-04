import React from 'react' /* Required import due to legacy React DOM usage */
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import soundsMiddleware from 'redux-sounds'
import App from './components/App'
import reducer from './reducers/reducer'

const soundsData = {
  jump: './resources/sound/jump.wav',
  die: './resources/sound/dying.wav',
  win: './resources/sound/win.mp3'
}
const loadedSoundsMiddleware = soundsMiddleware(soundsData)
let middlewares = [thunk, loadedSoundsMiddleware]
if (process.env.NODE_ENV === 'development') {
  // Log redux actions during local development
  const logger = createLogger()
  middlewares = [logger, ...middlewares]
}
const store = createStore(reducer, applyMiddleware(...middlewares))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})

const isChromium = Boolean(window.chrome)
const userAgent = window.navigator.userAgent
const isIOSChrome = userAgent.includes('CriOS')
const isFirefox = userAgent.includes('Firefox/')

if (isIOSChrome) {
  // is Google Chrome on IOS
  console.log('iOS chromium detected')
} else if (isChromium) {
  // Chrome works so assume all chromium supported
  console.log('Chromium detected')
} else if (isFirefox) {
  // tested it works
  console.log('Firefox detected')
} else {
  // support not known, warn the user
  setTimeout(() => {
    window.alert('This game has not been tested on your browser. The game may be squashed or look strange.')
  }, 400)
}
