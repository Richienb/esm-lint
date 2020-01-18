const path = require("path")
const fs = require("fs-extra")
const { default: ow } = require("ow")
const pEachSeries = require("p-each-series")

module.exports = async (paths, dest, { cwd = process.cwd(), throwNoExist = false } = {}) => {
	ow(paths, ow.array.is((paths) => !throwNoExist || paths.every((dir) => fs.pathExistsSync(path.resolve(cwd, dir)))))

	await pEachSeries(paths, (dir) => fs.copy(path.resolve(cwd, dir), path.resolve(dest, dir)))
}
