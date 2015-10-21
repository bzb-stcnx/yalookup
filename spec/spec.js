'use strict'
/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ../LICENSE
 */

/* eslint-env jasmine */

var lookup
var fs, path, process
var mockery

beforeEach(function () {
  fs = require('fs')
  path = require('path')
  process = require('process')
  lookup = require('../')
  mockery = require('mockery')
})

describe('yalookup', function () {
  var cwd

  beforeEach(function () {
    mockery.enable({ useCleanCache: true })

    mockery.registerAllowables([
      'fs',
      'process',
      'path'
    ])

    cwd = process.cwd()
  })

  afterEach(function () {
    mockery.deregisterAll()
    mockery.disable()
  })

  it('tbd')
})
