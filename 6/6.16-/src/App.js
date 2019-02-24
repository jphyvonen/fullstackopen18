import React from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image, PageHeader, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
const Menu = () => {
  const menuStyle = {
    backgroundColor: 'Turquoise',
    padding: 10,
    fontFamily: 'Arial',
    fontStyle: 'normal'
  }
  const activeStyle = {
    color: 'white',
    fontWeight: 'bold'
  }
  return (
    <div>
      <div style={menuStyle}>
        <NavLink activeStyle={activeStyle} exact to="/">Anecdotes</NavLink>&nbsp;
      <NavLink activeStyle={activeStyle} to="/create">Create new</NavLink>&nbsp;
      <NavLink activeStyle={activeStyle} to="/about">About</NavLink>&nbsp;
    </div>
    </div >
  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)
const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>Has {anecdote.votes} votes </div>&nbsp;
  </div>
)
const About = () => {
  const headerRowStyle = {
    fontWeight: 'bold',
    paddingBottom: 10
  }
  const rowStyle = {
    paddingBottom: 10
  }
  const textRowStyle = {
    paddingRight: 15,
    paddingBottom: 10,
    fontStyle: 'italic'
  }
  const columnStyle = {
  }
  const about = [
    'About anecdote app ',
    'According to Wikipedia:',
    `An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous,
     anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
     such as to characterize a person by delineating a specific quirk or trait,
     to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
     An anecdote is "a story with a point."'`,
    'Software engineering is full of excellent anecdotes, at this app you can find the best and add more.'
  ]
  return (
    <Grid >
      <Col style={columnStyle} md={7}>
        <Row style={headerRowStyle} className="show-grid">
          {about[0]}
        </Row>
        <Row style={rowStyle} className="show-grid">
          {about[1]}
        </Row>
        <Row style={textRowStyle} className="show-grid">
          {about[2]}
        </Row>
        <Row style={textRowStyle} className="show-grid">
          {about[3]}
        </Row>
      </Col>
      <Col style={columnStyle} md={4.5}>
        <Row style={rowStyle} className="show-grid">
          {<Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/KnuthAtOpenContentAlliance.jpg" thumbnail responsive />}
        </Row>
      </Col>
    </Grid>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.setNotification(`Added new anecdote: ${this.state.content}!`)

  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>Author</ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>URL for more information</ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} /><br></br>
            <button>Create</button>
          </FormGroup>
        </form>
      </div>
    )

  }
}
const notificationStyle = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 15,
  borderColor: 'violet',
  padding: 5,
  textAlign: 'center',
  fontSize: 20
}
const Notification = ({ message }) => <div style={notificationStyle}>{message}</div>
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }


  AnecdoteById = (id) => this.state.anecdotes.find(x => x.id === id)
  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  updateNotification = (message) => {
    this.setState({ notification: message })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <PageHeader>Software anecdotes</PageHeader>
            <Menu anecdotes={this.state.anecdotes} addNew={this.addNew} />&nbsp;
            {this.state.notification !== '' ? <Notification message={this.state.notification} /> : <p></p>}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew addNew={this.addNew} history={history} setNotification={this.updateNotification} />} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.AnecdoteById(match.params.id)} />} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
