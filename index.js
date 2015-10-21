/* (c) Copyright 2015, bzb-stcnx
 * all rights reserved
 * SEE LICENSE IN ./LICENSE
 */

module.exports = lookup

var fs = require('fs')
var path = require('path')
var process = require('process')

/**
 * @description very light version of look-up
 * @param {string} filename no support for glob, etc., just a simple file name
 * @param {object} options, optional, defaults to { cwd: process.cwd() }
 * only supports 'cwd'.
 * @return {string} the first file path where filename was found
 * starting from options.cwd upwards, or null if the file was not found
 */
function lookup (filename, options) {
  var basedir

  if (!isDefined(filename)) return null
  basedir = isDefined(options) && isDefined(options.cwd)
    ? options.cwd : process.cwd()

  return _lookup(basedir, filename)
}

/**
 * @description recursive look-up with custom arguments
 * @param {string} basedir the directory to look into and above
 * @param {string} filename
 * @return {string} the first file path where filename was found,
 * or null if the file was not found in or above path
 */
function _lookup (basedir, filename) {
  var filepath = path.join(basedir, filename)
  var parent
  try {
    fs.accessSync(filepath, fs.R_OK)
    return filepath // found if no error thrown
  } catch (err) {
    // continue
  }
  parent = path.dirname(basedir)
  if (!path.relative(parent, basedir).length) return null // root dir
  return _lookup(parent, filename)
}

/**
 * @param {any} val
 * @return {boolean} true if val is not undefined or null
 */
function isDefined (val) {
  return (typeof val !== 'undefined') && (val !== null)
}
