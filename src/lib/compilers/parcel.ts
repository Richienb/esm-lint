import Bundler from "parcel-bundler"

export = async ({ scriptFile }: { scriptFile: string }) => {
	const bundler = new Bundler(scriptFile)

	await bundler.bundle()
}
