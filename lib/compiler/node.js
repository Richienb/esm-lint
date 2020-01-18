const path = require("path")
const fs = require("fs-extra")
const execa = require("execa")

module.exports = async ({ scriptFile, dir }) => {
	const pkgFile = path.join(dir, "package.json")
	await fs.writeJSON(pkgFile, { type: "module" })

	await execa("node", [scriptFile], { cwd: dir })

	await fs.remove(pkgFile)
}
