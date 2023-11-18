javascript:
var bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f;
(async function (bookmarkletVars) {

	function findElements(selector_) {

		function getShadowRoots(node_, returnValShadowRoots_) {
			if (node_.shadowRoot) {
				returnValShadowRoots_.push(node_.shadowRoot);
			}

			for (const childNode of node_.childNodes) {
				if (childNode.nodeType === Node.ELEMENT_NODE) {
					getShadowRoots(childNode, returnValShadowRoots_);
				}
			}
		}

		let roots = [document.body];

		getShadowRoots(document.body, roots);

		let r = [];
		for(let root of roots) {
			r.push(...root.querySelectorAll(selector_));
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



    function callback() {
        function l() {
			
			for(let foundElem of findElements('h1')) {;
				insertAsFirstChild(foundElem, "<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;h1&gt;</strong>");
				insertAsLastChild(foundElem, "<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/h1&gt;</strong>");
			}

			for(let foundElem of findElements('h2')) {
				insertAsFirstChild(foundElem, "<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;h2&gt;</strong>");
				insertAsLastChild(foundElem, "<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/h2&gt;</strong>");
			}
		
			$("script[src$='headings.js']").remove();
			s.remove();
        }
        l()
    }
    var s = document.createElement("script");
    s.addEventListener 
			? s.addEventListener("load", callback, !1) 
			: s.readyState && (s.onreadystatechange = callback), 
				s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js", 
				document.body.appendChild(s);
})(bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f || (bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f = {}));
