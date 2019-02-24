import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import { createStore } from 'redux'

const store = createStore(reducer)

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
store.subscribe(render)
const Statistiikka = () => {
  const state = store.getState()
  const palautteita = state.good + state.bad + state.ok
  const keskiarvo = (state.good * 1 + state.bad * - 1) / palautteita
  const hyviä = state.good / palautteita * 100

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{hyviä}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
export default App