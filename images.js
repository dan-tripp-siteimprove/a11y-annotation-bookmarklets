javascript:
var bookmarkletVars_2b3fac1c_761c_4155_b2ba_f5fb1f751cf2;
(async function(bookmarkletVars) {

    const UNIQUE_ID_FOR_THIS_BOOKMARKLET = '2b3fac1c_761c_4155_b2ba_f5fb1f751cf2';
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

        for (let iframe of document.body.querySelectorAll('iframe')) {
            if (!iframe.contentDocument) continue; /* cross-origin iframe.  nothing we can do. */
            r.push(iframe.contentDocument);
        }
        return r;
    }

    function findElements(selector_, rootsForQuerySelector_) {
        let r = [];
        for (let rootForQuerySelector of rootsForQuerySelector_) {
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

    function insertAsFirstChild(targetElem_, htmlStrToInsert_) {
        const newElem = parseHtmlElementStr(htmlStrToInsert_);
        targetElem_.insertBefore(newElem, targetElem_.firstChild);
    }

    function insertAsLastChild(targetElem_, htmlStrToInsert_) {
        const newElem = parseHtmlElementStr(htmlStrToInsert_);
        targetElem_.appendChild(newElem);
    }

	function insertBefore(targetElem_, htmlStrToInsert_)  {
		const newElem = parseHtmlElementStr(htmlStrToInsert_);
		targetElem_.parentElement.insertBefore(newElem, targetElem_);
	}

	function insertAfter(targetElem_, htmlStrToInsert_)  {
		const newElem = parseHtmlElementStr(htmlStrToInsert_);
		targetElem_.parentElement.insertBefore(newElem, targetElem_.nextSibling);
	}

    function attr(elem_, attrName_) {
        let r = elem_.getAttribute(attrName_);
		return r;
    }

    function setAttr(elem_, attrName_, attrValue_) {
        elem_.setAttribute(attrName_, attrValue_);
    }

    function run() {
        let rootsForQuerySelector = getRootsForQuerySelector();

        for (let foundElem of findElements(`.${cssClassNameForElementsAddedByThisBookmarklet}`,
                rootsForQuerySelector)) {
            foundElem.remove();
        }

        document.body.querySelectorAll("a[alt], button[alt], label[alt]").forEach((e) => {
            insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\"> INVALID❌alt=\"" + attr(e, 'alt') + "\" on " + e.tagName + "</span>");
        });

        document.body.querySelectorAll("img, [role=img]").forEach((e) => {
            if (attr(e, 'role')) {
                insertAfter(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">❓role=\"" + attr(e, 'role') + "\"</span>");
            }
            if (attr(e, 'aria-label')) {
                insertAfter(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">❓aria-label=\"" + attr(e, 'aria-label') + "\"</span>");
            }
            if (attr(e, 'aria-describedby')) {
                insertBefore(e, "<span class=\"axSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-describedby=\"" + attr(e, 'aria-describedby') + "\"</span>");
                var describedbyValue = attr(e, 'aria-describedby');
                for (let describedById of describedbyValue.split(' ')) {
                    document.body.querySelectorAll('[id="' + describedById + '"]')
						.forEach((describedByElem) => {
							setAttr(describedByElem, 'style', 'outline:orange 2px dashed;');
							insertBefore(describedByElem, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;z-index:2147483647;speak:literal-punctuation;\">id=\"" + describedById + "\"</span>");
						});
					}
            }
            if (attr(e, 'aria-labelledby')) {
                insertAfter(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-labelledby=\"" + attr(e, 'aria-labelledby') + "\"</span>");
                var labelledbyValue = attr(e, 'aria-labelledby');
                for (let labelledById of labelledbyValue.split(' ') ) {
					document.body.querySelectorAll('[id="'+labelledById+'"]').forEach((labelledByElem) => {
						setAttr(labelledByElem, 'style', 'outline:orange 2px dashed;');
						insertBefore(labelledByElem, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;z-index:2147483647;speak:literal-punctuation;\">id=\"" + labelledById + "\"</span>");
					});
                }
            }
            attr(e, 'style', 'outline:green 2px solid;padding:2px;');
            if (!e.hasAttribute('alt')) {
                if (e.parentElement.tagName.toLowerCase() === 'a') {
                    if (!e.hasAttribute('aria-label')) {
                        if (!e.hasAttribute('aria-labelledby')) {
                            if (!e.hasAttribute('aria-describedby')) {
                                if (!e.hasAttribute('title')) {
                                    insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:red 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;border-bottom:2px solid blue;\">LINK IMG❌NO ALT</span>");
                                }
                            }
                        }
                    }
                } else if (!e.hasAttribute('aria-label')) {
                    if (!e.hasAttribute('aria-labelledby')) {
                        if (!e.hasAttribute('aria-describedby')) {
                            if (!e.hasAttribute('title')) {
                                attr(e, 'style', 'outline:red 2px solid;padding:2px;');
                                insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:red 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;\">IMG❌NO ALT</span>");
                            }
                        }
                    }
                }
            } else {
                attr(e, 'style', 'outline:green 2px solid;padding:2px;');
                if (e.parentElement.tagName.toLowerCase() === 'a') {
                    if (attr(e, 'alt') == "") {
                        insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak:literal-punctuation;border-bottom:2px solid blue;\">LINK IMG❓alt=\"" + attr(e, 'alt') + "\"</span>");
                    } else {
                        insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak:literal-punctuation;border-bottom:2px solid blue;\">LINK IMG👍alt=\"" + attr(e, 'alt') + "\"❓</span>");
                    }
                } else {
                    insertBefore(e, "<span class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak: literal-punctuation;\">IMG👍alt=\"" + attr(e, 'alt') + "\"❓</span>");
                }
            }
            if (e.hasAttribute('title')) {
                insertAfter(e, "<span role=\"region\" aria-label=\"Title\" class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;\">❓title=\"" + attr(e, 'title') + "\"</span>");
            }
            if (e.hasAttribute('longdesc')) {
                insertAfter(e, "<span role=\"region\" aria-label=\"Long Description\" class=\""+cssClassNameForElementsAddedByThisBookmarklet+"\"style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;\">❓longdesc=\"" + attr(e, 'longdesc') + "\"</span>");
            }

        });

    }

	/* Doing it this way makes it so that this code can run either:
	- as a bookmarklet (in which case this code will probably be run after page load is finished)
	or:
	- as a tampermonkey script via "@require" (in which case this code will definitely be run well 
	before page load is finished.) */
	if(document.readyState === "complete") {
		run();
	} else {
		document.addEventListener("readystatechange", (event__) => {
			if(document.readyState === "complete") {
				run();
			}
		});
	}

})(bookmarkletVars_2b3fac1c_761c_4155_b2ba_f5fb1f751cf2 || (bookmarkletVars_2b3fac1c_761c_4155_b2ba_f5fb1f751cf2 = {}));