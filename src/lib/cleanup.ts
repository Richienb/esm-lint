import fs from "fs-extra"

export = async ({ dir }: { dir: string }) => {
	await fs.remove(dir)
}
