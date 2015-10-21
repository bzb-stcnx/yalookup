'use strict'
/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ../LICENSE
 */

/* eslint-env jasmine */

var lookup
// var fs, path
var createSpy
var mockery

beforeEach(function () {
//  fs = require('fs')
//  path = require('path')
  lookup = require('../')
  createSpy = require('./support/create-spy.js')
  mockery = require('mockery')
})

describe('yalookup:', function () {
  var mock

  beforeEach(function () {
    mockery.enable({ useCleanCache: true })
    mock = createSpy({
      fs: [ 'accessSync' ],
      path: [ 'dirname', 'relative', 'join' ],
      process: [ 'cwd' ]
    })
    mock.fs.R_OK = 'R_OK'
    mockery.registerMock('fs', mock.fs)
    mockery.registerMock('path', mock.path)
    mockery.registerMock('process', mock.process)
  })

  afterEach(function () {
    mockery.deregisterAll()
    mockery.disable()
  })

  describe('when given no arguments,', function () {
    var result

    beforeEach(function () {
      result = lookup()
    })

    it('returns null', function () {
      expect(result).toBe(null)
    })

    it('does not call any core node modules', function () {
      expect(mock.fs.accessSync).not.toHaveBeenCalled()
      expect(mock.path.dirname).not.toHaveBeenCalled()
      expect(mock.path.relative).not.toHaveBeenCalled()
      expect(mock.path.join).not.toHaveBeenCalled()
      expect(mock.process.cwd).not.toHaveBeenCalled()
    })
  })

  describe('when given (filename: string, options: { cwd: string }) arguments,', function () {
    var FILENAME, CWD

    beforeEach(function () {
      FILENAME = '__filename__'
      CWD = '/path/to/cwd'
    })

    it('process.cwd() is not called', function () {
      expect(mock.process.cwd).not.toHaveBeenCalled()
    })

    describe('if the named file can be found directly in the given path,', function () {
      var result

      beforeEach(function () {
      })

      it('returns the path of the named file', function () {
        expect(result).toBe(null)
      })
    })

    describe('if the named file can be found in a parent directory of the given path,', function () {
      var result

      beforeEach(function () {
      })

      it('returns the path of the named file', function () {
        expect(result).toBe(null)
      })
    })

    describe('otherwise', function () {
      var result

      beforeEach(function () {
      })

      it('returns null', function () {
        expect(result).toBe(null)
      })
    })
  })

  describe('when given only a (filename: string) argument,', function () {
    var FILENAME, CWD
    var result

    beforeEach(function () {
      FILENAME = '__filename__'
      CWD = '/path/to/cwd'
    })

    it('defaults to process.cwd()', function () {
      expect(result).toBe(null)
    })
  })
})
