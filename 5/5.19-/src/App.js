import React from 'react';
const actionFor = {
  voting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  newAnecdote(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content
      }
    }
  }
}

class App extends React.Component {
  click = (id) => {
    this.props.store.dispatch(actionFor.voting(id))
  }
  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(actionFor.newAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }
  render() {

    const anecdotes = this.props.store.getState()
    anecdotes.sort((a, b) => {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.click(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App