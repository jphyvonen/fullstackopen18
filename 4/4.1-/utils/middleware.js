const logger = (request, response, next) => {
  // console.log('Method:', request.method)
  // console.log('Path:  ', request.path)
  // console.log('Body:  ', request.body)
  // console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const tokenExtractor = (request, response, next) => {
  // console.log(request.body)
  const auth = request.get('authorization')
  console.log(auth)
  if (auth && auth.toLowerCase().startsWith('bearer')) {

    request.token = auth.substring(7)
    console.log(request.token)
  }
  next()
}
module.exports = {
  logger,
  error,
  tokenExtractor
}