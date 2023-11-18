#!/usr/bin/env bash

set -uo pipefail
IFS=$'\n\t'  # Inspired by http://redsymbol.net/articles/unofficial-bash-strict-mode/.  Meant as a safety net.  You should still quote variable expansions.
function err_trap_func () {
	exit_status="$?"
  echo "Exiting with status \"$exit_status\" due to command \"$BASH_COMMAND\" (call stack: line(s) $LINENO ${BASH_LINENO[*]} in $0)"
	exit "$exit_status"
}
trap err_trap_func ERR

function exit_trap_func () {
	true
}
trap exit_trap_func EXIT

set -o errtrace

# here we check for "//"-style comments in javascript (as opposed to "/* */"-style) 
# and fail on them.  
# b/c they will break a bookmarklet.  that style of comment will work if you paste it into the 
# devtools console, it will work if you use it from tampermonkey, 
# but won't work if you use it as a real bookmarklet i.e. if you paste the whole 
# script contents into the "URL" field of a bookmarklet in your browser. 
# this is because the browser seems to remove newlines when you do that, and still 
# interprets the "//"-style comment as meaning "ignore everything to the right of "//" 
# on this line, and "this line" now means (b/c it removed newlines) the whole script 
# until the end of the file.  
# You might get an error such as "Uncaught SyntaxError: missing } after function body".
# The ':' part is there so that we don't match URLs eg. 'http://'.  
if [[ "$(grep -E '(^|[^:])//([^/]|$)' *.js 2>&1)" != "" ]] ; then 
	false
fi


# This is here so that I don't repeat the mistake of 2023-11-01 which cost me ~ 15 minutes. 
# the SVG parse was breaking b/c some of my SVG/HTML multe-line literal strings 
# didn't have spaces at the end of the lines.
# for example: 
#		let svgStr = `<svg xmlns='http://www.w3.org/2000/svg'
# 			aria-hidden="true" >
# There's no space on the first line after '/svg'".  
# that caused a problem b/c when installing a bookmarklet via paste into the URL text field of the bookmark, 
# it seems that (in chrome, not in firefox) all whitespace is removed, so the above turns into this: 
#		let svgStr = `<svg xmlns='http://www.w3.org/2000/svg'aria-hidden="true" >
# i.e. there's no space between /svg' and aria-hidden.
# that will cause a breakage.  that breakage might be silent or loud.
# this doesn't break most JS code, nor most SVG / HTML literal strings, but it will break on this attribute case.
# this caused a breakage only when run as a simple bookmarklet.  no breakage 
# when run as code pasted into devtools console, or under tampermonkey.  
# on 2023-11-01 the breakage was loud: the error message (when run on my test page, and - to my surprise - this error message 
# rendered as text on the page, and the devtools console showed nothing) I got was:
# """
# This page contains the following errors:
# error on line 1 at column 59: attributes construct error
# Below is a rendering of the page up to the first error.
# """
# ... and the elements tree in devtools showed <html> elements as children of <body>. 
if [[ "$(cat *.js | dos2unix | grep --text -E '["'"'"']$')" != "" ]] ; then
	false
fi


# grep for "tdr".  "tdr" means "to do: remove".  this is a comment that I add 
# to code that I don't intend to commit. 
if [[ "$(grep tdr *.js 2>&1)" != "" ]] ; then 
	false
fi

