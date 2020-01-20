import path from "path"
import execa from "execa"
import appendJSON from "../../utils/append-json"

export = async ({ scriptFile, dir }: { scriptFile: string, dir: string }) => {
	await appendJSON(path.join(dir, "package.json"), { type: "module" })

	await execa("node", [scriptFile], { cwd: dir })
}
