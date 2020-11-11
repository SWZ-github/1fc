#!/usr/bin/env node
let onefc = require("./src/index.js");
let { writeFileSync } = require("fs");
const args = process.argv;
args.shift();
args.shift();

console.log(
  `1 File Compiler
(c) Simon Lindgren 2020
`
);

function usageError() {
  console.log("Incorrect usage");
  console.log("Correct usage: npx 1fc ./input.html ./output.html");
  process.exit();
}

if (args.length < 2) {
  usageError();
}

writeFileSync(args[1], onefc.compile(args[0]), "utf-8");

console.log(`Bundled all linked files from ${args[1]} into ${args[0]}`);
