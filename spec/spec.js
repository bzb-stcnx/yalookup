'use strict'
/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ../LICENSE
 */

/* eslint-env jasmine */

var createSpy

beforeEach(function () {
  createSpy = require('./support/create-spy.js')
})

describe('yalookup:', function () {
  var mockery
  var lookup
  var mock

  beforeEach(function () {
    mockery = require('mockery')
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
    mockery.registerAllowable('../')
    lookup = require('../')
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

  describe('when given (filename: string, options: { cwd: string }),', function () {
    var FILENAME, CWD, FILEPATH, COUNT_START
    var doLookup

    beforeEach(function () {
      FILENAME = '__filename__'
      CWD = '/path/to/cwd/'
      FILEPATH = '/ya/found/it'
      COUNT_START = 3
      doLookup = function () {
        return lookup(FILENAME, { cwd: CWD })
      }
      mock.path.join.and.returnValue(FILEPATH)
    })

    describe('if the named file is in the given directory,', function () {
      var result

      beforeEach(function () {
        // mock.fs.accessSync does not throw
        result = doLookup()
      })

      it('returns the corresponding path of the named file', function () {
        expect(result).toBe(FILEPATH)
        expect(mock.fs.accessSync.calls.count()).toBe(1)
      })

      it('process.cwd() is not called', function () {
        expect(mock.process.cwd).not.toHaveBeenCalled()
      })
    })

    describe('if the named file is in a parent directory of the given directory,', function () {
      var count
      var result

      beforeEach(function () {
        count = COUNT_START
        mock.path.relative.and.returnValue('/not/root/yet') // never reach top
        mock.fs.accessSync.and.callFake(function () {
          if (--count > 0) throw new Error() // do not throw on 0 -> file found
        })
        result = doLookup()
      })

      it('returns the corresponding path of the named file', function () {
        expect(result).toBe(FILEPATH)
        expect(mock.fs.accessSync.calls.count()).toBe(COUNT_START)
      })

      it('process.cwd() is not called', function () {
        expect(mock.process.cwd).not.toHaveBeenCalled()
      })
    })

    describe('otherwise', function () {
      var result

      beforeEach(function () {
        mock.fs.accessSync.and.throwError() // never find
        mock.path.relative.and.returnValues('almost', 'there', '') // reach top
        result = lookup(FILENAME, { cwd: CWD })
      })

      it('returns null', function () {
        expect(result).toBe(null)
      })

      it('process.cwd() is not called', function () {
        expect(mock.process.cwd).not.toHaveBeenCalled()
      })
    })
  })

  describe('when given only (filename: string),', function () {
    var FILENAME, CWD

    beforeEach(function () {
      FILENAME = '__filename__'
      CWD = '/path/to/cwd'
      mock.process.cwd.and.returnValue(CWD)
      lookup(FILENAME)
    })

    it('process.cwd() is called', function () {
      expect(mock.process.cwd).toHaveBeenCalled()
    })

    it('defaults to process.cwd()', function () {
      expect(mock.path.join).toHaveBeenCalledWith(CWD, FILENAME)
    })
  })
})
