"use strict"

const fs = require("fs-extra")
const { default: ow } = require("ow")

const setup = require("./lib/setup")
const cleanup = require("./lib/cleanup")

const webpack = require("./lib/compiler/webpack")
const parcel = require("./lib/compiler/parcel")
const rollup = require("./lib/compiler/rollup")
const snowpack = require("./lib/compiler/snowpack")
const typescript = require("./lib/compiler/typescript")
const node = require("./lib/compiler/node")

module.exports = async (script, { cwd = process.cwd() } = {}) => {
	ow(cwd, ow.string.is(fs.pathExistsSync))

	const { dir, scriptFile } = await setup({ cwd, script })

	await Promise.all([
		webpack({ scriptFile }),
		parcel({ scriptFile }),
		rollup({ scriptFile }),
		snowpack({ scriptFile, dir }),
		typescript({ scriptFile }),
		node({ scriptFile, dir }),
	])

	await cleanup({ dir })

	return true
}
