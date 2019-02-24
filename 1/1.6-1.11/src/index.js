import React from 'react';
import ReactDOM from 'react-dom';

const Header = (nimi) => {
    return <h1>{nimi.nimi}</h1>
}
const Nappi = (props) => {
    return <button onClick={props.onClick}>{props.nimi}</button>
}
const Keskiarvo = (props) => {
    const { hyviä, neutraaleja, huonoja, kertaaÄänestetty } = props
    const arvo = Desimaalia((hyviä * 1 + neutraaleja * 0 + huonoja * -1) / kertaaÄänestetty, 1)

    if (isNaN(arvo) || arvo === 0) return 0
    else
        return (
            <tr>
                <td>Keskiarvo</td>
                <td> {arvo}</td>
            </tr>
        )
}
const Positiivisia = (props) => {
    const { hyviä, kertaaÄänestetty } = props
    const arvo = Desimaalia(hyviä / kertaaÄänestetty * 100, 1)

    if (isNaN(arvo) || arvo === 0) return ""
    else
        return (
            <tr>
                <td>Positiivisia</td>
                <td> {arvo} %</td>
            </tr>
        )
}
const Statistiikat = (props) => {
    const { hyviä, neutraaleja, huonoja, kertaaÄänestetty } = props
    if (kertaaÄänestetty === 0 || isNaN(kertaaÄänestetty)) return <p>Ei yhtään palautetta annettu</p>
    return (
        <table>
            <tbody>
                <tr>
                    <td>Hyvä</td>
                    <td>{hyviä}</td>
                </tr>
                <tr>
                    <td>Neutraali</td>
                    <td>{neutraaleja}</td>
                </tr>
                <tr>
                    <td>Huono</td>
                    <td>{huonoja}</td>
                </tr>
                <Keskiarvo hyviä={hyviä} neutraaleja={neutraaleja} huonoja={huonoja} kertaaÄänestetty={kertaaÄänestetty} />
                <Positiivisia hyviä={hyviä} kertaaÄänestetty={kertaaÄänestetty} />
            </tbody>
        </table>
    )
}
const Desimaalia = (arvo, montako) => {
    return (Number(arvo).toFixed(montako))
}
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
        }
    }
    render() {
        const summa = this.state.hyvä + this.state.neutraali + this.state.huono

        return (
            <div>
                <Header nimi={"Anna palautetta"} />
                <div>
                    <Nappi nimi={"Hyvä"} onClick={() => this.setState({ hyvä: this.state.hyvä + 1 })} />
                    <Nappi nimi={"Neutraali"} onClick={() => this.setState({ neutraali: this.state.neutraali + 1 })} />
                    <Nappi nimi={"Huono"} onClick={() => this.setState({ huono: this.state.huono + 1 })} />

                </div>
                <Header nimi={"Statistiikka"} />
                <Statistiikat hyviä={this.state.hyvä} neutraaleja={this.state.neutraali} huonoja={this.state.huono} kertaaÄänestetty={summa} />
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
