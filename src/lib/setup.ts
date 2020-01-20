import path from "path"
import execa from "execa"
import packlist from "npm-packlist"
import fs from "fs-extra"
import { directory as newTempDir } from "tempy"
import ow from "ow"

import copy from "../utils/copy-files"
import supportsYarn from "../utils/supports-yarn"

export = async ({ cwd, script }: { cwd: string, script: string }) => {
	ow(script, ow.string)
	ow(cwd, ow.string)

	// TODO: Move packing logic to another module.

	// const files = await packlist({ path: cwd })
	// if (files.length === 0) throw new Error("Unable to find any packable files!")

	const tempDir = newTempDir()
	// const packageDir = path.join(tempDir, "package")

	// await fs.mkdir(packageDir)

	// await copy(files, packageDir, { cwd })

	const scriptFile = path.join(tempDir, "index.js")

	if (await fs.pathExists(script)) await fs.copy(script, scriptFile)
	else await fs.writeFile(scriptFile, script)

	const useYarn = await supportsYarn(cwd)

	// await execa(useYarn ? "yarn" : "npm", ["install"], { cwd: packageDir })
	// if (useYarn) {
	// 	await execa("yarn", ["add", `file:${packageDir}`], { cwd: tempDir })
	// } else {
	// 	await execa("npm", ["install", "./package"], { cwd: tempDir })
	// }
	await fs.writeJSON(path.join(tempDir, "package.json"), {})
	if (useYarn) {
		await execa("yarn", ["add", `file:${cwd}`], { cwd: tempDir })
	} else {
		await execa("npm", ["install", cwd], { cwd: tempDir })
	}

	return { dir: tempDir, scriptFile }
}
