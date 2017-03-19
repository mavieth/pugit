#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("git add -A . && git commit -a -m 'Major upgrade.' && git push");
// shell.exec("npm version major");
shell.exec("npm publish");