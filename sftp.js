'use strict'

const async = require('async')
const _ = require('lodash')
const Base = require('bfx-facs-base')

function client (conf, label) {
  // create sft object

  return null
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
        const conf = _.pick(this.conf, ['repo', 'secret'])
          const {
          repo,
          secret
        } = conf
          if (!repo || !secret) {
          return next(
            new Error('Repo or secret is missing in config')
          )
        }
        this.sftp = client(conf)
        // this.ipfs.on('ready', () => {
        //   this.ipfs_initialised = true
        //   this.ipfs.start()
        //     .then(() => {
        //       next(null)
        //     })
        //     .catch((err) => next(err))
        // })
      }
    ], cb)
  }
    _stop (cb) {
    async.series([
      next => { super._stop(next) },
      next => {
        // if (this.ipfs_initialised) {
        //   this.ipfs.stop()
        //     .catch((err) => next(err))
        // }
        // delete this.ipfs
        // delete this.ipfs_initialised
        next()
      }
    ], cb)
  }
}
module.exports = StoreFacility