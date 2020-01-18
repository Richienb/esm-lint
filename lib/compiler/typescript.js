const ts = require("typescript")

module.exports = async ({ scriptFile }) => {
	ts.createProgram([scriptFile], {
		noEmitOnError: true,
		noImplicitAny: true,
		target: ts.ScriptTarget.ES5,
		module: ts.ModuleKind.CommonJS,
	}).emit()
}
