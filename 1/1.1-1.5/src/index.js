
import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (kurssi) => {
    return (
        <div>
            <h1>{kurssi.kurssi}</h1>
        </div>
    )
}
const Sisalto = (sisalto) => {
    return (
        <div>
            <Osa sisalto={sisalto.osa1} tehtavia={sisalto.tehtavia1} />
            <Osa sisalto={sisalto.osa2} tehtavia={sisalto.tehtavia2} />
            <Osa sisalto={sisalto.osa3} tehtavia={sisalto.tehtavia3} />
        </div>
    )
}

const Osa = (teksti) => {
    return (
        <div>
            <p>{teksti.sisalto} {teksti.tehtavia}</p>
        </div>
    )
}
const Yhteensa = (yhteensa) => {
    return (
        <div>
            <p>yhteensä {yhteensa.tehtavia} tehtävää</p>
        </div>
    )
}
const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }]
    }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osa1={kurssi.osat[0].nimi}
                osa2={kurssi.osat[1].nimi}
                osa3={kurssi.osat[2].nimi}
                tehtavia1={kurssi.osat[0].tehtavia}
                tehtavia2={kurssi.osat[1].tehtavia}
                tehtavia3={kurssi.osat[2].tehtavia} />
            <Yhteensa tehtavia={kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)