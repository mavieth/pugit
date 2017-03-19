# pugit@1.0.0
 [![npm version](https://badge.fury.io/js/pugit.svg)](https://npmjs.org/package/pugit)  [![build status](https://travis-ci.org/mavieth/pugit.svg)](https://travis-ci.org/mavieth/pugit)  [![coverage status](https://coveralls.io/repos/mavieth/pugit/badge.svg)](https://coveralls.io/github/mavieth/pugit)  [![dependency status](https://david-dm.org/mavieth/pugit.svg?theme=shields.io)](https://david-dm.org/mavieth/pugit)  [![devDependency status](https://david-dm.org/mavieth/pugit/dev-status.svg)](https://david-dm.org/mavieth/pugit#info=devDependencies)  [![Gitter](https://badges.gitter.im/mavieth/pugit.svg)](https://gitter.im/mavieth/pugit) 

Command line tool to generate .pug files from html


## Installation
Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install pugit --save
```

## Usage
Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

A full HTML body example.                   
```
pugit test.html
```

Bodyless (no html or head tags) output.                       
```
pugit test.html --bodyless
```

Bodyless with 4 spaces instead of 2.   
```
pugit test.html --bodyless --spaces 4
```

New output filename.                   
```
pugit test.html --output newoutput.html
```

New output filename in a new directory.                   
```
pugit test.html --output newdirectory/newoutput.html
```

## Dependencies

- [colors](https://github.com/Marak/colors.js): get colors in your node.js console
- [command-line-args](https://github.com/75lb/command-line-args): A mature, feature-complete library to parse command-line options.
- [command-line-usage](https://github.com/75lb/command-line-usage): Generates command-line usage information
- [html2jade](https://github.com/donpark/html2jade): HTML to Jade conversion tool
- [shelljs](https://github.com/shelljs/shelljs): Portable Unix shell commands for Node.js

## License
[ISC]()
