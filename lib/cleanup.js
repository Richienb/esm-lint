const fs = require("fs-extra")

module.exports = async ({ dir }) => {
	await fs.remove(dir)
}
