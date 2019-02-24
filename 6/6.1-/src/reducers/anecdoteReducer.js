import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const actionForVoting = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}
export const actionForCreating = (content) => {
  return async (dispatch) => {
    const anecdote = {
      content,
      votes: 0
    }
    const newAnecdote = await anecdoteService.addNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}
export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = state.filter(a => a.id !== action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
      console.log(action)
      return [...state, { content: action.data.content, id: action.data.id, votes: 0 }]
    case 'INIT_ANECDOTES':
      return action.data
  }
  return state
}

export default anecdoteReducer