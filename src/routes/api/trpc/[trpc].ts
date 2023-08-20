import { type APIEvent } from "solid-start/api"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { trpcRouter } from "~/backend/trpc"

const handler = (event: APIEvent) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req: event.request,
		router: trpcRouter,
		createContext: () => ({}),
	})

export const GET = handler
export const POST = handler
