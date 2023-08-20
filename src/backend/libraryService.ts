import { Maybe, Result, error, ok } from "~/libs/types"
import { Library, LibraryError, Media } from "./interfaces"
import { LibraryStorage } from "./persistence/library"

export interface LibraryService {
	// Library basics
	getLibraries(): Promise<Library[]>
	createLibrary(
		rootPath: string,
		name: string,
	): Promise<Result<Library, LibraryError.LibraryAlreadyExists>>
	updateLibrary(
		rootPath: string,
		name: Maybe<string>,
		ignorePaths: Maybe<string[]>,
	): Promise<Result<Library, LibraryError.LibraryNotFound>>

	getMedia(
		libPath: string,
	): Promise<Result<Media[], LibraryError.LibraryNotFound>>
	reloadMedia(
		libPath: string,
		subPath: Maybe<string>,
	): Promise<Result<Media[], LibraryError.LibraryNotFound>>
}

export function createLibraryService(
	libraryStorage: LibraryStorage,
): LibraryService {
	const service = {} as LibraryService

	service.getLibraries = async () => {
		const paths = await libraryStorage.readLibraryPaths()
		return Promise.all(paths.map(libraryStorage.readLibraryData))
	}

	service.createLibrary = async (rootPath, name) => {
		const paths = await libraryStorage.readLibraryPaths()
		if (paths.includes(rootPath)) {
			return error(LibraryError.LibraryAlreadyExists)
		}

		await libraryStorage.addLibraryPathHomeEntry(rootPath)
		const lib = {
			ignorePaths: [],
			name,
			rootPath,
		}
		await libraryStorage.writeLibraryData(lib)

		return ok(lib)
	}

	service.updateLibrary = async (rootPath, name, ignorePaths) => {
		const lib = await libraryStorage.readLibraryData(rootPath)
		if (!lib) {
			return error(LibraryError.LibraryNotFound)
		}

		if (name) {
			lib.name = name
		}
		if (ignorePaths) {
			lib.ignorePaths = ignorePaths
		}

		await libraryStorage.writeLibraryData(lib)

		return ok(lib)
	}

	return service
}
