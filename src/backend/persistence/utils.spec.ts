import * as path from "node:path"
import { createPersistenceUtils, deleteDirectoryIfExists } from "./utils"

describe("persistence utils", () => {
	const configDirName = "test-config"
	// eslint-disable-next-line no-undef
	const testDir = path.join(__dirname, "__test__")
	const utils = createPersistenceUtils(configDirName)

	beforeEach(async () => {
		await deleteDirectoryIfExists(testDir)
	})

	afterAll(async () => {
		await deleteDirectoryIfExists(testDir)
	})

	describe("config files", () => {
		it("should read and write config files", async () => {
			const res1 = await utils.readJsonConfigFile(testDir, "test.json")
			expect(res1).toBeNull()

			await utils.writeJsonConfigFile(testDir, "test.json", { foo: "bar" })

			const res2 = await utils.readJsonConfigFile(testDir, "test.json")
			expect(res2).toEqual({ foo: "bar" })
		})
	})
})
