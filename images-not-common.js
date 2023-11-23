
const UNIQUE_ID_FOR_THIS_BOOKMARKLET = '1068bf83_143e_4d0e_957f_170c2cda772e';
const CSS_CLASS_NAME_FOR_ELEMENTS_ADDED_BY_THIS_BOOKMARKLET = `class_${UNIQUE_ID_FOR_THIS_BOOKMARKLET}`;

function main() {

    let foundAnyElems = false;
    for(let root of getRootsForQuerySelector()) {
        const cssClass = CSS_CLASS_NAME_FOR_ELEMENTS_ADDED_BY_THIS_BOOKMARKLET;
        $(`.${cssClass}`, root).remove();
        $("a[alt], button[alt], label[alt]", root).each(function() {
            $(this).before(`<span class=\"${cssClass}\"`+" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\"> INVALID❌alt=\"" + $(this).attr('alt') + "\" on " + $(this).prop("tagName") + "</span>");
        });
        $("img, [role=img]", root).each(function() {
            foundAnyElems = true;
            if ($(this).attr('role')) {
                $(this).after(`<span class=\"${cssClass}\"`+" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">❓role=\"" + $(this).attr('role') + "\"</span>");
            }
            if ($(this).attr('aria-label')) {
                $(this).after(`<span class=\"${cssClass}\"`+" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">❓aria-label=\"" + $(this).attr('aria-label') + "\"</span>");
            }
            if ($(this).attr('aria-describedby')) {
                $(this).before(`<span class=\"${cssClass}\"`+" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-describedby=\"" + $(this).attr('aria-describedby') + "\"</span>");
                var describedbyValue = $(this).attr('aria-describedby');
                var describedbyArray = describedbyValue.split(' ');
                for (i = 0; i < describedbyArray.length; i++) {
                    var describedby = $('[id="' + describedbyArray[i] + '"]');
                    $(describedby).attr('style', 'outline:orange 2px dashed;');
                    $(describedby).prepend(`<span class=\"${cssClass}\"`+" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;z-index:2147483647;speak:literal-punctuation;\">id=\"" + describedbyArray[i] + "\"</span>");
                }
            }
            if ($(this).attr('aria-labelledby')) {
                $(this).after(`<span class=\"${cssClass}\"`+" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;margin:0 2px; padding:2px;speak:literal-punctuation;\">aria-labelledby=\"" + $(this).attr('aria-labelledby') + "\"</span>");
                var labelledbyValue = $(this).attr('aria-labelledby');
                var labelledbyArray = labelledbyValue.split(' ');
                for (i = 0; i < labelledbyArray.length; i++) {
                    $('[id="' + labelledbyArray[i] + '"]').attr('style', 'outline:orange 2px dashed;');
                    $('[id="' + labelledbyArray[i] + '"]').prepend(`<span class=\"${cssClass}\"`+" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:orange 2px dashed;z-index:2147483647;speak:literal-punctuation;\">id=\"" + labelledbyArray[i] + "\"</span>");
                }
            }
            $(this).attr('style', 'outline:green 2px solid;padding:2px;');
            if (!this.hasAttribute('alt')) {
                if ($(this).parent('a').length) {
                    if (!this.hasAttribute('aria-label')) {
                        if (!this.hasAttribute('aria-labelledby')) {
                            if (!this.hasAttribute('aria-describedby')) {
                                if (!this.hasAttribute('title')) {
                                    $(this).before(`<span class=\"${cssClass}\"`+" style=\"outline:red 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;border-bottom:2px solid blue;\">LINK IMG❌NO ALT</span>");
                                }
                            }
                        }
                    }
                } else if (!this.hasAttribute('aria-label')) {
                    if (!this.hasAttribute('aria-labelledby')) {
                        if (!this.hasAttribute('aria-describedby')) {
                            if (!this.hasAttribute('title')) {
                                $(this).attr('style', 'outline:red 2px solid;padding:2px;');
                                $(this).before(`<span class=\"${cssClass}\"`+" style=\"outline:red 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;\">IMG❌NO ALT</span>");
                            }
                        }
                    }
                }
            } else {
                $(this).attr('style', 'outline:green 2px solid;padding:2px;');
                if ($(this).parent('a').length) {
                    if ($(this).attr('alt') == "") {
                        $(this).before(`<span class=\"${cssClass}\"`+" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak:literal-punctuation;border-bottom:2px solid blue;\">LINK IMG❓alt=\"" + $(this).attr('alt') + "\"</span>");
                    } else {
                        $(this).before(`<span class=\"${cssClass}\"`+" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak:literal-punctuation;border-bottom:2px solid blue;\">LINK IMG👍alt=\"" + $(this).attr('alt') + "\"❓</span>");
                    }
                } else {
                    $(this).before(`<span class=\"${cssClass}\"`+" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:absolute;line-height:100%;z-index:2147483647;speak: literal-punctuation;\">IMG👍alt=\"" + $(this).attr('alt') + "\"❓</span>");
                }
            }
            if (this.hasAttribute('title')) {
                $(this).after(`<span role=\"region\" aria-label=\"Title\" class=\"${cssClass}\"`+" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;\">❓title=\"" + $(this).attr('title') + "\"</span>");
            }
            if (this.hasAttribute('longdesc')) {
                $(this).after(`<span role=\"region\" aria-label=\"Long Description\" class=\"${cssClass}\"`+" style=\"outline:orange 2px dashed;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;\">❓longdesc=\"" + $(this).attr('longdesc') + "\"</span>");
            }

        });
    }

    showMsg(foundAnyElems, "images");
}

runBookmarkletMainFunctionWhenAppropriate(main);
