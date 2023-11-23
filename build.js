const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const bookmarkletNames = ['images'];
const outputDir = 'build-output';

function ensureDirectoryExistence(dirPath_) {
	if (!fs.existsSync(dirPath_)) {
		fs.mkdirSync(dirPath_);
	}
}

function getFileContents(filePath_) {
	return fs.readFileSync(filePath_, 'utf8');
}

function minifyAndUriEncode(code_) {

	let r = code_;

	let javascriptPrefix = 'javascript:';
	if(!r.startsWith(javascriptPrefix)) throw new Error();
	r = r.substring(javascriptPrefix.length);

	/* we want these options for these reasons: 
	- I don't want to make debugging the bookmarklet in the browser too difficult.  
	- I don't want the resulting file to be too full of urlencoded space characters.  
	- one of these options seems to prevent an error in firefox which I don't understand, 
	where running the bookmarklet replaces the whole document body with the word "true". 
	*/
	let minifyOptions = { compress: false, mangle: false, output: { beautify: false, comments: false } };

	let minifyResult = UglifyJS.minify(r, minifyOptions);
	if(minifyResult.error) {
		throw new Error(`Error during minification: ${minifyResult.error}`);
	}
	r = minifyResult.code;

	r = 'javascript:' + encodeURIComponent(r);

	return r;
}

function main() {
	ensureDirectoryExistence(outputDir);
	let commonCode = getFileContents('common.js');
	for(let bookmarkletName of bookmarkletNames) {
		let notCommonFileName = `${bookmarkletName}-not-common.js`;
		let notCommonCode = getFileContents(notCommonFileName);
		let combinedCode = `javascript:(function() {\n${commonCode}\n${notCommonCode}\n})();\n`;
		let combinedCodeMinifiedAndUriEncoded = minifyAndUriEncode(combinedCode);
		let combinedOutputFileName = `${bookmarkletName}-bookmarklet.js`;
		let combinedOutputFilePath = path.join(outputDir, combinedOutputFileName);
		fs.writeFileSync(combinedOutputFilePath, combinedCodeMinifiedAndUriEncoded, 'utf8');
		console.log(`Created ${combinedOutputFilePath}`);
	}
}

main();
