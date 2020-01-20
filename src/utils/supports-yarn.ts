import hasYarn from "has-yarn"
import commandExists from "command-exists"
import ow from "ow"

export = async (cwd = ".") => {
	ow(cwd, ow.string)

	return await commandExists("yarn") && hasYarn(cwd)
}
