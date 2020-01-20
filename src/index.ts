"use strict"

import fs from "fs-extra"
import ow from "ow"

import setup from "./lib/setup"
import cleanup from "./lib/cleanup"

async function esmLint(script: string, { cwd = process.cwd() } = {}) {
	ow(cwd, ow.string.is(fs.pathExistsSync))

	const { dir, scriptFile } = await setup({ cwd, script })

	await Promise.all([
		require("./lib/compilers/webpack")({ scriptFile }),
		require("./lib/compilers/parcel")({ scriptFile }),
		require("./lib/compilers/rollup")({ scriptFile }),
		require("./lib/compilers/snowpack")({ scriptFile, dir }),
		require("./lib/compilers/typescript")({ scriptFile }),
		require("./lib/compilers/node")({ scriptFile, dir }),
	])

	await cleanup({ dir })

	return true
}

export = esmLint
