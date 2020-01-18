const path = require("path")
const { cli: snowpack } = require("snowpack")
const fs = require("fs-extra")

module.exports = async ({ scriptFile, dir }) => {
	const pkgFile = path.join(dir, "package.json")
	await fs.writeJSON(pkgFile, {})

	await snowpack([scriptFile])

	await fs.remove(pkgFile)
}
