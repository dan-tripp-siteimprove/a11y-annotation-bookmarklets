javascript:
var bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f;
(async function (bookmarkletVars) {

	const UNIQUE_ID_FOR_THIS_BOOKMARKLET = '3394c278_f9fa_4a37_837f_c3e1b16a2c1f';
	const cssClassNameFOrTheElementsAddedByThisBookmarklet = `class_${UNIQUE_ID_FOR_THIS_BOOKMARKLET}`;
	
	function getRootsForQuerySelector() {
		let r = [document.body];

		function findShadowRoots(node__) {
			if (node__.shadowRoot) {
				r.push(node__.shadowRoot);
			}
			for (const childNode of node__.childNodes) {
				if (childNode.nodeType === Node.ELEMENT_NODE) {
					findShadowRoots(childNode);
				}
			}
		}
		findShadowRoots(document.body);
		
		for(let iframe of document.body.querySelectorAll('iframe')) {
			if(!iframe.contentDocument) continue; /* cross-origin iframe.  nothing we can do. */
			r.push(iframe.contentDocument);
		}
		return r;
	}

	function findElements(selector_, rootsForQuerySelector_) {
		let r = [];
		for(let rootForQuerySelector of rootsForQuerySelector_) {
			r.push(...rootForQuerySelector.querySelectorAll(selector_));
		}
		return r;
	}

	function parseHtmlElementStr(str_) {
		const parser = new DOMParser();
		const parsedDocument = parser.parseFromString(str_, 'text/html');
		const r = parsedDocument.body.firstChild;
		return r;
	}

	function insertAsFirstChild(targetElem_, htmlStrToPrepend_)  {
		const newElem = parseHtmlElementStr(htmlStrToPrepend_);
		targetElem_.insertBefore(newElem, targetElem_.firstChild);
	}

	function insertAsLastChild(targetElem_, htmlStrToPrepend_)  {
		const newElem = parseHtmlElementStr(htmlStrToPrepend_);
		targetElem_.appendChild(newElem);
	}

    function run() {
		let rootsForQuerySelector = getRootsForQuerySelector();

		for(let foundElem of findElements(`.${cssClassNameFOrTheElementsAddedByThisBookmarklet}`, 
				rootsForQuerySelector)) {
			foundElem.remove();
		}

		let selectors = ["h1", "h2", "h3", "h4", "h5", "h6",
			"[role='heading'][aria-level='1']", "[role='heading'][aria-level='2']",
			"[role='heading'][aria-level='3']", "[role='heading'][aria-level='4]'",
			"[role='heading'][aria-level='5']", "[role='heading'][aria-level='6']"];
		
		for(let selector of selectors) {
			for(let foundElem of findElements(selector, rootsForQuerySelector)) {
				const htmlPreamble = `<strong class="${cssClassNameFOrTheElementsAddedByThisBookmarklet}" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;">&lt;`;
				const htmlPostamble = "&gt;</strong>";
				let htmlForFirstChild = `${htmlPreamble}${selector}${htmlPostamble}`;
				let htmlForLastChild = `${htmlPreamble}/${selector}${htmlPostamble}`;
				insertAsFirstChild(foundElem, htmlForFirstChild);
				insertAsLastChild(foundElem, htmlForLastChild);
			}
		}
		
    }

	run();
    
})(bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f || (bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f = {}));
