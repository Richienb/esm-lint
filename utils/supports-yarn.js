const hasYarn = require("has-yarn")
const commandExists = require("command-exists")
const { default: ow } = require("ow")

module.exports = async (cwd = ".") => {
	ow(cwd, ow.string)

	return await commandExists("yarn") && hasYarn(".", { cwd })
}
