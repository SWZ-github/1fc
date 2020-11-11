const jsdom = require("jsdom");
const path = require("path");
const { minify } = require("html-minifier");
const UglifyJS = require("uglify-es");
const { readFileSync } = require("fs");
const { JSDOM } = jsdom;

function compile(filePath) {
  const rawHTML = readFileSync(filePath, "utf-8");
  const dom = new JSDOM(rawHTML);
  let document = dom.window.document;

  document.querySelectorAll("script").forEach((e) => {
    if (!e.src) return;
    if (e.src.match(/^http/)) return;
    let loc = path.join(path.dirname(filePath), e.src);
    e.removeAttribute("src");
    let jsContent = readFileSync(loc, "utf-8");
    let jsUgly = UglifyJS.minify(jsContent);
    if (jsUgly.error) {
      e.innerHTML = jsContent;
      console.log(jsUgly.error);
    } else {
      e.innerHTML = jsUgly.code;
    }
  });
  document.querySelectorAll(`link[rel="stylesheet"]`).forEach((e) => {
    if (!e.href) return;
    if (e.href.match(/^http/)) return;
    let loc = path.join(path.dirname(filePath), e.href);
    let cssContent = readFileSync(loc, "utf-8");
    let newElement = document.createElement("style");
    newElement.innerHTML = cssContent;

    e.outerHTML = newElement.outerHTML;
  });

  let newRawHTML = document.querySelector("html").outerHTML;
  let minifiedHTML = minify(newRawHTML, {
    minifyJS: false,
    minifyCSS: true,
    collapseWhitespace: true,
    removeComments: true,
  });

  return minifiedHTML;
}

module.exports = {
  compile,
};
