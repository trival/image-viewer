import { z } from "zod"
import { initTRPC } from "@trpc/server"
import { LibraryService } from "./libraryService"

const { router, procedure } = initTRPC.create()

interface RouterProps {
	libraryService: LibraryService
}

export const createTrpcRouter = ({ libraryService }: RouterProps) =>
	router({
		hello: procedure
			.input(
				z.object({
					text: z.string(),
				}),
			)
			.query((opts) => {
				return {
					greeting: `hello ${opts.input.text}`,
				}
			}),

		getLibraries: procedure.query(() => {
			return libraryService.getLibraries()
		}),

		createLibrary: procedure
			.input(
				z.object({
					rootPath: z.string(),
					name: z.string(),
				}),
			)
			.mutation((opts) => {
				return libraryService.createLibrary(
					opts.input.rootPath,
					opts.input.name,
				)
			}),

		updateLibrary: procedure
			.input(
				z.object({
					rootPath: z.string(),
					name: z.string().optional(),
					ignorePaths: z.array(z.string()).optional(),
				}),
			)
			.mutation((opts) => {
				return libraryService.updateLibrary(
					opts.input.rootPath,
					opts.input.name,
					opts.input.ignorePaths,
				)
			}),
	})

// export type definition of API
export type TrpcAppRouter = ReturnType<typeof createTrpcRouter>
