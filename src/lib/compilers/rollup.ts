import { rollup } from "rollup"
import resolve from "@rollup/plugin-node-resolve"

export = async ({ scriptFile }: { scriptFile: string }) => {
	const bundle = await rollup({
		input: scriptFile,
		plugins: [resolve()],
	})

	await bundle.generate({
		file: "bundle.js",
		format: "cjs",
	})
}
