import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as os from "node:os"

export async function createDirectoryIfNotExists(pathStr: string) {
	return fs.mkdir(pathStr, { recursive: true })
}

export async function deleteFileIfExists(pathStr: string) {
	return fs.unlink(pathStr).catch((e) => {
		console.warn("could not delete file", pathStr, e)
	})
}

export async function deleteDirectoryIfExists(pathStr: string) {
	return fs.rm(pathStr, { recursive: true }).catch((e) => {
		console.warn("could not delete directory", pathStr, e)
	})
}

export interface PersistenceUtils {
	createConfigDirAtPath: (pathStr: string) => Promise<void>
	createHomeConfig: () => Promise<void>
	readJsonConfigFile: <T>(
		pathStr: string,
		fileName: string,
	) => Promise<T | null>
	readJsonHomeConfigFile: <T>(fileName: string) => Promise<T | null>
	writeConfigFile: (
		pathStr: string,
		fileName: string,
		content: string,
	) => Promise<void>
	writeJsonConfigFile: <T>(
		pathStr: string,
		fileName: string,
		content: T,
	) => Promise<void>
	writeJsonHomeConfigFile: <T>(fileName: string, content: T) => Promise<void>
}

export function createPersistenceUtils(
	viewerConfigDirectoryName: string,
): PersistenceUtils {
	async function createConfigDirAtPath(pathStr: string) {
		const homeConfigPath = path.resolve(pathStr, viewerConfigDirectoryName)
		await createDirectoryIfNotExists(homeConfigPath)
	}

	async function createHomeConfig() {
		await createConfigDirAtPath(os.homedir())
	}

	async function readJsonConfigFile<T>(
		pathStr: string,
		fileName: string,
	): Promise<T | null> {
		try {
			const file = path.resolve(pathStr, viewerConfigDirectoryName, fileName)
			const fileContent = await fs.readFile(file, "utf-8")
			console.log("fileContent: ", fileContent)
			return JSON.parse(fileContent)
		} catch (e) {
			console.error(e)
			return null
		}
	}

	async function readJsonHomeConfigFile<T>(
		fileName: string,
	): Promise<T | null> {
		return readJsonConfigFile(os.homedir(), fileName)
	}

	async function writeConfigFile(
		pathStr: string,
		fileName: string,
		content: string,
	): Promise<void> {
		const backupFileName = "_" + fileName
		const backupFile = path.resolve(
			pathStr,
			viewerConfigDirectoryName,
			backupFileName,
		)
		await createDirectoryIfNotExists(
			path.resolve(pathStr, viewerConfigDirectoryName),
		)
		const file = path.resolve(pathStr, viewerConfigDirectoryName, fileName)
		await fs.writeFile(backupFile, content)
		await fs.copyFile(backupFile, file)
		await deleteFileIfExists(backupFile)
	}

	async function writeJsonConfigFile<T>(
		pathStr: string,
		fileName: string,
		content: T,
	): Promise<void> {
		return writeConfigFile(pathStr, fileName, JSON.stringify(content))
	}

	async function writeJsonHomeConfigFile<T>(
		fileName: string,
		content: T,
	): Promise<void> {
		await writeJsonConfigFile(os.homedir(), fileName, content)
	}

	return {
		createConfigDirAtPath,
		createHomeConfig,
		readJsonConfigFile,
		readJsonHomeConfigFile,
		writeConfigFile,
		writeJsonConfigFile,
		writeJsonHomeConfigFile,
	}
}
