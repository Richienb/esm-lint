const pify = require("pify")
const webpack = require("webpack")

module.exports = pify(webpack)
