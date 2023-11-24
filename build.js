const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const BOOKMARKLET_NAMES = ['images'];
const OUTPUT_DIR = 'build-output';

function ensureDirectoryExistence(dirPath_) {
	if (!fs.existsSync(dirPath_)) {
		fs.mkdirSync(dirPath_);
	}
}

function getFileContents(filePath_) {
	let r = fs.readFileSync(filePath_, 'utf8');
	r = r.replace(/\r\n/g, '\n'); // normalize EOLs to unix 
	return r;
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

function writeStrToFile(str_, filePath_) {
	fs.writeFileSync(filePath_, str_, 'utf8');
	console.log(`Wrote ${filePath_}`);
}

function writeCombinedCodeToBookmarkletOutputFile(combinedCode_, bookmarkletName_) {
	let combinedCodeMinifiedAndUriEncoded = minifyAndUriEncode(combinedCode_);
	let combinedOutputFileName = `${bookmarkletName_}-bookmarklet.js`;
	let combinedOutputFilePath = path.join(OUTPUT_DIR, combinedOutputFileName);
	writeStrToFile(combinedCodeMinifiedAndUriEncoded, combinedOutputFilePath);
}

function writeCombinedCodeToTampermonkeyRequireDirectiveSourceFile(combinedCode_, bookmarkletName_) {
	let combinedOutputFileName = `${bookmarkletName_}-tampermonkey-require-directive-source-file.js`;
	let combinedOutputFilePath = path.join(OUTPUT_DIR, combinedOutputFileName);
	writeStrToFile(combinedCode_, combinedOutputFilePath);
}

function main() {
	ensureDirectoryExistence(OUTPUT_DIR);
	let commonCode = getFileContents('common.js');
	commonCode = commonCode.replace(/__BUILD_TIMESTAMP_IN_EPOCH_MILLIS__/, Date.now().toString());
	for(let bookmarkletName of BOOKMARKLET_NAMES) {
		let notCommonFileName = `${bookmarkletName}-not-common.js`;
		let notCommonCode = getFileContents(notCommonFileName);

		/* without this semicolon, this script will break when run in tampermonkey via 
		@require. the error message (in devtools console) was: 
		userscript.html?name=bookmarklet-dev%252C-auto-load-scratch-local-file.user.js&id=a3c6bae5-a4c1-4509-8da9-dffb94adfa98:176 Uncaught (in promise) TypeError: (intermediate value)(...) is not a function */
		let importantSemicolon = ';';

		let combinedCode = 
			`javascript:(function() {\n${commonCode}\n${notCommonCode}\n})()${importantSemicolon}\n`;

		writeCombinedCodeToBookmarkletOutputFile(combinedCode, bookmarkletName);
		writeCombinedCodeToTampermonkeyRequireDirectiveSourceFile(combinedCode, bookmarkletName);

	}
}

main();
