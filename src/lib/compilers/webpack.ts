import webpack from "p-webpack"

export = async ({ scriptFile }: { scriptFile: string }) => {
	await webpack({
		entry: scriptFile,
	})
}
