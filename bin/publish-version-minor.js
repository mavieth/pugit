#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("git add -A . && git commit -a -m 'NPM minor change.'");
shell.exec("git push");
shell.exec("npm version minor");