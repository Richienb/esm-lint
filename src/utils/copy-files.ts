import path from "path"
import fs from "fs-extra"
import ow from "ow"
import pEachSeries from "p-each-series"

export = async (paths: string[], dest: string, { cwd = process.cwd(), throwNoExist = false } = {}) => {
	ow(paths, ow.array.is((paths) => !throwNoExist || paths.every((dir: string) => fs.pathExistsSync(path.resolve(cwd, dir)))))

	await pEachSeries(paths, (dir: string) => fs.copy(path.resolve(cwd, dir), path.resolve(dest, dir)))
}
