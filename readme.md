# 1 File Compiler

## What is this?

This is a usefull tool for compiling html, css and javascript into one html file. I could not find something like this so i made it myself.

## Why?

I created this because i wanted a user to be able to open one html file and view a website without loading content from the internet or other local files.

## CAUTION

**This probably has a lot of bugs so be aware if your gonna use this in production** _tip: don't_

**It also does not manage errors well at all**

## Installation

`npm i -g 1filecompiler` for CLI

`npm i --save-dev 1filecompiler` for api

## CLI

The cli is easy

`npx 1fc input.html output.html`

## API

```javascript
const { compile } = require("1fc"); // Import module

let compiledHTML = compile("./input.html"); // Read file and then compile it
console.log(compiledHTML); // Log the compiled output to console
```
