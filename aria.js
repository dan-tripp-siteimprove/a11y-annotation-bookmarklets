
function main() {

	let foundAnyElems = false;
    for(let root of getRootNodesForQuerySelector()) {
        let altSpan = CSS_CLASS_ALTSPAN, axSpan = CSS_CLASS_AXSPAN, closeSpan = CSS_CLASS_CLOSESPAN, 
            inputSpan = CSS_CLASS_INPUTSPAN, openSpan = CSS_CLASS_OPENSPAN;
		$(`.${CSS_CLASS_GENERAL}, .${openSpan}, .${closeSpan}, .${inputSpan}, .${axSpan}`, root).remove();
		var arias = $('[aria-details], [aria-disabled], [aria-errormessage], [aria-flowto], [aria-owns], [aria-roledescription], [aria-keyshortcuts], [aria-autocomplete], [aria-sort], [aria-placeholder], [aria-busy], [aria-modal], [aria-details], [aria-activedescendant], [aria-colcount], [aria-colindex], [aria-colspan], [aria-posinset], [aria-rowcount], [aria-rowindex], [aria-rowspan], [aria-setsize], [aria-modal], [aria-current], [aria-expanded], [aria-controls], [aria-selected], [aria-required], [aria-invalid], [aria-labelledby], [aria-describedby], [aria-label], [role], [aria-hidden], [aria-level], [aria-relevant], [aria-haspopup], [aria-valuetext], [aria-orientation], [aria-valuemin], [aria-valuemax], [aria-valuenow], [aria-pressed], [aria-checked], [aria-live], [aria-atomic]', root)
			.not(`input[type=hidden], textarea[type=hidden], select[type=hidden], button[type=hidden], 
			input[type=button], textarea[type=button], select[type=button], button[type=button], 
			input[type=submit], textarea[type=submit], select[type=submit], button[type=submit], 
			input[type=reset], textarea[type=reset], select[type=reset], button[type=reset]`);
		$(arias).each(function() {
			foundAnyElems = true;
			$(this).attr('style', 'outline:green 2px solid;padding:2px;');
			const attrNamesToGiveAStandardAnnotationTo = ['role', 'aria-live', 
				'aria-atomic', 'aria-modal', 'aria-disabled', 'aria-errormessage', 
				'aria-flowto', 'aria-owns', 'aria-roledescription', 'aria-sort', 
				'aria-keyshortcuts', 'aria-activedescendant', 'aria-placeholder', 
				'aria-busy', 'aria-autocomplete', 'aria-colcount', 'aria-colindex', 
				'aria-colspan', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 
				'aria-details', 'aria-current', 'aria-orientation', 'aria-valuemax', 
				'aria-valuemin', 'aria-valuenow', 'aria-valuetext'];
			for(let attrName of attrNamesToGiveAStandardAnnotationTo) {
				if ($(this).attr(attrName)) {
					$(this).before("<span class=\""+axSpan+"\" style=\"outline:green 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;\">"+attrName+"=\"" + $(this).attr(attrName) + "\"</span>");
				}
			}

			const attrNamesToGiveADifferentStandardAnnotationTo = ['aria-label', 
				'aria-expanded', 'aria-selected', 'aria-haspopup', 'aria-pressed', 
				'aria-checked', 'aria-level', 'aria-labelledby', 'aria-controls'];
			for(let attrName of attrNamesToGiveADifferentStandardAnnotationTo) {
				if ($(this).attr(attrName)) {
					$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">"+attrName+"=\"" + $(this).attr(attrName) + "\"</span>");
				}
			}

			if ($(this).attr('aria-relevant')) {
				$(this).before("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-relevant=\"" + $(this).attr('aria-relevant') + "\"</span>");
			}
			if ($(this).attr('aria-hidden')) {
				$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">❓aria-hidden=\"" + $(this).attr('aria-hidden') + "\"❓</span>");
				$(this).attr('style', 'background-color:black;opacity:0.7;');
			}
			if ($(this).attr('aria-describedby')) {
				$(this).before("<span class=\""+axSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-describedby=\"" + $(this).attr('aria-describedby') + "\"</span>");
				var describedbyValue = $(this).attr('aria-describedby');
				var describedbyArray = describedbyValue.split(' ');
				for (i = 0; i < describedbyArray.length; i++) {
					var describedby = $('[id="' + describedbyArray[i] + '"]', root);
					$(describedby).attr('style', 'outline:green 2px solid;');
					$(describedby).prepend("<span class=\""+inputSpan+"\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">id=\"" + describedbyArray[i] + "\"</span>");
				}
			}
			if ($(this).attr('aria-labelledby')) {
				var labelledbyValue = $(this).attr('aria-labelledby');
				var labelledbyArray = labelledbyValue.split(' ');
				for (i = 0; i < labelledbyArray.length; i++) {
					$('[id="' + labelledbyArray[i] + '"]', root).attr('style', 'outline:green 2px solid;');
					$('[id="' + labelledbyArray[i] + '"]', root).prepend("<span class=\""+inputSpan+"\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">id=\"" + labelledbyArray[i] + "\"</span>");
				}
			}
			if ($(this).attr('aria-controls')) {
				var controlsValue = $(this).attr('aria-controls');
				var controlsArray = controlsValue.split(' ');
				for (i = 0; i < controlsArray.length; i++) {
					$('[id="' + controlsArray[i] + '"]', root).attr('style', 'outline:green 2px solid;');
					$('[id="' + controlsArray[i] + '"]', root).prepend("<span class=\""+inputSpan+"\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">id=\"" + controlsArray[i] + "\"</span>");
				}
			}
			if ($(this).attr('aria-required')) {
				$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">&#9937;aria-required=\"" + $(this).attr('aria-required') + "\"</span>");
			}
			if ($(this).attr('aria-invalid')) {
				$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">&#9940;aria-invalid=\"" + $(this).attr('aria-invalid') + "\"</span>");
			}
		});
		$('[aria-describedby]', root).each(function(index) {
			var describedbyValue = $(this).attr('aria-describedby');
			var describedbyArray = describedbyValue.split(' ');
			for (i = 0; i < describedbyArray.length; i++) {
				var idString = "#";
				idString += describedbyArray[i];
				if ($(idString).length <= 0 && $('[id="' + describedbyArray[i] + '"]', root)) {
					$(this).attr('style', 'outline:red 2px dotted;padding:2px;');
					$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">❌NO ID MATCH</span>");
				}
			}
		});
		$('[aria-labelledby]', root).each(function(index) {
			var labelledbyValue = $(this).attr('aria-labelledby');
			var labelledbyArray = labelledbyValue.split(' ');
			for (i = 0; i < labelledbyArray.length; i++) {
				var idString = "#";
				idString += labelledbyArray[i];
				if ($(idString).length <= 0 && $('[id="' + labelledbyArray[i] + '"]', root)) {
					$(this).attr('style', 'outline:red 2px dotted;padding:2px;');
					$(this).after("<span class=\""+closeSpan+"\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">❌NO ID MATCH</span>");
				}
			}
		});

	}
	showMsg(foundAnyElems, "uses of ARIA");
}
	  
runBookmarkletMainFunctionWhenAppropriate(main);
