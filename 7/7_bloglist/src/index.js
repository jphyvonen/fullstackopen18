import React from 'react'
import ReactDOM from 'react-dom'
import ConnectedApp from './App'
import { Provider } from 'react-redux'
import store from './store'
const render = () => {

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>,
        document.getElementById('root'))
}
render()
store.subscribe(render)
