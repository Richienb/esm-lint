import webpack from "../../utils/webpack"

export = async ({ scriptFile }: { scriptFile: string }) => {
	await webpack({
		entry: scriptFile,
	})
}
