import path from "path"
import { cli as snowpack } from "snowpack"
import fs from "fs-extra"

export = async ({ scriptFile, dir }: { scriptFile: string, dir: string }) => {
	const pkgFile = path.join(dir, "package.json")
	await fs.writeJSON(pkgFile, {})

	await snowpack([scriptFile])

	await fs.remove(pkgFile)
}
