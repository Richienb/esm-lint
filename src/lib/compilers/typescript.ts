import ts from "typescript"

export = async ({ scriptFile }: { scriptFile: string }) => {
	ts.createProgram([scriptFile], {
		noEmitOnError: true,
		noImplicitAny: true,
		target: ts.ScriptTarget.ES5,
		module: ts.ModuleKind.CommonJS,
	}).emit()
}
