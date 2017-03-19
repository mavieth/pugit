#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("git add -A . && git commit -a -m 'Patch upgrade.' && git push");
shell.exec("npm version patch");
shell.exec("npm publish");