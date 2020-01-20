#!/usr/bin/env node

"use strict"

import path from "path"
import meow from "meow"
import Listr from "listr"
import splitString from "split-string"

import setup from "./lib/setup"
import cleanup from "./lib/cleanup"

import pens from "./utils/pens"

module.exports = (async () => {
	const { input: args } = meow(`
    Usage
      $ esm-lint <script>
`)

	let [script, cwd = process.cwd()] = args
	cwd = path.resolve(cwd)
	let data: {
		dir: string
		scriptFile: string
	}

	new Listr([
		{
			title: 'Setup',
			task: async () => {
				data = await setup({ cwd, script })
			}
		},
		{
			title: 'Test',
			task: () => new Listr([{
				title: "Webpack",
				task: () => require("./lib/compilers/webpack")(data)
			},
			{
				title: "Parcel",
				task: () => require("./lib/compilers/parcel")(data)
			},
			{
				title: "Rollup",
				task: () => require("./lib/compilers/rollup")(data)
			},
			{
				title: "Snowpack",
				task: () => require("./lib/compilers/snowpac")(data)
			},
			{
				title: "Typescript",
				task: () => require("./lib/compilers/typescript")(data)
			},
			{
				title: "Node",
				task: () => require("./lib/compilers/node")(data)
			}], { concurrent: true })
		},
		{
			title: 'Cleanup',
			task: () => cleanup({ dir: data.dir })
		}
	]).run().catch(pens);
})()
