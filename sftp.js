'use strict'

const async = require('async')
const fs = require('fs')
const _ = require('lodash')
const Base = require('bfx-facs-base')
let Client = require('ssh2-sftp-client')

function client (conf, label) {
  // create sft object
  this.sftp = new Client()

  return this.sftp.connect({
    host: conf.host,
    port: conf.port,
    username: conf.username,
    password: conf.password,
    privateKey: conf.privateKey
  })
}

class StoreFacility extends Base {
  constructor (caller, opts, ctx) {
    super(caller, opts, ctx)

    this.name = 'sftp'
    this._hasConf = true

    this.init()
  }

  _start (cb) {
    async.series([
      next => { super._start(next) },
      next => {
        const conf = _.pick(this.conf, [
          'host', 'port',
          'username', 'password',
          'privateKey'
        ])

        let {
          host,
          port,
          username,
          password,
          privateKey
        } = conf

        if (!host || !port || !username || !(password || privateKey)) {
          return next(
            new Error('ERR_SFTP_CONF')
          )
        }

        if (privateKey) {
          try {
            privateKey = fs.readFileSync(privateKey, { encoding: 'utf8' })
          } catch (e) {
            return next(
              new Error('ERR_SFTP_PRIVATE_KEY')
            )
          }
        }

        client(conf)
          .then(() => {
            next(null)
          })
          .catch((err) => {
            next(err)
          })
      }
    ], cb)
  }

  _stop (cb) {
    this.sftp.async.series([
      next => { super._stop(next) },
      next => {
        this.sftp.end()
        this.sftp.on('end', () => {
          delete this.sftp
          next()
        })
      }
    ], cb)
  }
}
module.exports = StoreFacility
