import PrettyError from "pretty-error"
import crossExit from "cross-exit"
const MaterialTheme = require("pretty-error-themes/material")

export = (error: Error, { exit = true } = {}) => {
	const pe = new PrettyError()
	pe.appendStyle(MaterialTheme)
	const rendered = pe.render(error)
	console.log(rendered)
	if (exit) crossExit(1)
}
