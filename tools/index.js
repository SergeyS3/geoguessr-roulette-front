const atob = str => Buffer.from(str).toString('base64')

const makeBasicAuthValue = (login, password) => `Basic ${atob(`${login}:${password}`)}`

module.exports = { makeBasicAuthValue }
