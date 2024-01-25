const fs = require('fs-extra')
const jwt = require('jsonwebtoken')
const path = require('path')

const PRIVATE_KEY_PATH = path.join(__dirname, '../keys/boilerplate-example.key')

const generateKey = async (sub, apiKey, issuer, exp) => {
  const privateKey = await fs.readFile(PRIVATE_KEY_PATH, 'utf8')

  let params = {
    expiresIn: '3d',
    algorithm: 'RS512'
  }

  if (issuer && issuer.length) {
    params.issuer = issuer
  }

  if (exp && exp.length) {
    params.expiresIn = exp
  }

  const token = jwt.sign({sub, apiKey}, privateKey, params)

  return token
}

module.exports = {generateKey}
