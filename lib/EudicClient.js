const logger = require('./logger.js')('EudicClient')
const request = require('superagent')
const baseURL = 'http://my.eudic.net'
const studyListURL = `${baseURL}/StudyList`

class EudicClient {
  constructor (eudicCookie) {
    this.cookie = eudicCookie
  }

  async getNewWordList (skip, count) {
    let result = await request.get(`${studyListURL}/WordsDataSource?start=${skip}&length=${count}`)
    .timeout(50000)
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36')
    .set('Referer', `${studyListURL}`)
    .set('Cookie', this.cookie)
    // logger.debug(result.body)
    return result.body
  }
}

module.exports = EudicClient
