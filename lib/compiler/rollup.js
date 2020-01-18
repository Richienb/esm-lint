const rollup = require("rollup")
const resolve = require("@rollup/plugin-node-resolve")

module.exports = async ({ scriptFile }) => {
	const bundle = await rollup.rollup({
		input: scriptFile,
		plugins: [resolve()],
	})

	await bundle.generate({
		file: "bundle.js",
		format: "cjs",
	})
}
