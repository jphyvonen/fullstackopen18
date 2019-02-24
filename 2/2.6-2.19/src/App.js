import React from 'react';
import personService from './services/persons'
import "./index.css"

const Entry = ({ entries, del }) => {
    return <p>{entries.name} {entries.number} <button onClick={del}>poista</button></p>
}
const Input = ({ name, value, handleChanged, }) => {
    return (
        <div>
            {name}:
            <input
                value={value}
                onChange={handleChanged}
            />
        </div>
    )
}
const FormAddPerson = ({ onSubmit, state, handleNameChange, handleNumberChage }) => {
    return (

        <form onSubmit={onSubmit}>
            <h2>Lisää uusi</h2>
            <Input name={"nimi"} value={state.newName} handleChanged={handleNameChange} />
            <Input name={"numero"} value={state.newNumber} handleChanged={handleNumberChage} />
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="status">
            {message}
        </div>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            statusMessage: null
        }

    }
    componentDidMount() {
        console.log("did mount")
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response.data })
            })
    }
    addName = (event) => {
        event.preventDefault()
        const entryObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        var duplicateNames = this.state.persons
            .filter(x => x.name === this.state.newName)

        if (duplicateNames.length === 0) {
            personService
                .create(entryObject)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        persons: this.state.persons.concat(response.data),
                        newName: '',
                        newNumber: '',
                        statusMessage: 'Lisättiin: ' + response.data.name
                    })
                    setTimeout(() => {
                        this.setState({ statusMessage: null })
                    }, 5000)
                })
        }
        else
            if (window.confirm(`${this.state.newName} löytyy jo luettelosta. Päivitetäänkö numero?`)) {
                const oldPerson = this.state.persons
                    .find(x => x.name === this.state.newName)
                    console.log("oldperson", oldPerson.id)
                const newPerson = {...oldPerson, number: this.state.newNumber}
                console.log("newperson", newPerson.id)

                personService
                    .update(oldPerson.id, newPerson)
                    .then(res => {
                        console.log("frontti", res.data.id)
                        this.setState({
                            persons: this.state.persons.map(person => person.id !== newPerson.id ? person : res.data),
                        })
                    })
            }


    }
    deleteId = (id) => {
        return () => {
            const nimi = this.state.persons.find(x => x.id === id).name

            if (window.confirm(`Poistetaanko: ${nimi}`))
                personService
                    .remove(id)
                    .then(
                        this.setState({
                            persons: this.state.persons.filter(x => x.id !== id),
                            statusMessage: "Poistettiin: " + nimi
                        })
                    )
            setTimeout(() => {
                this.setState({ statusMessage: null })
            }, 5000)
        }
    }
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    render() {
        const filtered = this.state.persons.filter(x => x.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <Notification message={this.state.statusMessage} />
                <h2>Puhelinluettelo</h2>
                <Input name={"rajaa"} handleChanged={this.handleFilterChange} value={this.state.filter} />
                <FormAddPerson onSubmit={this.addName} state={this.state} handleNameChange={this.handleNameChange} handleNumberChage={this.handleNumberChange} />
                <h2>Numerot</h2>
                {filtered.map(x => <Entry key={x.name} entries={x} del={this.deleteId(x.id)} />)}
            </div >
        )
    }
}

export default App