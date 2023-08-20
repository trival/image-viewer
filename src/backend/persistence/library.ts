import { Library } from "../interfaces"
import {
	createHomeConfig,
	readJsonConfigFile,
	readJsonHomeConfigFile,
	writeJsonConfigFile,
	writeJsonHomeConfigFile,
} from "./utils"

export interface LibraryStorage {
	readLibraryPaths(): Promise<string[]>
	readLibraryData(rootPath: string): Promise<Library>
	addLibraryPathHomeEntry(rootPath: string): Promise<void>
	writeLibraryData(lib: Library): Promise<void>
}

export const libPathsFileName = "libraries.json"
export const libMetaFileName = "library.json"

export function createLibraryStorage(): LibraryStorage {
	async function readLibraryPaths() {
		await createHomeConfig()
		const paths = await readJsonHomeConfigFile<string[]>(libPathsFileName)

		return paths || []
	}

	async function readLibraryData(rootPath: string) {
		const lib = await readJsonConfigFile<Library>(rootPath, libMetaFileName)
		if (!lib) {
			throw new Error("Library not found")
		}
		return { ...lib, rootPath }
	}

	async function addLibraryPathHomeEntry(rootPath: string) {
		const paths = await readLibraryPaths()
		const set = new Set(paths)
		set.add(rootPath)
		await writeJsonHomeConfigFile(libPathsFileName, Array.from(set))
	}

	async function writeLibraryData(lib: Library) {
		await writeJsonConfigFile(lib.rootPath, libMetaFileName, {
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
