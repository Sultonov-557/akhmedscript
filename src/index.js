#!/usr/bin/env node
const fs = require("fs");
const { run } = require("node:test");

const fileName = process.argv.splice(2, 1)[0];
const file = fs.readFileSync(fileName).toLocaleString();
let code = file;

code = code.replace("o'zgarmas o'zgaruvchi", "const");
code = code.replace("teng", "=");
code = code.replace("consl", "console");

eval(code);
