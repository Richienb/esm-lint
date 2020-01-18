#!/usr/bin/env node

"use strict"

const meow = require("meow")
const Listr = require("listr")
const esmLint = require(".")

const { input: args } = meow(`
    Usage
      $ esm-lint <script>
`)

const [file] = args
