import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as os from "node:os"

const viewerConfigDirectoryName = ".trival-viewer"

export async function createDirectoryIfNotExists(pathStr: string) {
	fs.mkdir(pathStr, { recursive: true })
}

export async function deleteFileIfExists(pathStr: string) {
	fs.unlink(pathStr).catch((e) => {
		console.warn("could not delete file", pathStr, e)
	})
}

export async function createHomeConfig() {
	createConfigDirAtPath(os.homedir())
}

export async function createConfigDirAtPath(pathStr: string) {
	const homeConfigPath = path.resolve(pathStr, viewerConfigDirectoryName)
	createDirectoryIfNotExists(homeConfigPath)
}

export async function readJsonConfigFile<T>(
	pathStr: string,
	fileName: string,
): Promise<T | null> {
	try {
		const file = path.resolve(pathStr, viewerConfigDirectoryName, fileName)
		const fileContent = await fs.readFile(file, "utf-8")
		return JSON.parse(fileContent)
	} catch (e) {
		console.error(e)
		return null
	}
}

export async function readJsonHomeConfigFile<T>(
	fileName: string,
): Promise<T | null> {
	return readJsonConfigFile(os.homedir(), fileName)
}

export async function writeConfigFile(
	pathStr: string,
	fileName: string,
	content: string,
): Promise<void> {
	let backupFileName = "_" + fileName
	const backupFile = path.resolve(
		pathStr,
		viewerConfigDirectoryName,
		backupFileName,
	)
	const file = path.resolve(pathStr, viewerConfigDirectoryName, fileName)
	await fs.writeFile(backupFile, content)
	await fs.copyFile(backupFile, file)
	await deleteFileIfExists(backupFile)
}

export async function writeJsonConfigFile<T>(
	pathStr: string,
	fileName: string,
	content: T,
): Promise<void> {
	return writeConfigFile(pathStr, fileName, JSON.stringify(content))
}

export async function writeJsonHomeConfigFile<T>(
	fileName: string,
	content: T,
): Promise<void> {
	await writeJsonConfigFile(os.homedir(), fileName, content)
}
