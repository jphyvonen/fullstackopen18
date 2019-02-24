import React from 'react'
const Kurssi = (props) => {

  const { kurssi } = props

  return (
    <div>
      <KurssinNimi nimi={kurssi.nimi} />
      {kurssi.osat.map(x => <Sisalto key={x.id} nimi={x.nimi} tehtavia={x.tehtavia} />)}
      <p>
        Yhteensä{' '}
        {
          kurssi.osat
            .map(x => x.tehtavia)
            .reduce((sum, next) => sum + next)
        }
      </p>
    </div>
  )

}
const KurssinNimi = (props) => {
  const { nimi } = props
  return (<h1>{nimi}</h1>)
}
const Sisalto = (props) => {
  const { nimi, tehtavia } = props
  return (
    <p>{nimi} {tehtavia}</p>
  )
}
export default Kurssi
