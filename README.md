# yalookup
yet another lookup

[![NPM](https://nodei.co/npm/yalookup.png?compact=true)](https://nodei.co/npm/yalookup/)

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# motivation
very lean recursive implementation using only node's core modules.
no glob, only one option (cwd), only synchronous and no cli.
nonetheless, open for future enhancements.

# usage
## example
```javascript
var lookup = require('yalookup')
var filepath = lookup('package.json', { cwd: __dirname })
```

## signature
lookup(filename: string, options: object): string

* filename {string} plain text name of the file, no support for glob
* options {object} currently only supports a single option
  * cwd {string} the directory to start searching upwards from
* return {string} the filepath of the file if found, `null` otherwise

# status
this project is currently in concept phase - not appropriate for production.

# license
(C) Copyright 2015, bzb-stcnx,
all rights reserved.
[MIT](./LICENSE)
