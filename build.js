const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const inputFileName = 'images.js';
const outputDir = 'build-output';
const outputFilePath = path.join(outputDir, inputFileName);

function ensureDirectoryExistence(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
}

function minifyAndEncode(filePath) {
	let code = fs.readFileSync(filePath, 'utf8');

	/* we want these options for many reasons.  
	- I don't want to make debugging the bookmarklet in the browser too difficult.  
	- I don't want the resulting file to be too full of urlencoded space characters.  
	- one of these options seems to prevent an error in firefox which I don't understand, 
	where running the bookmarklet replaces the whole document body with the word "true". 
	*/
	let minifyOptions = { compress: false, mangle: false, output: { beautify: false, comments: false } };

	let minifyResult = UglifyJS.minify(code, minifyOptions);
	if(minifyResult.error) {
		throw new Error(`Error during minification: ${minifyResult.error}`);
	}
	code = minifyResult.code;

	code = 'javascript:' + encodeURIComponent(code);

	return code;
}

function main() {
	ensureDirectoryExistence(outputDir);
	const encodedContent = minifyAndEncode(inputFileName);
	fs.writeFileSync(outputFilePath, encodedContent, 'utf8');
	console.log('Success.  Bookmarklet written to:', outputFilePath);
}

main();
