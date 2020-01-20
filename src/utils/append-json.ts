import fs from "fs-extra"
import ow from "ow"

export = async (file: string, data: object) => {
	ow(file, ow.string)
	ow(data, ow.object)

	await fs.writeJSON(file, { ...(await fs.readJSON(file)), ...data })
}
