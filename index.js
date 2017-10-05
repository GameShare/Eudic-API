const logger = require('./lib/logger.js')('eudicAPI')
const config = require('./config.json')
const EudicClient = require('./lib/EudicClient.js')
const io = require('socket.io-client')

async function main () {
  let socket = io.connect('http://localhost:6000')
  let client = new EudicClient(config.cookie)
  while (true) {
    let wordList = await client.getNewWordList(0, 1)
    logger.info(`The number of new words are ${wordList.recordsTotal}`)
    wordList = await client.getNewWordList(0, wordList.recordsTotal)
    for (let word of wordList.data) {
      // logger.info(`${word.uuid} | ${word.exp}`)
      socket.emit('data', `${word.exp}`)
      socket.emit('data', `${word.uuid}`)
      await timeout(5 * 1000)
    }
  }
}

main()

process.on('unhandledRejection', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

process.on('uncaughtException', (error) => {
  logger.fatal(`UnhandledRejection: Error.\n${error.name}: ${error.message}\nStack: ${error.stack}`)
})

async function timeout (ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms)
  })
}
