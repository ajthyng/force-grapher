import React from 'react'
import { render } from 'react-dom'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import App from './App'

initializeIcons()

render(<App />, document.getElementById('root'))
