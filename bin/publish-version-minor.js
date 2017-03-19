#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("git add -A . && git commit -a -m 'Minor upgrade.' && git push");
shell.exec("npm version minor");
shell.exec("npm publish");