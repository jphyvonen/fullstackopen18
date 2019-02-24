import React from 'react'
import { actionForVoting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  vote = (anecdote) => {
    this.props.actionForVoting(anecdote);
    this.props.notify(`you voted ${anecdote.content}`, 5);
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes} votes</div>
            <button onClick={() => this.vote(anecdote)}>Vote</button>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  // console.log(anecdotes)
  const filtered = anecdotes.filter(x => x.content.toLowerCase().includes(filter))
  const sorted = filtered.sort((a, b) => b.votes - a.votes)
  return sorted
}
const mapStateToProps = (state) => {
  return { visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter) }
}
const mapDispatchToProps = {
  actionForVoting,
  notify
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList



