#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("git add -A . && git commit -a -m 'NPM patch change.'");
shell.exec("git push");
shell.exec("npm version patch");
shell.exec("npm publish");