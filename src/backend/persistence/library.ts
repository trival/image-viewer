import { Library } from "../interfaces"
import { PersistenceUtils } from "./utils"

export interface LibraryStorage {
	readLibraryPaths(): Promise<string[]>
	readLibraryData(rootPath: string): Promise<Library>
	addLibraryPathHomeEntry(rootPath: string): Promise<void>
	writeLibraryData(lib: Library): Promise<void>
}

export const libPathsFileName = "libraries.json"
export const libMetaFileName = "library.json"

export function createLibraryStorage(utils: PersistenceUtils): LibraryStorage {
	async function readLibraryPaths() {
		await utils.createHomeConfig()
		const paths = await utils.readJsonHomeConfigFile<string[]>(libPathsFileName)

		return paths || []
	}

	async function readLibraryData(rootPath: string) {
		const lib = await utils.readJsonConfigFile<Library>(
			rootPath,
			libMetaFileName,
		)
		if (!lib) {
			throw new Error("Library not found")
		}
		return { ...lib, rootPath }
	}

	async function addLibraryPathHomeEntry(rootPath: string) {
		const paths = await readLibraryPaths()
		const set = new Set(paths)
		set.add(rootPath)
		await utils.writeJsonHomeConfigFile(libPathsFileName, Array.from(set))
	}

	async function writeLibraryData(lib: Library) {
		await utils.writeJsonConfigFile(lib.rootPath, libMetaFileName, {
			...lib,
			rootPath: undefined,
		})
	}

	return {
		readLibraryPaths,
		readLibraryData,
		addLibraryPathHomeEntry,
		writeLibraryData,
	}
}
