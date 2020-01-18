const webpack = require("../../utils/webpack")

module.exports = async ({ scriptFile }) => {
	await webpack({
		entry: scriptFile,
	})
}
