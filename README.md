# yalookup
[![NPM](https://nodei.co/npm/yalookup.png?compact=true)](https://nodei.co/npm/yalookup/)
[![build status](https://secure.travis-ci.org/bzb-stcnx/yalookup.png)](http://travis-ci.org/bzb-stcnx/yalookup)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

yet another lookup!
look for a file searching from the current or a given directory up.

# motivation
very lean recursive implementation restricted to using only node's core modules.
* no glob
* only one option (cwd)
* only synchronous
* no cli

at least for now.

# usage
## example
search from `__dirname` upwards for `package.json`:
```javascript
var lookup = require('yalookup')
var filepath = lookup('package.json', { cwd: __dirname })
```

## signature
**lookup(filename: `string`, options: `object`): `string`**
* **filename** `string` plain text name of the file, no support for glob
* **options** `object` currently only supports a single option:
  * **cwd** `string` the directory to start searching upwards from,
  defaults to `process.cwd()`
* **return** `string` the filepath of the file if found, `null` otherwise

# status
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

# license
(C) Copyright 2015, bzb-stcnx,
all rights reserved.
[MIT](./LICENSE)
