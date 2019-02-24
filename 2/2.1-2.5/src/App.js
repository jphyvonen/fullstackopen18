import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({kurssit}) => {
  return (
    <div>
      {kurssit.map(x => <Kurssi key={x.id} kurssi={x} />)}
    </div>
  )
}
export default App