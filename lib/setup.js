const path = require("path")
const execa = require("execa")
const packlist = require("npm-packlist")
const fs = require("fs-extra")
const { directory: newTempDir } = require("tempy")
const { default: ow } = require("ow")

const copy = require("../utils/copy-files")
const supportsYarn = require("../utils/supports-yarn")

module.exports = async ({ cwd, script }) => {
	ow(script, ow.string)

	const files = await packlist({ path: cwd })
	if (files.length === 0) throw new Error("Unable to find any packable files!")

	const tempDir = newTempDir()
	const packageDir = path.join(tempDir, "package")

	await fs.mkdir(packageDir)

	await copy(files, packageDir, { cwd })

	const scriptFile = path.join(tempDir, "index.js")

	if (await fs.pathExists(script)) await fs.copy(script, scriptFile)
	else await fs.writeFile(scriptFile, script)

	const useYarn = await supportsYarn(tempDir)

	await execa(useYarn ? "yarn" : "npm", ["install"], { cwd: tempDir })
	if (useYarn) {
		await execa("yarn", ["add", `file:${packageDir}`], { cwd: tempDir })
	} else {
		await execa("npm", ["install", "./package"], { cwd: tempDir })
	}

	return { dir: tempDir, scriptFile }
}
