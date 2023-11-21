javascript:
var bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f;
(async function (bookmarkletVars) {

	const UNIQUE_ID_FOR_THIS_BOOKMARKLET = '3394c278_f9fa_4a37_837f_c3e1b16a2c1f';
	const cssClassNameForElementsAddedByThisBookmarklet = `class_${UNIQUE_ID_FOR_THIS_BOOKMARKLET}`;
	
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

	function insertAsFirstChild(targetElem_, htmlStrToInsert_)  {
		const newElem = parseHtmlElementStr(htmlStrToInsert_);
		targetElem_.insertBefore(newElem, targetElem_.firstChild);
	}

	function insertAsLastChild(targetElem_, htmlStrToInsert_)  {
		const newElem = parseHtmlElementStr(htmlStrToInsert_);
		targetElem_.appendChild(newElem);
	}

    function run() {
		let rootsForQuerySelector = getRootsForQuerySelector();

		for(let foundElem of findElements(`.${cssClassNameForElementsAddedByThisBookmarklet}`, 
				rootsForQuerySelector)) {
			foundElem.remove();
		}

		let selectors = ["h1", "h2", "h3", "h4", "h5", "h6",
			"[role='heading'][aria-level='1']", "[role='heading'][aria-level='2']",
			"[role='heading'][aria-level='3']", "[role='heading'][aria-level='4]'",
			"[role='heading'][aria-level='5']", "[role='heading'][aria-level='6']"];
		
		let foundAnyElems = false;
		for(let selector of selectors) {
			for(let foundElem of findElements(selector, rootsForQuerySelector)) {
				foundAnyElems = true;
				const htmlPreamble = `<strong class="${cssClassNameForElementsAddedByThisBookmarklet}" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;">&lt;`;
				const htmlPostamble = "&gt;</strong>";
				let htmlForFirstChild = `${htmlPreamble}${selector}${htmlPostamble}`;
				let htmlForLastChild = `${htmlPreamble}/${selector}${htmlPostamble}`;
				insertAsFirstChild(foundElem, htmlForFirstChild);
				insertAsLastChild(foundElem, htmlForLastChild);
			}
		}
		showMsg(foundAnyElems);
    }

	function showMsg(foundAnyElems_) {
		let idForMsgElem = `msg_${UNIQUE_ID_FOR_THIS_BOOKMARKLET}`;
		let msg = foundAnyElems_ 
			? 'Success: some headings were found on the page' 
			: 'No headings were found on page';
		insertAsFirstChild(document.body, 
			`<strong role="alert" style="color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;" id="${idForMsgElem}" role="status">${msg}</strong>`);
		setTimeout(() => {
				document.getElementById(idForMsgElem).remove();
			}, 6000);
	}

	run();
    
})(bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f || (bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f = {}));
