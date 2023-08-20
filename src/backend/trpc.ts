import { z } from "zod"
import { initTRPC } from "@trpc/server"

const { router, procedure } = initTRPC.create()

export const trpcRouter = router({
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
})

// export type definition of API
export type TrpcAppRouter = typeof trpcRouter
