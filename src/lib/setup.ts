import path from "path"
import execa from "execa"
import fs from "fs-extra"
import { directory as newTempDir } from "tempy"
import ow from "ow"

import supportsYarn from "../utils/supports-yarn"

export = async ({ cwd, script }: { cwd: string, script: string }) => {
	ow(script, ow.string)
	ow(cwd, ow.string)

	const tempDir = newTempDir()

	const scriptFile = path.join(tempDir, "index.js")

	if (await fs.pathExists(script)) await fs.copy(script, scriptFile)
	else await fs.writeFile(scriptFile, script)

	const useYarn = await supportsYarn(cwd)

	await fs.writeJSON(path.join(tempDir, "package.json"), {})
	if (useYarn) {
		await execa("yarn", ["add", `file:${cwd}`], { cwd: tempDir })
	} else {
		await execa("npm", ["install", cwd], { cwd: tempDir })
	}

	return { dir: tempDir, scriptFile }
}
