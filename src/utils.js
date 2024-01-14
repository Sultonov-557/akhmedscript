const replaceList = require("./replaceList.json");

function convertCode(string) {
  const lines = string.split("\r\n");
  for (let codeI in lines) {
    let code = lines[codeI].split(`"`);

    for (let i in code) {
      if (i % 2 == 0) {
        for (let key in replaceList) {
          const value = replaceList[key];
          if (code[i].includes(value)) {
            throw new Error(`${value} mas ${key} bo'lodi \nqator: ${codeI + 1}`);
          }

          code[i] = code[i].replaceAll(key, value);
        }
      }
    }
    code = code.join(`"`);
    lines[codeI] = code;
  }
  string = lines.join(`\n`);
  string = "(async ()=>{" + string + "})()";

  return string;
}

function parseError(text) {
  let out;

  let match = text.match(/(.*) is not defined/);
  if (match) {
    out = `there is no ${match[1]}`;
  }

  if (text == 'Error: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined') {
    out = "file 404";
  }

  if (text == "Unexpected string") {
    out = "sintaxsis error";
  }

  if (text == "Assignment to constant variable.") {
    out =
      "o'zgarmas o'zgaruvchini o'zgartirish munkin emas o'zgarmas o'zgaruvchini o'rgaruvchini o'zgaruvchan o'zgaruvchiga aylantiring";
  }

  if (!out) {
    out = text;
  }

  return out;
}

module.exports = { convertCode, parseError };
