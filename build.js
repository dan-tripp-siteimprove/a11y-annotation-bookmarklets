const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const inputFilePath = 'images.js';
const outputDir = 'build-output';
const outputFilePath = path.join(outputDir, 'images.js');

function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

function minifyAndEncode(filePath) {
    try {
        let code = fs.readFileSync(filePath, 'utf8');

				let minifyOptions = { compress: false, mangle: false, output: { beautify: false, comments: false } };
        let minifyResult = UglifyJS.minify(code, minifyOptions);
        if (minifyResult.error) {
            console.error('Error during minification:', minified.error);
            return;
        }
				code = minifyResult.code;

        code = 'javascript:' + encodeURIComponent(code);

				return code;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

function main() {
    ensureDirectoryExistence(outputDir);
    const encodedContent = minifyAndEncode(inputFilePath);
    if (encodedContent) {
        fs.writeFileSync(outputFilePath, encodedContent, 'utf8');
        console.log('Bookmarklet written to:', outputFilePath);
    }
}

main();
