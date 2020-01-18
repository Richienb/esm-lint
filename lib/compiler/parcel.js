const Bundler = require("parcel-bundler")

module.exports = async ({ scriptFile }) => {
	const bundler = new Bundler(scriptFile)

	await bundler.bundle()
}
