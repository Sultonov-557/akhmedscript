#!/usr/bin/env node
const fs = require("fs");
const { run } = require("node:test");
const { convertCode, parseError } = require("./utils");

const args = process.argv.splice(2, 100);

const flags = args.filter((v) => {
	if (v.startsWith("--")) return true;
});

const fileName = args.filter((v) => {
	if (!v.startsWith("--")) return true;
})[0];

if (flags.includes("--watch")) {
	console.clear();
	fs.watchFile(fileName, () => {
		console.clear();
		runCode();
	});
}

runCode();

function runCode() {
	console.log("running...");
	try {
		const file = fs.readFileSync(fileName).toLocaleString();
		const code = convertCode(file);
		eval(code);
	} catch (e) {
		let text = e.message;

		console.error(`Error: ${parseError(text)}`);
	}
}
