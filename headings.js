javascript:
var bookmarkletVars_3394c278_f9fa_4a37_837f_c3e1b16a2c1f;
(async function (bookmarkletVars) {

	function findElements(selector_) {

		// Function to recursively search for elements with shadow roots
		function getShadowRoots(node_, returnValShadowRoots_) {
			if (node_.shadowRoot) {
				// If the current node has a shadow root, add it to the list
				returnValShadowRoots_.push(node_.shadowRoot);
			}

			// Recursively search child nodes
			for (const childNode of node_.childNodes) {
				if (childNode.nodeType === Node.ELEMENT_NODE) {
					// If the child node is an element, search its descendants
					getShadowRoots(childNode, returnValShadowRoots_);
				}
			}
		}

		// Initialize an array to store elements with shadow roots
		let roots = [document.body];

		// Start the search from the top-level document
		getShadowRoots(document.body, roots);

		let r = [];
		for(let root of roots) {
			//console.log(new Date(), root); /* tdr */
			//continue;
			r.push(...root.querySelectorAll(selector_));
		}
		return r;

	}

	function parseHtmlElementStr(str_) {
		// Create a new DOMParser
		const parser = new DOMParser();

		// Parse the HTML string into a DOM document
		const parsedDocument = parser.parseFromString(str_, 'text/html');

		// Extract the element you want to append (e.g., the <div> in this case)
		const r = parsedDocument.body.firstChild;

		// Append the element to the main document's DOM
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
			/*
			$("strong").remove(".openSpan, .closeSpan");
			$("h2").prepend("<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;h2&gt;</strong>");
			$("h2").append("<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/h2&gt;</strong>");
			*/
			/*
			$("h2").each(function(index, element) {
				if(element.innerText.includes('VEHICLE')) {
					console.log(new Date(), element);
				}
			});
			*/
			
			for(let foundElem of findElements('h1')) {;
				insertAsFirstChild(foundElem, "<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;h1&gt;</strong>");
				insertAsLastChild(foundElem, "<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/h1&gt;</strong>");
			}

			for(let foundElem of findElements('h2')) {
				insertAsFirstChild(foundElem, "<strong class=\"openSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;h2&gt;</strong>");
				insertAsLastChild(foundElem, "<strong class=\"closeSpan\" style=\"color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/h2&gt;</strong>");
			}
								
			/*
			if (!$('h1').length && !$('h2').length && !$('h3').length && !$('h4').length && !$('h5').length && !$('h6').length && !$('[role=heading][aria-level=1]').length && !$('[role=heading][aria-level=2]').length && !$('[role=heading][aria-level=3]').length && !$('[role=heading][aria-level=4]').length && !$('[role=heading][aria-level=5]').length && !$('[role=heading][aria-level=6]').length) {
				$('body').prepend('<strong style="color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;" id="failure" role="status"></strong>');
				$('#failure').html('No Headings Found on Page: ' + document.title);
				setTimeout(function(){ $('#failure').remove(); }, 6000);
			} else {
				$('body').append('<div id="success" role="alert" style="position:absolute; width:0; height:0; clip: rect(0,0,0,0);"></div>');
				$('#success').html('Success! Headings Found on Page: ' + document.title);
				setTimeout(function(){ $('#success').remove(); }, 3000);
			}
			*/
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
