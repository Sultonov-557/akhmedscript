const replaceList = require("./replaceList.json");

function convertCode(code) {
	code = code.replace(/  /g, "");

	code = code.split(`"`);

	for (let i in code) {
		if (i % 2 == 0) {
			for (let key in replaceList) {
				const value = replaceList[key];
				if (code[i].includes(value)) {
					throw new Error(`wtf is ${value}`);
				}

				code[i] = code[i].replaceAll(key, value);
			}
		}
	}

	code = code.join(`"`);
	return code;
}

function parseError(text) {
	let out;

	let match = text.match(/(.*) is not defined/);
	if (match) {
		out = `there is no ${match[1]}`;
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
